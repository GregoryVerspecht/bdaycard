const cacheName = "bday-card-v3.0";
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/script.js",
  "/assets/happy-birthday.mp3"
];

// Cache de bestanden
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
});

// Dien bestanden op vanuit de cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
