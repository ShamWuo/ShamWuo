// ...existing code...

window.addEventListener('load', function() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    }
});

window.addEventListener('scroll', function() {
    const progressBar = document.getElementById('progressBar');
    if (progressBar) {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = scrollPercent + '%';
    }
});

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', function() {
    // reveal animations
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // contact overlay (improved)
    const contactOverlay = document.getElementById('contactOverlay');
    const contactClose = document.getElementById('contactClose');
    let lastContactTrigger = null;

    function lockBodyScroll() {
        document.body.style.overflow = 'hidden';
    }
    function unlockBodyScroll() {
        document.body.style.overflow = '';
    }

    function getFocusableWithin(container) {
        if (!container) return [];
        return Array.from(container.querySelectorAll('a[href],button,textarea,input,select,[tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled'));
    }

    function openContact() {
        if (!contactOverlay) return;
        lastContactTrigger = document.activeElement;
        contactOverlay.classList.add('active');
        contactOverlay.setAttribute('aria-hidden', 'false');
    // mark main UI as hidden/inert for assistive tech
    const main = document.querySelector('main');
    const nav = document.querySelector('.nav-container');
    if (main) main.setAttribute('aria-hidden', 'true');
    if (nav) nav.setAttribute('aria-hidden', 'true');
    document.body.classList.add('overlay-open');
        lockBodyScroll();
        // focus first focusable element (close button preferred)
        const focusables = getFocusableWithin(contactOverlay);
        if (focusables.length) focusables[0].focus();
        contactOverlay.addEventListener('keydown', contactTrapFocus);
    }

    function closeContact() {
        if (!contactOverlay) return;
        contactOverlay.classList.remove('active');
        contactOverlay.setAttribute('aria-hidden', 'true');
    const main = document.querySelector('main');
    const nav = document.querySelector('.nav-container');
    if (main) main.removeAttribute('aria-hidden');
    if (nav) nav.removeAttribute('aria-hidden');
    document.body.classList.remove('overlay-open');
        contactOverlay.removeEventListener('keydown', contactTrapFocus);
        unlockBodyScroll();
        if (lastContactTrigger && typeof lastContactTrigger.focus === 'function') lastContactTrigger.focus();
    }

    function contactTrapFocus(e) {
        if (e.key !== 'Tab') return;
        const focusable = getFocusableWithin(contactOverlay);
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault(); first.focus();
        }
    }

    document.querySelectorAll('[data-contact-open]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            lastContactTrigger = this;
            openContact();
        });
    });

    if (contactClose) contactClose.addEventListener('click', function() { closeContact(); });

    if (contactOverlay) {
        contactOverlay.addEventListener('click', function(e) {
            if (e.target === contactOverlay) {
                closeContact();
            }
        });
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeContact();
            }
        });
    }

    // Product modal: wired in products.html
    const modal = document.getElementById('productModal');
    const modalClose = document.getElementById('productModalClose');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalHighlights = document.getElementById('modal-highlights');
    const modalImage = document.getElementById('modal-image');
    const modalLive = document.getElementById('modal-live');
    const modalSource = document.getElementById('modal-source');
    let lastFocused = null;

    const PRODUCTS = {
        p1: {
            title: 'Rapid Forms',
            desc: 'Rapid Forms is a compact, accessible form builder designed for designers and small teams. Exports HTML/CSS with best-practice validation and ARIA-ready markup.',
            highlights: ['Accessible by default (labels, errors, keyboard)', 'Export presets: Bootstrap / Plain HTML', 'Zero-dependency JS validation rules'],
            live: '#',
            source: '#'
        },
        p2: {
            title: 'TeamBoard',
            desc: 'TeamBoard offers real-time collaboration with presence indicators, undo history, and lightweight permissioning for project teams.',
            highlights: ['Realtime sync (WebSocket)', 'Role-based permissions', 'Exportable activity logs'],
            live: '#',
            source: '#'
        },
        p3: {
            title: 'WeatherViz',
            desc: 'WeatherViz combines tidy interactive charts with exportable graphics for reports and presentations. Built for data storytellers.',
            highlights: ['D3.js powered visualizations', 'Preset chart templates', 'SVG / PNG export options'],
            live: '#',
            source: '#'
        }
    };

    function openModal(productId) {
        const data = PRODUCTS[productId];
        if (!data || !modal) return;
        lastFocused = document.activeElement;

        modalTitle.textContent = data.title;
        modalDesc.textContent = data.desc;
        modalHighlights.innerHTML = '';
        // populate modal image if available
        if (modalImage) {
            modalImage.setAttribute('src', `assets/images/${productId}-thumb.svg`);
            modalImage.setAttribute('alt', data.title + ' thumbnail');
            modalImage.style.display = '';
        }
        data.highlights.forEach(h => {
            const li = document.createElement('li');
            li.textContent = h;
            modalHighlights.appendChild(li);
        });
        modalLive.setAttribute('href', data.live);
        modalSource.setAttribute('href', data.source);

        try {
            if (typeof modal.showModal === 'function') {
                modal.showModal();
            } else {
                modal.classList.add('open');
                modal.setAttribute('aria-hidden', 'false');
            }
        } catch (e) {
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
        }

        // trap focus simply
        modal.addEventListener('keydown', trapFocus);
        if (modalClose) modalClose.focus();
    }

    function closeModal() {
        if (!modal) return;
        // clear modal image
        if (modalImage) {
            modalImage.removeAttribute('src');
            modalImage.setAttribute('alt', '');
            modalImage.style.display = 'none';
        }
        try { if (typeof modal.close === 'function') modal.close(); } catch (e) { modal.classList.remove('open'); }
        modal.setAttribute('aria-hidden', 'true');
        modal.removeEventListener('keydown', trapFocus);
        if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    }

    function trapFocus(e) {
        if (e.key !== 'Tab') return;
        const focusable = modal.querySelectorAll('a[href],button,textarea,input,select,[tabindex]:not([tabindex="-1"])');
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault(); first.focus();
        }
    }

    document.querySelectorAll('[data-open-product]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const id = this.getAttribute('data-product-id');
            openModal(id);
        });
    });

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeModal();
        });
        window.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeModal();
        });
    }

    // smooth anchors
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    // Register service worker for PWA (if supported)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js').then(reg => {
            console.log('Service worker registered:', reg.scope);
            // listen for updates
            if (reg.waiting) {
                showUpdateUI(reg);
            }
            reg.addEventListener('updatefound', () => {
                const newWorker = reg.installing;
                newWorker.addEventListener('statechange', () => {
                    if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                        showUpdateUI(reg);
                    }
                });
            });
        }).catch(err => {
            console.warn('SW registration failed:', err);
        });
    }

    function showUpdateUI(reg) {
        if (document.getElementById('sw-update')) return;
        const bar = document.createElement('div');
        bar.id = 'sw-update';
        bar.style.position = 'fixed';
        bar.style.left = '50%';
        bar.style.transform = 'translateX(-50%)';
        bar.style.bottom = '18px';
        bar.style.background = 'linear-gradient(90deg,#111, #222)';
        bar.style.color = '#fff';
        bar.style.padding = '12px 16px';
        bar.style.borderRadius = '8px';
        bar.style.boxShadow = '0 6px 30px rgba(0,0,0,.6)';
        bar.style.zIndex = '999999';
        bar.style.display = 'flex';
        bar.style.gap = '8px';
        bar.style.alignItems = 'center';
        bar.innerHTML = '<span style="font-size:14px;">A new version is available</span>';
        const btn = document.createElement('button');
        btn.textContent = 'Refresh';
        btn.className = 'btn btn-primary';
        btn.style.marginLeft = '8px';
        const dismiss = document.createElement('button');
        dismiss.textContent = 'Dismiss';
        dismiss.className = 'btn btn-secondary';
        dismiss.style.marginLeft = '8px';
        // refresh action
        btn.addEventListener('click', () => {
            if (!reg || !reg.waiting) return;
            reg.waiting.postMessage({ type: 'SKIP_WAITING' });
            btn.disabled = true; btn.textContent = 'Refreshing...';
            setTimeout(() => location.reload(true), 800);
        });
        // dismiss action
        dismiss.addEventListener('click', () => {
            bar.style.transition = 'opacity .4s ease, transform .4s ease';
            bar.style.opacity = '0';
            bar.style.transform = 'translateY(12px) translateX(-50%)';
            setTimeout(() => { if (bar.parentNode) bar.parentNode.removeChild(bar); }, 420);
        });
        bar.appendChild(btn);
        bar.appendChild(dismiss);
        bar.style.opacity = '0';
        bar.style.transform = 'translateY(12px) translateX(-50%)';
        document.body.appendChild(bar);
        requestAnimationFrame(() => { bar.style.transition = 'opacity .4s ease, transform .4s ease'; bar.style.opacity = '1'; bar.style.transform = 'translateY(0) translateX(-50%)'; });
    }

    // Netlify form AJAX fallback (useful for local dev)
    const forms = document.querySelectorAll('form[name="contact"]');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // If running on localhost, prevent default and POST to Netlify dev endpoint or a test endpoint
            if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
                e.preventDefault();
                const data = new FormData(form);
                fetch('/', { method: 'POST', body: data }).then(() => {
                    alert('Message sent (local test). On deploy this will submit to Netlify Forms.');
                    form.reset();
                }).catch(err => {
                    alert('Local send failed — when deployed Netlify Forms will handle submission.');
                    console.error(err);
                });
            }
        });
    });

    // Inject JSON-LD for Organization/Product pages (if not present)
    if (!document.querySelector('script[type="application/ld+json"]')) {
        const ld = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Samuel Wu",
            "url": window.location.origin,
            "logo": window.location.origin + '/images/Icon.jpg'
        };
        const s = document.createElement('script');
        s.type = 'application/ld+json';
        s.innerText = JSON.stringify(ld);
        document.head.appendChild(s);
    }
});

// active nav highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

