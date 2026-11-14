/// <reference lib="webworker" />
import { PushPayload, notificationTarget } from "./payload";
declare const self: ServiceWorkerGlobalScope;
self.addEventListener("install", () => {
  void self.skipWaiting();
});
self.addEventListener("activate", (event) =>
  event.waitUntil(self.clients.claim()),
);
self.addEventListener("push", (event) => {
  let input: unknown;
  try {
    input = event.data?.json() ?? {};
  } catch {
    input = { body: event.data?.text() ?? "" };
  }
  const parsed = PushPayload.safeParse(input),
    data = parsed.success ? parsed.data : {};
  const options = {
    body: data.body || "",
    icon: "/icon-192.png",
    badge: "/icon-192.png",
    tag: data.tag || "vibebook",
    renotify: true,
    data: { url: notificationTarget(data.url, self.location.origin) },
  } satisfies NotificationOptions & { renotify: boolean };
  event.waitUntil(
    self.registration.showNotification(data.title || "vibebook", options),
  );
});
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const data: unknown = event.notification.data;
  const target =
    typeof data === "object" && data !== null && "url" in data
      ? data.url
      : undefined;
  event.waitUntil(
    (async () => {
      for (const client of await self.clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      })) {
        if (new URL(client.url).origin !== self.location.origin) continue;
        const url = notificationTarget(
          target,
          self.location.origin,
          client.url,
        );
        try {
          await client.focus();
          await client.navigate(url);
          return;
        } catch {
          /* A tab may close during a click. */
        }
      }
      await self.clients.openWindow(
        notificationTarget(target, self.location.origin),
      );
    })(),
  );
});
// Deliberately no fetch handler and no Cache API: every app remains network-first.
