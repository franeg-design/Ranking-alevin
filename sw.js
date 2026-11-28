// Estrategia "network-first": intenta red y guarda copia; si no hay conexión, usa caché.
// Así las actualizaciones (datos y app) llegan siempre; y sigue funcionando sin conexión.
// (28-nov-2026) ranking-v3: al activarse borra las copias viejas (ranking-v2). Y la app (las navegaciones)
// se pide a GitHub sin pasar por la caché HTTP del móvil (cache:"no-store"), que la dejaba vieja hasta 10 min.
const CACHE = "ranking-v3";
const SHELL = [
  "./", "./index.html", "./manifest.json", "./data.csv",
  "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const red = e.request.mode === "navigate" ? fetch(e.request.url, { cache: "no-store" }) : fetch(e.request);
  e.respondWith(
    red.then(r => {
      const cp = r.clone();
      caches.open(CACHE).then(c => c.put(e.request, cp)).catch(() => {});
      return r;
    }).catch(() => caches.match(e.request).then(r => r || caches.match("./index.html")))
  );
});
