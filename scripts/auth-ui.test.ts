import { expect, mock, test } from "bun:test";
mock.module("cloudflare:workers", () => ({
  DurableObject: class {},
  WorkerEntrypoint: class {},
  env: {},
}));
const { auth } = await import("../src/auth");

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
  const form = (n: string) => ({
    method: "POST",
    body: new URLSearchParams({ next: n }),
  });
  expect(await go("/logout", form("/b/abc?ui=svelte"))).toBe(
    `/login?next=${next("/b/abc?ui=svelte")}&ui=svelte`,
  );
  expect(await go("/logout", form("/b/abc"))).toBe(
    `/login?next=${next("/b/abc")}`,
  );
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
