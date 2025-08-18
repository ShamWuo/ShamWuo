// Bumped cache name to simulate an update for testing the skip-waiting flow
const CACHE_NAME = 'shamwu-v3';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/products.html',
  '/contact.html',
  '/assets/style.min.css',
  '/assets/main.js',
  '/assets/images/p1-thumb.svg',
  '/assets/images/p2-thumb.svg',
  '/assets/images/p3-thumb.svg',
  '/images/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Attempt to precache each URL individually so a single missing/404 asset
      // doesn't cause the entire install to fail. We log failures and continue.
      return Promise.all(PRECACHE_URLS.map(url =>
        fetch(url, { cache: 'no-store' }).then(resp => {
          if (!resp || !resp.ok) throw new Error('Fetch failed: ' + url);
          return cache.put(url, resp.clone());
        }).catch(err => {
          console.warn('Failed to precache', url, err);
          return Promise.resolve();
        })
      ));
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  // Take control of uncontrolled clients immediately after activation
  event.waitUntil(self.clients.claim());
  // Notify clients that this worker activated (useful for tests)
  event.waitUntil(self.clients.matchAll().then(clients => {
    clients.forEach(c => {
      try { c.postMessage({ type: 'sw-activated', cache: CACHE_NAME }); } catch (e) { }
    });
  }));
});

self.addEventListener('fetch', event => {
  // simple cache-first strategy for assets and navigation
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request).then(resp => {
      return caches.open(CACHE_NAME).then(cache => { cache.put(event.request, resp.clone()); return resp; });
    })).catch(() => caches.match('/index.html'))
  );
});

// Listen for skip waiting message from the page
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
