const CACHE_NAME = "cronofit-timer-v1";
const ASSETS = [
  "/",
  "/style.css",
  "/app.js",
  "/assets/icons/menu.svg",
  "/assets/icons/pause.svg",
  "/assets/icons/play.svg",
  "/assets/icons/plus.svg",
  "/assets/icons/reload.svg",
  "/assets/icons/seting.svg",
  "/favicon/favicon.ico",
  "/assets/sounds/beep.mp3"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then( (cachesNames) => {
      return Promise.all(
        cachesNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    })
  );
})

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
