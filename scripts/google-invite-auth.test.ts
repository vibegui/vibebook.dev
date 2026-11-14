import { expect, spyOn, test } from "bun:test";
import { auth, hmac } from "../src/auth";

function fixture() {
  const reads: { sql: string; values: unknown[] }[] = [],
    writes: { sql: string; values: unknown[] }[] = [],
    pending: Promise<unknown>[] = [],
    used = new Set<unknown>();
  let known = false;
  const env = {
    SESSION_SECRET: "controlled-google-invite-session",
    GOOGLE_CLIENT_ID: "fixture-google-client",
    GOOGLE_CLIENT_SECRET: "fixture-google-secret",
    DB: {
      prepare(sql: string) {
        return {
          bind(...values: unknown[]) {
            return {
              async first() {
                reads.push({ sql, values });
                return sql.includes("session_after")
                  ? { session_after: 0 }
                  : known
                    ? { found: 1 }
                    : null;
              },
              async run() {
                writes.push({ sql, values });
                const duplicate =
                  sql.includes("invite_used") && used.has(values[0]);
                if (sql.includes("invite_used")) used.add(values[0]);
                return { meta: { changes: duplicate ? 0 : 1 } };
              },
            };
          },
        };
      },
    },
  };
  return {
    env,
    reads,
    writes,
    known(value: boolean) {
      known = value;
    },
    async settled() {
      await Promise.all(pending);
    },
    request(path: string, cookie = "") {
      return auth.request(
        `https://vibebook.test${path}`,
        { headers: { cookie } },
        env,
        {
          waitUntil(promise) {
            pending.push(promise);
          },
          passThroughOnException() {},
          props: {},
        },
      );
    },
  };
}
const encoded = (value: unknown) =>
  btoa(JSON.stringify(value))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
const oauthCookie = (next = "/b/aaaaaa?ui=svelte") =>
  `vb_oauth=${encodeURIComponent(`fixture-state|${next}`)}`;
const callback = "/google/callback?state=fixture-state&code=fixture-code";

test("Google start/state binds and consumes the callback cookie before any provider or DB work", async () => {
  const f = fixture(),
    originalFetch = globalThis.fetch;
  const provider = spyOn(globalThis, "fetch").mockImplementation(
    Object.assign(
      async () => {
        throw Error("State must reject before fetch");
      },
      { preconnect: originalFetch.preconnect },
    ),
  );
  try {
    const start = await f.request(
      "/google/start?next=%2Fb%2Faaaaaa%3Fui%3Dsvelte",
    );
    const location = new URL(start.headers.get("location")!);
    expect(location.origin).toBe("https://accounts.google.com");
    expect(location.searchParams.get("scope")).toBe("openid email profile");
    expect(location.searchParams.get("redirect_uri")).toBe(
      "https://vibebook.test/auth/google/callback",
    );
    expect(decodeURIComponent(start.headers.get("set-cookie")!)).toContain(
      `${location.searchParams.get("state")}|/b/aaaaaa?ui=svelte`,
    );
    for (const [path, cookie] of [
      [callback, ""],
      [callback, oauthCookie().replace("fixture-state", "wrong-state")],
      ["/google/callback?state=fixture-state", oauthCookie()],
    ]) {
      const response = await f.request(path, cookie);
      expect(response.status).toBe(302);
      expect(response.headers.get("location")).toBe(
        cookie ? "/login?error=google&ui=svelte" : "/login?error=google",
      );
      expect(response.headers.get("set-cookie")).toContain("vb_oauth=;");
      expect(response.headers.get("set-cookie")).not.toContain("vb_session=");
    }
    expect(provider).not.toHaveBeenCalled();
    expect(f.reads).toHaveLength(0);
    expect(f.writes).toHaveLength(0);
  } finally {
    provider.mockRestore();
  }
});

test("Google token and userinfo HTTP/JSON boundaries reject malformed identity before session or writes", async () => {
  const f = fixture(),
    originalFetch = globalThis.fetch,
    calls: string[] = [];
  let token: unknown = { access_token: "synthetic-google-token" },
    profile: unknown = { email: "fixture@example.test", email_verified: true },
    tokenStatus = 200,
    profileStatus = 200,
    invalidJSON = false,
    networkError = false;
  const provider = spyOn(globalThis, "fetch").mockImplementation(
    Object.assign(
      async (
        input: Parameters<typeof globalThis.fetch>[0],
        init?: Parameters<typeof globalThis.fetch>[1],
      ) => {
        const url = String(input);
        calls.push(url);
        if (networkError) throw Error("Controlled provider failure");
        if (url === "https://oauth2.googleapis.com/token")
          return invalidJSON
            ? new Response("not JSON")
            : Response.json(token, { status: tokenStatus });
        expect(url).toBe("https://openidconnect.googleapis.com/v1/userinfo");
        expect(new Headers(init?.headers).get("authorization")).toBe(
          "Bearer synthetic-google-token",
        );
        return Response.json(profile, { status: profileStatus });
      },
      { preconnect: originalFetch.preconnect },
    ),
  );
  const rejected = async () => {
    const response = await f.request(callback, oauthCookie());
    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe(
      "/login?error=google&ui=svelte",
    );
    expect(response.headers.get("set-cookie")).not.toContain("vb_session=");
    expect(f.reads).toHaveLength(0);
    expect(f.writes).toHaveLength(0);
  };
  try {
    for (const invalid of [
      null,
      [],
      {},
      { error: "denied" },
      { access_token: "" },
      { access_token: 42 },
      { access_token: {} },
    ]) {
      token = invalid;
      calls.length = 0;
      await rejected();
      expect(calls).toHaveLength(1);
    }
    token = { access_token: "synthetic-google-token" };
    tokenStatus = 401;
    await rejected();
    tokenStatus = 200;
    invalidJSON = true;
    await rejected();
    invalidJSON = false;
    networkError = true;
    await rejected();
    networkError = false;
    for (const invalid of [
      null,
      [],
      {},
      { email: "fixture@example.test", email_verified: false },
      { email: "fixture@example.test", email_verified: "true" },
      { email: { value: "fixture@example.test" }, email_verified: true },
      { email: "not-an-email", email_verified: true },
      { email: "fixture@example.test", email_verified: true, name: 4 },
    ]) {
      profile = invalid;
      await rejected();
    }
    profile = { email: "fixture@example.test", email_verified: true };
    profileStatus = 403;
    await rejected();
  } finally {
    provider.mockRestore();
  }
});

