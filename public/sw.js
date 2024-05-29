let staticItems = [
  "/",
  "/index.html",
  "/manifest.json",
  "/images/landing-page.jpg",
  "/images/icons/original/icon-144.png",
  "/static/js/bundle.js",
];

//when we change the name that means we have a new version
let STATIC_CACHE = "static-v1";
let DYNAMIC_CACHE = "dynamic-v1";

// install event -------------------------------------->>
self.addEventListener("install", function (e) {
  console.log("install...");
  e.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      cache.addAll(staticItems);
    })
  );
});

// activate event ------------------------------------>>
self.addEventListener("activate", function (e) {
  console.log("activate...");
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key != STATIC_CACHE && key != DYNAMIC_CACHE) {
            console.log("Deleting Cache:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// fetch event -------------------------------------->>
self.addEventListener("fetch", async (event) => {
  event.respondWith(
    caches.open(STATIC_CACHE).then(async (cache) => {
      const cachedResponse = await cache.match(event.request);
      if (cachedResponse) {
        // Serve cached image if available
        return cachedResponse;
      }
      // Fetch from network and cache the response
      try {
        const networkResponse = await fetch(event.request);
        cache.put(event.request, networkResponse.clone());
        return networkResponse;
      } catch (error) {
        // Network request failed, serve cached image
        return caches.match("/offline-image.jpg"); // Replace with your offline image
      }
    })
  );
});
