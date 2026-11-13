import { expect, mock, test } from "bun:test";
mock.module("cloudflare:workers", () => ({
  DurableObject: class {},
  WorkerEntrypoint: class {},
  env: {},
}));
const { auth, authServices } = await import("../src/auth");
const { authApi } = await import("../src/api");
import { Hono } from "hono";
import { hc } from "hono/client";
import type { AuthAppType, AuthCtx, AuthServices } from "../src/api";

// The Svelte preview is opt-in by URL (?ui=svelte): every redirect back to the login keeps it when the person was
// going to a Svelte page, and vanilla stays vanilla. No provider is configured here, so start goes back to /login.
const env = { SESSION_SECRET: "test" };
const go = async (path: string, init?: RequestInit) => {
  const r = await auth.request(
    `http://127.0.0.1:8797${path}`,
    { redirect: "manual", ...init },
    env,
  );
  return r.headers.get("location");
};
const next = (p: string) => encodeURIComponent(p);

test("provider start without a client id returns to the login in the same UI", async () => {
  expect(await go(`/google/start?next=${next("/b/abc?ui=svelte")}`)).toBe(
    "/login?ui=svelte",
  );
  expect(await go(`/github/start?next=${next("/archived?ui=svelte")}`)).toBe(
    "/login?ui=svelte",
  );
  expect(await go(`/google/start?next=${next("/b/abc")}`)).toBe("/login");
  expect(
    await go(`/google/start?next=${next("https://evil.example/?ui=svelte")}`),
  ).toBe("/login");
});

test("a failed provider callback keeps the UI carried by its next", async () => {
  const cookie = (n: string) => ({
    headers: { cookie: `vb_oauth=${encodeURIComponent(`s|${n}`)}` },
  });
  expect(
    await go("/google/callback?state=x&code=y", cookie("/app?ui=svelte")),
  ).toBe("/login?error=google&ui=svelte");
  expect(
    await go("/github/callback?state=x&code=y", cookie("/app?ui=svelte")),
  ).toBe("/login?error=github&ui=svelte");
  expect(await go("/google/callback?state=x&code=y", cookie("/app"))).toBe(
    "/login?error=google",
  );
  expect(await go("/github/callback")).toBe("/login?error=github");
});

test("the consent page's sign-out form returns to the login in the same UI", async () => {
  // The real services (logout and loginUrl need no bindings) behind the typed route.
  const app = new Hono<AuthCtx>()
    .use("/auth/*", async (c, next) => {
      c.set("auth", authServices(c as never));
      await next();
    })
    .route("/", authApi);
  const out = async (n: string) =>
    (
      await app.request(
        "http://127.0.0.1:8797/auth/logout",
        { method: "POST", body: new URLSearchParams({ next: n }) },
        env,
      )
    ).headers.get("location");
  expect(await out("/b/abc?ui=svelte")).toBe(
    `/login?next=${next("/b/abc?ui=svelte")}&ui=svelte`,
  );
  expect(await out("/b/abc")).toBe(`/login?next=${next("/b/abc")}`);
});

// The typed public routes with fake services: validation, origin check, statuses and bodies as the client sees them.
function authFixture(over: Partial<AuthServices> = {}) {
  const calls: unknown[] = [];
  const svc: AuthServices = {
    providers: { google: true, github: false, email: true },
    sameOrigin: true,
    safeNext: (n) => (n?.startsWith("/b/") ? n : "/app"),
    loginUrl: (_n, q) => `/login${q}`,
    emailStart: async (email) => (
      calls.push(email),
      email === "slow@x.dev" ? { error: "wait", status: 429 } : { ok: true }
    ),
    emailVerify: async (b) => (
      calls.push(b),
      b.code === "123456"
        ? { ok: true, next: "/app" }
        : { error: "Wrong code.", status: 400 }
    ),
    logout: () => void calls.push("logout"),
    logoutAll: async () => ({ error: "unauthenticated", status: 401 }),
    ...over,
  };
  const app = new Hono<AuthCtx>()
    .use("/auth/*", async (c, next) => {
      c.set("auth", svc);
      await next();
    })
    .route("/", authApi);
  const client = hc<AuthAppType>("http://127.0.0.1:8797/", {
    fetch: (i: RequestInfo | URL, init?: RequestInit) => app.request(i, init),
  });
  return { client, calls };
}

test("login context: providers, a safe next and only known provider errors", async () => {
  const { client } = authFixture();
  const r = await client.auth.context.$get({
    query: { next: "https://evil.example/", error: "google" },
  });
  expect(r.status).toBe(200);
  expect(await r.json()).toEqual({
    providers: { google: true, github: false, email: true },
    next: "/app",
    error: "google",
  });
  const r2 = await client.auth.context.$get({
    query: { next: "/b/abc?ui=svelte", error: "<script>" },
  });
  expect(await r2.json()).toEqual({
    providers: { google: true, github: false, email: true },
    next: "/b/abc?ui=svelte",
    error: null,
  });
  expect(await (await client.auth.providers.$get()).json()).toEqual({
    google: true,
    github: false,
    email: true,
  });
});

test("email start and verify: body checked, origin checked, service status passed through", async () => {
  const { client, calls } = authFixture();
  expect(
    (await client.auth.email.start.$post({ json: { email: "a@x.dev" } }))
      .status,
  ).toBe(200);
  const slow = await client.auth.email.start.$post({
    json: { email: "slow@x.dev" },
  });
  expect(slow.status).toBe(429);
  expect(await slow.json()).toEqual({ error: "wait" });
  const bad = await client.auth.email.start.$post({
    json: { email: 7 as never },
  });
  expect(bad.status).toBe(400);
  const ok = await client.auth.email.verify.$post({
    json: { email: "a@x.dev", code: "123456", next: "/b/abc" },
  });
  expect(await ok.json()).toEqual({ ok: true, next: "/app" });
  const wrong = await client.auth.email.verify.$post({
    json: { email: "a@x.dev", code: "000000" },
  });
  expect(wrong.status).toBe(400);
  expect(calls).toHaveLength(4); // the malformed body never reached the service
  const cross = authFixture({ sameOrigin: false });
  expect(
    (await cross.client.auth.email.start.$post({ json: { email: "a@x.dev" } }))
      .status,
  ).toBe(403);
  expect(
    (
      await cross.client.auth.email.verify.$post({
        json: { email: "a@x.dev", code: "123456" },
      })
    ).status,
  ).toBe(403);
  expect(cross.calls).toHaveLength(0);
});

test("logout answers JSON to the app; logout-all reports a signed-out caller", async () => {
  const { client, calls } = authFixture();
  expect(await (await client.auth.logout.$post()).json()).toEqual({ ok: true });
  expect(calls).toEqual(["logout"]);
  const all = await client.auth["logout-all"].$post();
  expect(all.status).toBe(401);
  expect(await all.json()).toEqual({ error: "unauthenticated" });
});

test("an MCP sign-in started from the Svelte preview comes back to the same app, on the connection", async () => {
  const { uiNavigationUrl, uiVariant } = await import("../shared/uiVariant");
  const back = (signin: string) =>
    uiNavigationUrl("/b/abc#app:c1", signin, uiVariant(signin));
  expect(
    back("https://vibebook.dev/api/books/abc/connections/c1/signin?ui=svelte"),
  ).toBe("/b/abc?ui=svelte#app:c1");
  expect(back("https://vibebook.dev/api/books/abc/connections/c1/signin")).toBe(
    "/b/abc#app:c1",
  );
});
