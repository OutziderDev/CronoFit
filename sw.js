const CACHE_NAME = "interval-timer-v1";
const ASSETS = [
  "/",
  "/assets",
  "/assets/images",
  "/assets/sounds",
  "/index.html",
  "/style.css",
  "/app.js",
  "/manifest.json",
  "/assets/sounds/beep.mp3"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});