test("Google verified identity accepts nullable profile and preserves session, safe next and bounded optional name", async () => {
  const f = fixture(),
    originalFetch = globalThis.fetch;
  let profile: unknown = {
    email: "Fixture@example.test",
    email_verified: true,
    given_name: null,
    name: null,
  };
  const provider = spyOn(globalThis, "fetch").mockImplementation(
    Object.assign(
      async (input: Parameters<typeof globalThis.fetch>[0]) =>
        Response.json(
          String(input).endsWith("/token")
            ? { access_token: "synthetic-token" }
            : profile,
        ),
      { preconnect: originalFetch.preconnect },
    ),
  );
  try {
    let response = await f.request(callback, oauthCookie());
    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe("/b/aaaaaa?ui=svelte");
    const cookie = response.headers.get("set-cookie")!;
    for (const flag of [
      "vb_session=",
      "HttpOnly",
      "Secure",
      "SameSite=Lax",
      "Max-Age=2592000",
    ])
      expect(cookie).toContain(flag);
    await f.settled();
    expect(
      f.writes.filter((write) => write.sql.includes("INSERT INTO users")),
    ).toHaveLength(0);
    expect(
      f.writes.find((write) => write.sql.includes("INSERT INTO events"))
        ?.values,
    ).toContain("fixture@example.test");
    profile = {
      email: "Fixture@example.test",
      email_verified: true,
      given_name: "",
      name: `  ${"N".repeat(80)}  `,
    };
    response = await f.request(callback, oauthCookie("https://foreign.test/"));
    expect(response.headers.get("location")).toBe("/app");
    await f.settled();
    expect(
      f.writes.find((write) => write.sql.includes("INSERT INTO users"))?.values,
    ).toContain("N".repeat(60));
  } finally {
    provider.mockRestore();
  }
});

async function invite(f: ReturnType<typeof fixture>, value: unknown) {
  const payload = encoded(value);
  return `/invite?t=${payload}.${await hmac(f.env.SESSION_SECRET, `invite:${payload}`)}`;
}
test("correctly signed malformed invites reject before DB/session effects or unsafe continuation", async () => {
  const f = fixture(),
    valid = { e: "new@example.test", b: "aaaaaa", x: Date.now() + 60000 };
  for (const value of [
    null,
    [],
    {},
    { ...valid, e: {} },
    { ...valid, e: "invalid" },
    { ...valid, b: {} },
    { ...valid, b: "aaaaaa/../other" },
    { ...valid, b: "aaaaaa?ui=svelte" },
    { ...valid, x: "9999999999999" },
    { ...valid, x: null },
  ]) {
    const response = await f.request(await invite(f, value));
    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe("/login");
    expect(response.headers.get("set-cookie")).toBeNull();
  }
  const response = await f.request((await invite(f, valid)).replace(/.$/, "!"));
  expect(response.headers.get("location")).toBe("/login");
  expect(f.reads).toHaveLength(0);
  expect(f.writes).toHaveLength(0);
});

test("valid expired invites preserve room login continuation without DB or session work", async () => {
  const f = fixture();
  for (const x of [0, Date.now() - 60000]) {
    const response = await f.request(
      await invite(f, { e: "expired@example.test", b: "aaaaaa", x }),
    );
    expect(response.headers.get("location")).toBe("/login?next=%2Fb%2Faaaaaa");
    expect(response.headers.get("set-cookie")).toBeNull();
  }
  expect(f.reads).toHaveLength(0);
  expect(f.writes).toHaveLength(0);
});

test("valid invite remains one-time first-account login and does not replace an existing session", async () => {
  const f = fixture(),
    path = await invite(f, {
      e: "new@example.test",
      b: "aaaaaa",
      x: Date.now() + 60000,
    });
  let response = await f.request(path);
  expect(response.headers.get("location")).toBe("/b/aaaaaa");
  expect(response.headers.get("set-cookie")).toContain("vb_session=");
  await f.settled();
  response = await f.request(path);
  expect(response.headers.get("location")).toBe("/login?next=%2Fb%2Faaaaaa");
  expect(response.headers.get("set-cookie")).toBeNull();
  const payload = encoded({ email: "already@example.test", iat: Date.now() }),
    signature = await hmac(f.env.SESSION_SECRET, payload),
    writes = f.writes.length;
  response = await f.request(path, `vb_session=${payload}.${signature}`);
  expect(response.headers.get("location")).toBe("/b/aaaaaa");
  expect(response.headers.get("set-cookie")).toBeNull();
  expect(f.writes).toHaveLength(writes);
  const known = fixture();
  known.known(true);
  response = await known.request(
    await invite(known, {
      e: "known@example.test",
      b: "aaaaaa",
      x: Date.now() + 60000,
    }),
  );
  expect(response.headers.get("location")).toBe("/login?next=%2Fb%2Faaaaaa");
  expect(response.headers.get("set-cookie")).toBeNull();
  expect(known.writes).toHaveLength(0);
});
