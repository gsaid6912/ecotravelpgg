self.addEventListener("install", (event) => {
  console.log("Service Worker: Install");

  event.waitUntil(
    caches
      .open("my-cache-v1")
      .then((cache) => {
        return cache.addAll([
          "/", // Asegúrate de que esta ruta esté disponible desde tu servidor
          "/index.html",
          "/app.js",
          "/alpes.html",
          "/amazonas.html",
          "/bergen.html",
          "/contacto.html",
          "/costa.html",
          "/destinos.html",
          "/dinamarca.html",
          "/gotemburgo.html",
          "/manifest.json",
          "/CSS/style.css",
          "/image/Alpes.jpg",
          "/image/Amazonas.jpg",
          "/image/Bergen.jpg",
          "/image/Copenhague.jpg",
          "/image/CostaSol.jpg",
          "/image/Eco_192x192.png",
          "/image/Eco_512x512-1.png",
          "/image/Fondo.jpg",
          "/image/Gotemburgo.jpg",
          "/image/Screenshot_Movil.png",
          "/image/Screenshot_PC.png",
          "/sw.js",
        ]);
      })
      .catch((error) => {
        console.error("Failed to cache assets during install:", error);
      })
  );
});

self.addEventListener("activate", function (event) {
  const cacheWhitelist = ["my-cache-v1"];
  console.log("activate");
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  console.log("Fetch", event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then(function (response) {
        return response || fetch(event.request);
      })
      .catch(() => caches.match("/index.html"))
  );
});
