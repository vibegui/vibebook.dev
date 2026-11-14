let registration: Promise<ServiceWorkerRegistration> | null = null;
export async function existingPushRegistration() {
  if (!("serviceWorker" in navigator)) return undefined;
  const reg = await navigator.serviceWorker.getRegistration("/");
  const worker = reg?.active ?? reg?.waiting ?? reg?.installing;
  if (
    reg &&
    (reg.scope !== new URL("/", location.origin).href ||
      (worker && new URL(worker.scriptURL).pathname !== "/sw.js"))
  )
    throw new Error("unexpected-worker");
  return reg;
}
export function pushRegistration(): Promise<ServiceWorkerRegistration> {
  if (!registration) {
    const operation = (async () => {
      const existing = await existingPushRegistration();
      const reg =
        existing ??
        (await navigator.serviceWorker.register("/sw.js", { scope: "/" }));
      if (existing) await reg.update();
      const ready = await navigator.serviceWorker.ready;
      if (ready.scope !== new URL("/", location.origin).href)
        throw new Error("unexpected-worker");
      return reg;
    })();
    let timer: ReturnType<typeof setTimeout>;
    const request = Promise.race([
      operation,
      new Promise<never>((_resolve, reject) => {
        timer = setTimeout(() => reject(new Error("worker-timeout")), 20_000);
      }),
    ]).finally(() => clearTimeout(timer));
    registration = request;
    void request.catch(() => {
      if (registration === request) registration = null;
    });
  }
  return registration;
}
export function keyBytes(key: string) {
  if (!/^[A-Za-z0-9_-]+$/.test(key)) throw new Error("invalid-key");
  return Uint8Array.from(
    atob(
      key.replace(/-/g, "+").replace(/_/g, "/") +
        "=".repeat((4 - (key.length % 4)) % 4),
    ),
    (char) => char.charCodeAt(0),
  );
}
