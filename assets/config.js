// Load site config and populate contact links/placeholders
(function(){
  async function load() {
    try {
      const res = await fetch('/site.config.json', {cache: 'no-store'});
      if (!res.ok) return;
      const cfg = await res.json();
      // map of element IDs to config keys
      const map = {
        'contact-email': 'email',
        'contact-linkedin': 'linkedin',
        'contact-github': 'github',
  'contact-instagram': 'instagram',
  'contact-discord': 'discord',
  'contact-twitter': 'twitter'
      };
      Object.keys(map).forEach(id => {
        const key = map[id];
        const el = document.getElementById(id);
        if (!el || !cfg[key]) return;
        if (el.tagName === 'A') {
          if (key === 'email') el.setAttribute('href', 'mailto:' + cfg[key]);
          else el.setAttribute('href', cfg[key]);
          el.textContent = cfg[key].replace(/^https?:\/\//, '').replace(/\/$/, '');
        }
      });
    } catch (e) {
      console.warn('Failed to load site config', e);
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load); else load();
})();
