const CACHE_NAME = 'xBewerbung-cache-v1';
const urlsToCache = [
  '/xBewerbung/',
  '/xBewerbung/index.html',
  '/xBewerbung/style.css',
  '/xBewerbung/script.js',
  '/xBewerbung/manifest.json',
  '/xBewerbung/icons/icon-192x192.png',
  '/xBewerbung/icons/icon-512x512.png',
  '/xBewerbung/bewerbung.webp',
  '/xBewerbung/xBew.mp4'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return the cached resource if available, otherwise fetch it
                return response || fetch(event.request).catch(() => {
                    // If the resource is not in the cache and fails to fetch, return a fallback response
                    if (event.request.mode === 'navigate') {
                        return caches.match('/xBewerbung/index.html'); // Fallback to index.html for navigational requests
                    }
                });
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
