const { chromium } = require('playwright');

(async () => {
  const url = 'http://127.0.0.1:5500/';
  console.log('Launching headless chromium and opening', url);
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  page.on('console', msg => {
    try {
      console.log('[PAGE]', msg.type(), msg.text());
    } catch (e) { }
  });

  page.on('pageerror', err => console.log('[PAGE ERROR]', err.toString()));

  try {
    await page.goto(url, { waitUntil: 'networkidle' });

    // wait a bit for config.js to run and SW to register
    await page.waitForTimeout(1000);

    const anchors = await page.evaluate(() => {
      const ids = ['contact-email','contact-linkedin','contact-github','contact-instagram','contact-discord'];
      const out = {};
      ids.forEach(id => {
        const el = document.getElementById(id);
        out[id] = el ? { href: el.getAttribute('href'), text: el.textContent } : null;
      });
      return out;
    });

    console.log('Anchors:', JSON.stringify(anchors, null, 2));

    const sw = await page.evaluate(async () => {
      if (!navigator.serviceWorker) return { supported: false };
      const controller = !!navigator.serviceWorker.controller;
      const reg = await navigator.serviceWorker.getRegistration();
      return { supported: true, controlled: controller, hasRegistration: !!reg };
    });

    console.log('Service Worker:', JSON.stringify(sw, null, 2));

    // Visit contact page and check anchors there
    const contactUrl = new URL('/contact.html', url).toString();
    await page.goto(contactUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(700);
    const contactAnchors = await page.evaluate(() => {
      const ids = ['contact-email','contact-linkedin','contact-github','contact-instagram','contact-discord'];
      const out = {};
      ids.forEach(id => {
        const el = document.getElementById(id);
        out[id] = el ? { href: el.getAttribute('href'), text: el.textContent } : null;
      });
      return out;
    });
    console.log('Contact page anchors:', JSON.stringify(contactAnchors, null, 2));

    // Visit products page and attempt to open a product modal (if present)
    const productsUrl = new URL('/products.html', url).toString();
    await page.goto(productsUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(700);
    const modalResult = await page.evaluate(async () => {
      // heuristic: find a clickable product element
      const candidate = document.querySelector('[data-product-id], .product, .project, .thumb, .modal-trigger, a[href="#"]');
      if (!candidate) return { clicked: false, reason: 'no-candidate' };
      try {
        candidate.click();
        await new Promise(r => setTimeout(r, 500));
        // attempt to find an open modal element
        const modal = document.querySelector('dialog[open], .modal[open], .product-modal, .modal, #productModal');
        return { clicked: true, modalPresent: !!modal, modalHtml: modal ? modal.outerHTML.slice(0, 500) : null };
      } catch (e) {
        return { clicked: false, reason: e.message };
      }
    });
    console.log('Products page modal result:', JSON.stringify(modalResult, null, 2));

    // Explicitly register the site SW, attempt to update it, poll for a waiting service worker, and post SKIP_WAITING
    const skipResult = await page.evaluate(async () => {
      if (!navigator.serviceWorker) return { supported: false };
      try {
        await navigator.serviceWorker.register('/sw.js');
      } catch (e) {
        // ignore registration errors
      }
      let reg = await navigator.serviceWorker.getRegistration();
      if (!reg) return { hasRegistration: false };
      try { await reg.update(); } catch (e) { /* ignore */ }
      // poll for a waiting worker for up to ~5 seconds
      const start = Date.now();
      while (Date.now() - start < 5000) {
        reg = await navigator.serviceWorker.getRegistration();
        if (reg && reg.waiting) {
          try { reg.waiting.postMessage({ type: 'SKIP_WAITING' }); } catch (e) { }
          return { postedSkipWaiting: true };
        }
        await new Promise(r => setTimeout(r, 300));
      }
      return { postedSkipWaiting: false, reason: 'no-waiting-worker-after-update' };
    });
    console.log('Skip waiting attempt:', JSON.stringify(skipResult, null, 2));

  } catch (err) {
    console.error('Headless check failed:', err);
  } finally {
    await browser.close();
  }
})();
