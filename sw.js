const CACHE_NAME = 'gitgud-tracker-v47';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './404.html',
  './css/style.css',
  './js/app.js',
  './manifest.json',
  './img/logo.png',
  './img/favicon.png',
  './img/ghost-404.png',
  './assets/fonts/cinzel-500-8vIJ7ww63mVu7gt7-GT7LEc.woff2',
  './assets/fonts/cinzel-500-8vIJ7ww63mVu7gt79mT7.woff2',
  './assets/fonts/cinzel-600-8vIJ7ww63mVu7gt7-GT7LEc.woff2',
  './assets/fonts/cinzel-600-8vIJ7ww63mVu7gt79mT7.woff2',
  './assets/fonts/cinzel-700-8vIJ7ww63mVu7gt7-GT7LEc.woff2',
  './assets/fonts/cinzel-700-8vIJ7ww63mVu7gt79mT7.woff2',
  './assets/fonts/cinzel-800-8vIJ7ww63mVu7gt7-GT7LEc.woff2',
  './assets/fonts/cinzel-800-8vIJ7ww63mVu7gt79mT7.woff2',
  './assets/fonts/cinzel-900-8vIJ7ww63mVu7gt7-GT7LEc.woff2',
  './assets/fonts/cinzel-900-8vIJ7ww63mVu7gt79mT7.woff2',
  './assets/fonts/fonts.css',
  './assets/fonts/jetbrains-mono-400-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx3cwhsk.woff2',
  './assets/fonts/jetbrains-mono-400-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx7cwhsk.woff2',
  './assets/fonts/jetbrains-mono-400-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwg.woff2',
  './assets/fonts/jetbrains-mono-400-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxPcwhsk.woff2',
  './assets/fonts/jetbrains-mono-400-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxTcwhsk.woff2',
  './assets/fonts/jetbrains-mono-400-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx_cwhsk.woff2',
  './assets/fonts/jetbrains-mono-500-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx3cwhsk.woff2',
  './assets/fonts/jetbrains-mono-500-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx7cwhsk.woff2',
  './assets/fonts/jetbrains-mono-500-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwg.woff2',
  './assets/fonts/jetbrains-mono-500-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxPcwhsk.woff2',
  './assets/fonts/jetbrains-mono-500-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxTcwhsk.woff2',
  './assets/fonts/jetbrains-mono-500-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx_cwhsk.woff2',
  './assets/fonts/jetbrains-mono-600-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx3cwhsk.woff2',
  './assets/fonts/jetbrains-mono-600-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx7cwhsk.woff2',
  './assets/fonts/jetbrains-mono-600-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxDcwg.woff2',
  './assets/fonts/jetbrains-mono-600-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxPcwhsk.woff2',
  './assets/fonts/jetbrains-mono-600-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPxTcwhsk.woff2',
  './assets/fonts/jetbrains-mono-600-tDbv2o-flEEny0FZhsfKu5WU4zr3E_BX0PnT8RD8yKwBNntkaToggR7BYRbKPx_cwhsk.woff2',
  './assets/fonts/outfit-400-QGYvz_MVcBeNP4NJtEtq.woff2',
  './assets/fonts/outfit-400-QGYvz_MVcBeNP4NJuktqQ4E.woff2',
  './assets/fonts/outfit-500-QGYvz_MVcBeNP4NJtEtq.woff2',
  './assets/fonts/outfit-500-QGYvz_MVcBeNP4NJuktqQ4E.woff2',
  './assets/fonts/outfit-600-QGYvz_MVcBeNP4NJtEtq.woff2',
  './assets/fonts/outfit-600-QGYvz_MVcBeNP4NJuktqQ4E.woff2',
  './assets/fonts/outfit-700-QGYvz_MVcBeNP4NJtEtq.woff2',
  './assets/fonts/outfit-700-QGYvz_MVcBeNP4NJuktqQ4E.woff2',
  './assets/fonts/plus-jakarta-sans-400-LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko20yw.woff2',
  './assets/fonts/plus-jakarta-sans-400-LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko40yyygA.woff2',
  './assets/fonts/plus-jakarta-sans-400-LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko50yyygA.woff2',
  './assets/fonts/plus-jakarta-sans-400-LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko70yyygA.woff2',
  './assets/fonts/plus-jakarta-sans-500-LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko20yw.woff2',
  './assets/fonts/plus-jakarta-sans-500-LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko40yyygA.woff2',
  './assets/fonts/plus-jakarta-sans-500-LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko50yyygA.woff2',
  './assets/fonts/plus-jakarta-sans-500-LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko70yyygA.woff2',
  './assets/fonts/plus-jakarta-sans-600-LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko20yw.woff2',
  './assets/fonts/plus-jakarta-sans-600-LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko40yyygA.woff2',
  './assets/fonts/plus-jakarta-sans-600-LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko50yyygA.woff2',
  './assets/fonts/plus-jakarta-sans-600-LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko70yyygA.woff2',
  './assets/fonts/plus-jakarta-sans-700-LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko20yw.woff2',
  './assets/fonts/plus-jakarta-sans-700-LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko40yyygA.woff2',
  './assets/fonts/plus-jakarta-sans-700-LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko50yyygA.woff2',
  './assets/fonts/plus-jakarta-sans-700-LDIoaomQNQcsA88c7O9yZ4KMCoOg4Ko70yyygA.woff2',
  './assets/js/lucide.min.js',
  './assets/vendor/bootstrap.min.css',
  './assets/vendor/bootstrap.min.js',
  './assets/vendor/jquery.min.js',
  './assets/vendor/jstorage.min.js',
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
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
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

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request, { cache: 'no-cache' })
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(async () => {
        const cachedResponse = await caches.match(event.request, { ignoreSearch: true });
        if (cachedResponse) {
          return cachedResponse;
        }
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      })
  );
});
