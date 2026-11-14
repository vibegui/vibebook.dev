import { writable } from "svelte/store";
import { authClock, type AuthClock } from "../auth/owner";
export const DEVICE_LOCK_AFTER = 5 * 60_000;
type Credentials = Pick<CredentialsContainer, "create" | "get">;
type Storage = Pick<globalThis.Storage, "getItem" | "setItem" | "removeItem">;
/** A local display lock, not server authentication. It never changes a login session or registers with the server. */
export function createDeviceLock(options: {
  storage: Storage;
  credentials: Credentials | null;
  random: (size: number) => Uint8Array<ArrayBuffer>;
  now?: () => number;
  clock?: AuthClock;
}) {
  const state = writable({
    enabled: false,
    locked: false,
    busy: false,
    error: "",
    supported: options.credentials !== null,
  });
  let active = true,
    sequence = 0,
    hiddenAt: number | null = null,
    controller: AbortController | null = null,
    timer: unknown | null = null;
  const now = options.now ?? Date.now,
    clock = options.clock ?? authClock;
  function stored() {
    try {
      return options.storage.getItem("vb.lock");
    } catch {
      return null;
    }
  }
  function cancel() {
    if (timer !== null) clock.cancel(timer);
    timer = null;
    sequence++;
    controller?.abort();
    controller = null;
    state.update((s) => ({ ...s, busy: false }));
  }
  function begin() {
    cancel();
    controller = new AbortController();
    const ticket = sequence;
    timer = clock.schedule(() => {
      if (active && ticket === sequence) {
        cancel();
        state.update((s) => ({ ...s, error: "timeout" }));
      }
    }, 60_000);
    return {
      signal: controller.signal,
      current: () => active && ticket === sequence,
    };
  }
  const initial = stored();
  state.update((s) => ({ ...s, enabled: !!initial, locked: !!initial }));
  return {
    state,
    async configure(on: boolean, email: string, owner: () => boolean) {
      if (!active || !owner()) return;
      if (!on) {
        cancel();
        try {
          options.storage.removeItem("vb.lock");
          state.update((s) => ({
            ...s,
            enabled: false,
            locked: false,
            error: "",
          }));
        } catch {
          state.update((s) => ({ ...s, error: "storage-unavailable" }));
        }
        return;
      }
      if (!options.credentials) {
        state.update((s) => ({ ...s, error: "unsupported" }));
        return;
      }
      const request = begin();
      state.update((s) => ({ ...s, busy: true, error: "" }));
      try {
        const credential = await options.credentials.create({
          signal: request.signal,
          publicKey: {
            ...{ hints: ["client-device"] },
            challenge: options.random(32),
            rp: { name: "vibebook" },
            user: {
              id: options.random(16),
              name: email,
              displayName: "vibebook",
            },
            pubKeyCredParams: [
              { type: "public-key", alg: -7 },
              { type: "public-key", alg: -257 },
            ],
            authenticatorSelection: {
              authenticatorAttachment: "platform",
              userVerification: "required",
              residentKey: "required",
              requireResidentKey: true,
            },
            timeout: 60_000,
          },
        });
        if (!request.current() || !owner()) return;
        if (
          !credential ||
          !("rawId" in credential) ||
          !(credential.rawId instanceof ArrayBuffer) ||
          credential.type !== "public-key"
        )
          throw Error("cancelled");
        const id = btoa(
          String.fromCharCode(...new Uint8Array(credential.rawId)),
        );
        options.storage.setItem("vb.lock", id);
        state.update((s) => ({ ...s, enabled: true, busy: false, error: "" }));
      } catch (error) {
        if (request.current() && owner())
          state.update((s) => ({
            ...s,
            busy: false,
            error:
              error instanceof DOMException && error.name === "NotAllowedError"
                ? "cancelled"
                : "device-failed",
          }));
      } finally {
        if (request.current()) {
          if (timer !== null) clock.cancel(timer);
          timer = null;
          controller = null;
          state.update((s) => ({ ...s, busy: false }));
        }
      }
    },
    async unlock() {
      if (!active || !stored() || !options.credentials) return;
      const request = begin();
      state.update((s) => ({ ...s, busy: true, error: "" }));
      try {
        const id = stored();
        if (!id) throw Error("missing-key");
        const credential = await options.credentials.get({
          signal: request.signal,
          publicKey: {
            ...{ hints: ["client-device"] },
            challenge: options.random(32),
            allowCredentials: [
              {
                type: "public-key",
                id: Uint8Array.from(atob(id), (char) => char.charCodeAt(0)),
              },
            ],
            userVerification: "required",
            timeout: 60_000,
          },
        });
        if (!request.current()) return;
        if (!credential || credential.type !== "public-key")
          throw Error("cancelled");
        state.update((s) => ({ ...s, locked: false, busy: false, error: "" }));
      } catch {
        if (request.current())
          state.update((s) => ({ ...s, busy: false, error: "unlock-failed" }));
      } finally {
        if (request.current()) {
          if (timer !== null) clock.cancel(timer);
          timer = null;
          controller = null;
          state.update((s) => ({ ...s, busy: false }));
        }
      }
    },
    visibility(hidden: boolean) {
      if (!active) return;
      if (hidden) hiddenAt = now();
      else if (hiddenAt !== null) {
        if (now() - hiddenAt > DEVICE_LOCK_AFTER && stored()) {
          cancel();
          state.update((s) => ({ ...s, locked: true, error: "" }));
        }
        hiddenAt = null;
      }
    },
    cancel,
    dispose() {
      active = false;
      cancel();
    },
  };
}
export type DeviceLock = ReturnType<typeof createDeviceLock>;
export function browserDeviceLock() {
  let storage: Storage;
  try {
    storage = localStorage;
  } catch {
    storage = {
      getItem: () => null,
      setItem: () => {
        throw Error("storage-unavailable");
      },
      removeItem: () => {
        throw Error("storage-unavailable");
      },
    };
  }
  return createDeviceLock({
    storage,
    credentials:
      typeof PublicKeyCredential !== "undefined" &&
      navigator.credentials &&
      typeof navigator.credentials.create === "function" &&
      typeof navigator.credentials.get === "function"
        ? navigator.credentials
        : null,
    random: (size) => crypto.getRandomValues(new Uint8Array(size)),
  });
}
