//Workbox

importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox) {
    console.log("Workbox berhasil dimuat");
} else {
    console.log("Workbox gagal dimuat");
}

workbox.precaching.precacheAndRoute ([
    { url: '/', revision: '1'},
    { url: '/index.html', revision: '1' },
    { url: '/favorit.html', revision: '1' },
    { url: '/info-klub.html', revision: '1' },
    { url: '/klub.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/pertandingan.html', revision: '1' },
    { url: '/push.js', revision: '1' },
    { url: '/laliga.png', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/registsw.js', revision: '1' },
    { url: '/js/idb/idb.js', revision: '1' },
    { url: '/manifest.json', revision: '1'}
]);

workbox.routing.registerRoute(
    /.*(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'image',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200]
            }),
            new workbox.expiration.Plugin({
                maxEntries: 40,
                maxAgeSeconds: 30 * 24 * 60 * 60, //30 Hari
            }),
        ]
    })
);

//Caching Halaman
workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'footbal-data'
    })
);

// Notification
self.addEventListener("push", function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }

    var options = {
        body: body,
        icon: '/img/laliga512.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});