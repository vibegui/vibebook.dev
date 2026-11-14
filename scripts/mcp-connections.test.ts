// Route/provider input unit fixtures, not real OAuth/server/Worker acceptance.
import { expect, mock, spyOn, test } from "bun:test";
import { Hono } from "hono";
import type { Ctx } from "../src/index";
import type { Conn } from "../src/mcpconn";
import { UNAUTHENTICATED } from "../shared/schemas";
mock.module("cloudflare:workers", () => ({
  DurableObject: class {},
  WorkerEntrypoint: class {},
  env: {},
}));
const { readMcpAnswer, cspFor, mountConnections } =
  await import("../src/mcpconn");
const { identify } = await import("../src/auth");
const { nativeConnectionSignedOut } = await import("../src/native-page");

test("MCP JSON/batch and multiline SSE replies correlate exact ids and preserve arbitrary result values", async () => {
  const result = {
    content: [{ type: "text", text: "café 日本語" }],
    _meta: { custom: { retained: true } },
  };
  expect(
    await readMcpAnswer(
      Response.json([null, { id: 2, result: false }, { id: 7, result }]),
      7,
    ),
  ).toEqual(result);
  expect(await readMcpAnswer(Response.json({ id: 7, result: false }), 7)).toBe(
    false,
  );
  expect(
    await readMcpAnswer(
      new Response(
        'event: message\ndata: {"id":7,\ndata: "result":[1,null,"ok"]}\n\n',
        { headers: { "content-type": "text/event-stream" } },
      ),
      7,
    ),
  ).toEqual([1, null, "ok"]);
  await expect(
    readMcpAnswer(Response.json([{ id: "7", result }, null, []]), 7),
  ).rejects.toThrow("não respondeu");
  await expect(
    readMcpAnswer(
      Response.json({ id: 7, error: { message: "provider refused" } }),
      7,
    ),
  ).rejects.toThrow("MCP: provider refused");
  await expect(readMcpAnswer(new Response("not JSON"), 7)).rejects.toThrow(
    "não respondeu",
  );
});

test("CSP keeps valid provider resource/connection/frame/base domains and ignores malformed metadata", () => {
  const empty = cspFor(undefined);
  for (const value of [null, 7, [], { ui: null }, { ui: { csp: "invalid" } }])
    expect(cspFor(value)).toBe(empty);
  const policy = cspFor({
    ui: {
      csp: {
        resourceDomains: [
          "https://cdn.example.com",
          "https://bad.example.com; unsafe",
        ],
        connectDomains: ["https://api.example.com", "wss://socket.example.com"],
        frameDomains: ["https://frame.example.com"],
        baseUriDomains: ["https://base.example.com"],
      },
    },
  });
  expect(policy).toContain(
    "connect-src https://api.example.com wss://socket.example.com wss://api.example.com",
  );
  expect(policy).toContain("frame-src https://frame.example.com");
  expect(policy).toContain("base-uri https://base.example.com");
  expect(policy).not.toContain("unsafe;");
  expect(policy).not.toContain("bad.example.com");
});

const shell =
  '<link href="/svelte-preview/ui.css?v=0123456789abcdef0123"><script src="/svelte-preview/app.js?v=0123456789abcdef0123"></script>';
