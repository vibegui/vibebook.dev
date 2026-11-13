// Frontend-only compile fixtures: tooling and server globals must stay unavailable.
export {};

type Assert<T extends true> = T;
type BrowserTimerIsNumber = Assert<
  ReturnType<typeof setTimeout> extends number ? true : false
>;
type ViteModeIsString = Assert<
  ImportMeta["env"]["MODE"] extends string ? true : false
>;

// @ts-expect-error Node globals must not enter the browser type environment.
type NoProcess = typeof process;
// @ts-expect-error Node globals must not enter the browser type environment.
type NoBuffer = typeof Buffer;
// @ts-expect-error Bun globals belong to tooling and server code.
type NoBun = typeof Bun;
// @ts-expect-error CommonJS globals must not enter the browser type environment.
type NoRequire = typeof require;
// @ts-expect-error CommonJS globals must not enter the browser type environment.
type NoDirname = typeof __dirname;
// @ts-expect-error Cloudflare Worker bindings belong to server code.
type NoWorkerBinding = DurableObjectNamespace<never>;
// @ts-expect-error Cloudflare Worker sockets belong to server code.
type NoWorkerSockets = typeof WebSocketPair;
