// Route/presentation unit fixtures. These substitute provider helpers and do not
// claim real cookie binding, KV transaction consumption or provider completion.
import { expect, mock, spyOn, test } from "bun:test";
mock.module("cloudflare:workers", () => ({
  DurableObject: class {},
  WorkerEntrypoint: class {},
  env: {},
}));
const { connect } = await import("../src/connect");
const { AuthorizationError } =
  await import("@cloudflare/workers-oauth-provider");
const shell =
  '<link href="/svelte-preview/ui.css?v=0123456789abcdef0123"><script src="/svelte-preview/app.js?v=0123456789abcdef0123"></script>';
const assets = { fetch: async () => new Response(shell) };
const here =
  "http://127.0.0.1:8797/authorize?ui=svelte&client_id=client&state=original";
const post = (decision?: string) => ({
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  body: new URLSearchParams({
    handle: "OLD-HANDLE",
    ...(decision ? { decision } : {}),
  }),
});
test("invalid/replayed handle failures render native400 without processing context or exposing provider detail", async () => {
  let approve = 0,
    context = 0;
  const response = await connect.request(here, post("approve"), {
    DEV_EMAIL: "me@test.com",
    ASSETS: assets,
    OAUTH_PROVIDER: {
      approveConsent: async () => {
        approve++;
        throw new AuthorizationError("invalid_request", {
          description: "private expired handle detail",
        });
      },
      beginConsent: async () => {
        context++;
        throw Error("must not begin");
      },
    },
  });
  expect(response.status).toBe(400);
  expect(response.headers.get("cache-control")).toBe("no-store");
  expect(response.headers.get("x-frame-options")).toBe("DENY");
  const html = await response.text();
  expect(html).toContain('name="vb-consent-failure" content="1"');
  expect(html).not.toContain("private expired handle detail");
  expect(html).not.toContain("OLD-HANDLE");
  expect(context).toBe(0);
  expect(approve).toBe(1);
});
test("unexpected POST errors keep500 and server error visibility while rendering only generic native metadata", async () => {
  const error = new Error("private infrastructure detail");
  const logging = spyOn(console, "error").mockImplementation(() => {});
  try {
    const response = await connect.request(here, post("approve"), {
      DEV_EMAIL: "me@test.com",
      ASSETS: assets,
      OAUTH_PROVIDER: {
        approveConsent: async () => {
          throw error;
        },
      },
    });
    expect(response.status).toBe(500);
    expect(logging).toHaveBeenCalledWith("Native consent POST failed", error);
    const html = await response.text();
    expect(html).toContain('name="vb-consent-failure" content="1"');
    expect(html).not.toContain(error.message);
    expect(html).not.toContain("OLD-HANDLE");
  } finally {
    logging.mockRestore();
  }
});
test("missing decision and explicit cancellation retain the exact normal denial redirect/cookie headers", async () => {
  for (const decision of [undefined, "deny"]) {
    let calls = 0;
    const headers = new Headers({
      location:
        "https://agent.test/callback?error=access_denied&state=original",
      "cache-control": "no-store",
      "set-cookie":
        "__Host-oauth-consent-test=; Path=/; Secure; HttpOnly; Max-Age=0",
    });
    const response = await connect.request(here, post(decision), {
      DEV_EMAIL: "me@test.com",
      ASSETS: assets,
      OAUTH_PROVIDER: {
        denyConsent: async (request: Request, handle: string) => {
          calls++;
          expect(request.method).toBe("POST");
          expect(handle).toBe("OLD-HANDLE");
          return { headers };
        },
      },
    });
    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe(headers.get("location"));
    expect(response.headers.get("set-cookie")).toBe(headers.get("set-cookie"));
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(calls).toBe(1);
    expect(await response.text()).toBe("");
  }
});
test("provider-validated AuthorizationError redirects remain untouched for opt-in POST failures", async () => {
  const error = new AuthorizationError("invalid_scope", {
    description: "scope refused",
    redirectUri: "https://agent.test/callback",
    state: "original",
    issuer: "https://vibebook.test",
  });
  const response = await connect.request(here, post("approve"), {
    DEV_EMAIL: "me@test.com",
    ASSETS: assets,
    OAUTH_PROVIDER: {
      approveConsent: async () => {
        throw error;
      },
    },
  });
  expect(response.status).toBe(302);
  expect(response.headers.get("location")).toBe(error.redirectTo!);
  expect(await response.text()).toBe("");
});
test("signed-out native POST preserves only the local authorize query for login, never the old form handle", async () => {
  const response = await connect.request(here, post("approve"), {
    ASSETS: assets,
  });
  expect(response.status).toBe(302);
  const location = new URL(
    response.headers.get("location")!,
    "http://127.0.0.1:8797",
  );
  expect(location.pathname).toBe("/login");
  expect(location.searchParams.get("ui")).toBe("svelte");
  expect(location.searchParams.get("next")).toBe(
    "/authorize?ui=svelte&client_id=client&state=original",
  );
  expect(location.href).not.toContain("OLD-HANDLE");
  const vanilla = await connect.request(
    "http://127.0.0.1:8797/authorize?client_id=client",
    post("approve"),
    { ASSETS: assets },
  );
  expect(vanilla.headers.get("location")).toBe("/login");
});