const connection: Conn = {
  id: "abc123",
  book_id: "abcdef",
  owner: "member@example.test",
  scope: "room",
  url: "https://example.com/mcp",
  title: "Example",
  enc: null,
  iv: null,
  tools: "[]",
  ctx: "{}",
  created_at: 1,
};
function routes(
  options: {
    member?: boolean;
    found?: boolean;
    allowed?: boolean;
    storedBack?: string;
  } = {},
) {
  let consumes = 0;
  const insertedStates: unknown[][] = [];
  const app = new Hono<Ctx>();
  app.use("*", async (c, next) => {
    c.set("email", "member@example.test");
    await next();
  });
  mountConnections(app, {
    isMember: async () => options.member !== false,
    track: async () => {},
  });
  const env = {
    ASSETS: { fetch: async () => new Response(shell) },
    LOGIN_LIMIT: {
      limit: async () => ({ success: options.allowed !== false }),
    },
    DB: {
      prepare: (sql: string) => ({
        bind: (...values: unknown[]) => ({
          run: async () => {
            if (sql.startsWith("INSERT INTO mcp_oauth_states"))
              insertedStates.push(values);
          },
          first: async () => {
            if (sql.startsWith("DELETE FROM mcp_oauth_states")) {
              consumes++;
              return null;
            }
            if (sql.startsWith("SELECT back"))
              return options.storedBack ? { back: options.storedBack } : null;
            if (sql.startsWith("SELECT client_id"))
              return {
                client_id: "existing-client",
                secret_enc: null,
                secret_iv: null,
              };
            return options.found === false ? null : connection;
          },
        }),
      }),
    },
  };
  return {
    request: (path: string) =>
      app.request(`https://vibebook.test${path}`, undefined, env),
    consumes: () => consumes,
    insertedStates,
  };
}
test("native signin preserves membership/missing/rate HTTP failures using typed styled pages; vanilla remains JSON", async () => {
  for (const [options, status, failure] of [
    [{ member: false }, 403, "forbidden"],
    [{ found: false }, 404, "missing"],
    [{ allowed: false }, 429, "rate"],
  ] as const) {
    const fixture = routes(options),
      path = "/api/books/abcdef/connections/abc123/signin";
    const response = await fixture.request(`${path}?ui=svelte`),
      html = await response.text();
    expect(response.status).toBe(status);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-vibebook-ui")).toBe("svelte");
    expect(html).toContain('name="vb-page" content="connection-error"');
    expect(html).toContain(`name="vb-connection-failure" content="${failure}"`);
    expect(html).not.toContain("style=");
    const vanilla = await fixture.request(path);
    expect(vanilla.status).toBe(status);
    expect(vanilla.headers.get("content-type")).toContain("application/json");
  }
});
test("native callback provider refusal/replayed state never echoes provider secrets or OAuth arguments", async () => {
  const fixture = routes();
  const response = await fixture.request(
    "/api/mcp-oauth/callback?state=svelte.PRIVATE_STATE&code=PRIVATE_CODE&error=access_denied&error_description=PRIVATE_PROVIDER_MESSAGE",
  );
  const html = await response.text();
  expect(response.status).toBe(400);
  expect(html).toContain('name="vb-page" content="connection-error"');
  for (const value of [
    "PRIVATE_STATE",
    "PRIVATE_CODE",
    "PRIVATE_PROVIDER_MESSAGE",
    "style=",
  ])
    expect(html).not.toContain(value);
  expect(html).toContain('href="/app"');
  expect(fixture.consumes()).toBe(0);
  const replay = await fixture.request(
    "/api/mcp-oauth/callback?state=svelte.CONSUMED_STATE&code=SECRET",
  );
  expect(replay.status).toBe(400);
  expect(await replay.text()).toContain(
    'name="vb-page" content="connection-error"',
  );
  expect(fixture.consumes()).toBe(1);
  const vanilla = await fixture.request(
    "/api/mcp-oauth/callback?error=access_denied&error_description=Old+provider+message",
  );
  expect(vanilla.status).toBe(400);
  expect(await vanilla.text()).toContain("Old provider message");
});
test("previous unprefixed native state retains native error presentation through its owned stored return URL", async () => {
  const fixture = routes({ storedBack: "/b/abcdef?ui=svelte#app:abc123" });
  const response = await fixture.request(
    "/api/mcp-oauth/callback?state=OLD_STATE&code=OLD_CODE",
  );
  expect(response.status).toBe(400);
  const html = await response.text();
  expect(html).toContain('name="vb-page" content="connection-error"');
  expect(html).not.toContain("OLD_STATE");
  expect(html).not.toContain("OLD_CODE");
  expect(fixture.consumes()).toBe(1);
});
test("native and vanilla authorization preserve the fixed provider callback and exact stored random state", async () => {
  const fetching = spyOn(globalThis, "fetch").mockImplementation(
    Object.assign(
      async (input: Parameters<typeof fetch>[0]) => {
        const url = String(input);
        return Response.json(
          url.includes("oauth-protected-resource")
            ? { authorization_servers: ["https://example.com"] }
            : {
                authorization_endpoint: "https://example.com/authorize",
                token_endpoint: "https://example.com/token",
              },
        );
      },
      { preconnect: fetch.preconnect },
    ),
  );
  try {
    for (const native of [true, false]) {
      const fixture = routes();
      const response = await fixture.request(
        `/api/books/abcdef/connections/abc123/signin${native ? "?ui=svelte" : ""}`,
      );
      expect(response.status).toBe(302);
      const location = response.headers.get("location");
      expect(location).not.toBeNull();
      const target = new URL(location!);
      expect(target.searchParams.get("redirect_uri")).toBe(
        "https://vibebook.test/api/mcp-oauth/callback",
      );
      const storedState = fixture.insertedStates[0]?.[0];
      if (typeof storedState !== "string")
        throw Error("Missing canonical OAuth state");
      expect(target.searchParams.get("state")).toBe(storedState);
      expect(target.searchParams.get("state")?.startsWith("svelte.")).toBe(
        native,
      );
      expect(String(fixture.insertedStates[0]?.[7])).toContain(
        native ? "ui=svelte" : "/b/abcdef#app:abc123",
      );
    }
  } finally {
    fetching.mockRestore();
  }
});
test("signed-out native HTML connection navigation keeps401 before any OAuth handler or state access", async () => {
  let reached = 0,
    database = 0;
  const env = {
    SESSION_SECRET: "unit-session-key",
    ASSETS: { fetch: async () => new Response(shell) },
    DB: {
      prepare: () => {
        database++;
        throw Error(
          "Unauthenticated navigation must not read/consume provider state",
        );
      },
    },
  };
  const app = new Hono<Ctx>();
  app.use("*", async (c, next) => {
    if (!(await identify(c)))
      return (
        nativeConnectionSignedOut(c.env, c.req.raw) ??
        c.json(UNAUTHENTICATED, 401)
      );
    await next();
  });
  app.all("*", (c) => {
    reached++;
    return c.text("must not reach provider handler");
  });
  const callback =
    "/api/mcp-oauth/callback?state=svelte.PRIVATE_STATE&code=PRIVATE_CODE&error_description=PRIVATE_PROVIDER";
  for (const path of [
    callback,
    "/api/mcp-oauth/callback?ui=svelte&state=OLD_STATE&code=PRIVATE_CODE",
    "/api/books/abcdef/connections/abc123/signin?ui=svelte",
  ]) {
    const response = await app.request(
      `https://vibebook.test${path}`,
      { headers: { accept: "text/html" } },
      env,
    );
    expect(response.status).toBe(401);
    expect(response.headers.get("content-type")).toContain("text/html");
    const html = await response.text();
    expect(html).toContain('name="vb-connection-failure" content="signed-out"');
    for (const secret of [
      "PRIVATE_STATE",
      "PRIVATE_CODE",
      "PRIVATE_PROVIDER",
      "OLD_STATE",
    ])
      expect(html).not.toContain(secret);
  }
  for (const [path, method, accept] of [
    [callback, "GET", "application/json"],
    [callback, "POST", "text/html"],
    ["/api/mcp-oauth/callback?state=VANILLA", "GET", "text/html"],
    ["/api/books/abcdef/connections/abc123/signin", "GET", "text/html"],
    ["/api/me?ui=svelte", "GET", "text/html"],
  ]) {
    const response = await app.request(
      `https://vibebook.test${path}`,
      { method, headers: { accept } },
      env,
    );
    expect(response.status).toBe(401);
    expect(response.headers.get("content-type")).toContain("application/json");
    expect(await response.json()).toEqual(UNAUTHENTICATED);
  }
  expect(database).toBe(0);
  expect(reached).toBe(0);
});

test("malformed nested CSP entries neither widen the policy nor invoke coercion", () => {
  const policy = cspFor({
    ui: {
      csp: {
        resourceDomains: [
          { toString: null },
          ["https://nested.example"],
          "https://safe.example",
        ],
      },
    },
  });
  expect(policy).toContain("font-src data: https://safe.example");
  expect(policy).not.toContain("nested.example");
  expect(policy).not.toContain("[object Object]");
});
