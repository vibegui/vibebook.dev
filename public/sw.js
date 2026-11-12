// vibebook service worker: native notifications only (web push). No caching, no fetch handler: the app stays network-first.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));
self.addEventListener("push", (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch { d = { title: "vibebook", body: e.data ? e.data.text() : "" }; }
  e.waitUntil(self.registration.showNotification(d.title || "vibebook", {
    body: d.body || "", icon: "/icon-192.png", badge: "/icon-192.png",
    tag: d.tag || "vibebook", renotify: true, data: { url: d.url || "/app" },
  }));
});
self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = new URL((e.notification.data && e.notification.data.url) || "/app", self.location.origin).href;
  e.waitUntil((async () => {
    // An open vibebook tab/PWA goes to the message; else open one.
    for (const c of await self.clients.matchAll({ type: "window", includeUncontrolled: true })) {
      if (new URL(c.url).origin === self.location.origin) { await c.focus(); return c.navigate(url).catch(() => self.clients.openWindow(url)); }
    }
    return self.clients.openWindow(url);
  })());
});
