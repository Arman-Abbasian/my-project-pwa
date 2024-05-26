let staticItems = ["/", "/index.html", "/offline.html"];

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
// self.addEventListener("fetch", function (e) {
//   console.log("fetch......");
//   if (
//     e.request.url.indexOf("https://jsonplaceholder.typicode.com/users") > -1
//   ) {
//     e.respondWith(
//       caches.open(DYNAMIC_CACHE).then((cache) => {
//         return fetch(e.request).then((response) => {
//           trimCache(DYNAMIC_CACHE, 50);
//           cache.put(e.request, response.clone());
//           return response;
//         });
//       })
//     );
//   } else {
//   e.respondWith(
//     caches.match(e.request).then((res) => {
//       return (
//         res ||
//         fetch(e.request)
//           .then((fetchRes) => {
//             return caches.open(DYNAMIC_CACHE).then((cache) => {
//               trimCache(DYNAMIC_CACHE, 50);
//               cache.put(e.request, fetchRes.clone());
//               return fetchRes;
//             });
//           })
//           .catch((err) => {
//             return caches.open(STATIC_CACHE).then((cache) => {
//               if (e.request.headers.get("accept").includes("text/html")) {
//                 return cache.match("/offline.html");
//               }
//             });
//           })
//       );
//     })
//   );
// }
// });
