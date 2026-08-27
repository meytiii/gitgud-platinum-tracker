// GitGud Tracker Service Worker - Offline Caching
const CACHE_NAME = 'gitgud-tracker-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './manifest.json',
  './img/logo.png',
  './img/favicon.png',
  './data/ds1.json',
  './data/ds2.json',
  './data/ds3.json',
  './data/sekiro.json',
  './data/bloodborne.json',
  './data/eldenring.json',
  './data/eldenringnightreign.json',
  './data/demonssouls.json',
  './data/liesofp.json',
  './data/walkthroughs/ds1_walkthrough.json',
  './data/walkthroughs/ds2_walkthrough.json',
  './data/walkthroughs/ds3_walkthrough.json',
  './data/walkthroughs/eldenring_walkthrough.json',
  './data/walkthroughs/sekiro_walkthrough.json',
  './data/walkthroughs/bloodborne_walkthrough.json',
  './data/walkthroughs/demonssouls_walkthrough.json',
  './data/equipment/ds1_equipment.json',
  './data/equipment/ds2_equipment.json',
  './data/equipment/ds3_equipment.json',
  './data/equipment/bloodborne_equipment.json',
  './data/equipment/eldenring_equipment.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // Fallback for offline navigation
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
