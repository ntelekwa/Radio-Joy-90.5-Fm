// Radio Joy 90.5 FM Production Service Worker
const CACHE_NAME = 'radiojoy-v1.0.0';
const STATIC_CACHE_NAME = 'radiojoy-static-v1.0.0';

const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME && name !== STATIC_CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Skip audio streams and non-GET requests from service worker caching
  if (event.request.method !== 'GET' || url.pathname.includes('stream') || url.protocol === 'chrome-extension:') {
    return;
  }

  // API Requests: Network First, fallback to cache
  if (url.pathname.startsWith('/api/news') || url.pathname.startsWith('/api/notifications')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          if (cached) return cached;
          return new Response(JSON.stringify({ articles: [], error: 'Offline - data unavailable' }), {
            headers: { 'Content-Type': 'application/json' },
          });
        })
    );
    return;
  }

  // App Shell & Static Assets: Cache First, fallback to network
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;

      return fetch(event.request)
        .then((response) => {
          // Cache successful image and font responses
          if (
            response &&
            response.status === 200 &&
            (event.request.destination === 'image' ||
              event.request.destination === 'font' ||
              event.request.destination === 'style' ||
              event.request.destination === 'script')
          ) {
            const clone = response.clone();
            caches.open(STATIC_CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        })
        .catch(() => {
          // Fallback to cached index.html for navigation requests
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
    })
  );
});
