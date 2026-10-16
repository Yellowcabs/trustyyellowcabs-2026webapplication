// This legacy worker is intentionally self-disabling. TrustyYellowCabs does not
// provide an offline booking experience, so it must not serve cached HTML or
// stale booking/API responses.
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith("TrustyYellowCabs-"))
          .map((key) => caches.delete(key))
      );
      await self.clients.claim();
      await self.registration.unregister();
    })()
  );
});
