import { expect, test } from "bun:test";
import { Hono } from "hono";
import { hmac, identify, sessionEmail } from "../src/auth";
import type { Env } from "../src/index";

function fixture(after = 0) {
  const queries: string[] = [];
  const env = {
    SESSION_SECRET: "local-session-boundary-fixture",
    DB: {
      prepare(query: string) {
        queries.push(query);
        return {
          bind: () => ({ first: async () => ({ session_after: after }) }),
        };
      },
    },
  };
  const app = new Hono<{ Bindings: Env }>()
    .get("/session", async (c) => c.json({ email: await sessionEmail(c) }))
    .get("/identify", async (c) => c.json({ email: await identify(c) }));
  const cookie = async (value: unknown) => {
    const payload = Buffer.from(JSON.stringify(value)).toString("base64url");
    return `vb_session=${payload}.${await hmac(env.SESSION_SECRET, payload)}`;
  };
  const read = async (value: unknown, path = "/session") =>
    (
      await app.request(
        `https://vibebook.test${path}`,
        { headers: { cookie: await cookie(value) } },
        env,
      )
    ).json();
  return { app, env, cookie, read, queries };
}

test("a valid signed session preserves identity and revocation checks", async () => {
  const h = fixture(),
    email = `${crypto.randomUUID()}@example.com`;
  expect(await h.read({ email, iat: Date.now() })).toEqual({ email });
  expect(h.queries).toHaveLength(1);
  expect(await h.read({ email, iat: Date.now() }, "/identify")).toEqual({
    email,
  });
  const revoked = fixture(Date.now() + 1_000);
  expect(
    await revoked.read({
      email: `${crypto.randomUUID()}@example.com`,
      iat: Date.now(),
    }),
  ).toEqual({ email: null });
});

test("signed malformed payloads fail before any database lookup", async () => {
  const h = fixture();
  for (const value of [
    null,
    [],
    "text",
    {},
    { email: 42, iat: Date.now() },
    { email: "person@example.com", iat: String(Date.now()) },
    { email: "person@example.com", iat: null },
  ])
    expect(await h.read(value)).toEqual({ email: null });
  expect(h.queries).toHaveLength(0);
});

test("expired or tampered sessions remain signed out", async () => {
  const h = fixture();
  expect(
    await h.read({
      email: "expired@example.com",
      iat: Date.now() - 31 * 86400_000,
    }),
  ).toEqual({ email: null });
  const valid = await h.cookie({
    email: "tampered@example.com",
    iat: Date.now(),
  });
  const response = await h.app.request(
    "https://vibebook.test/session",
    { headers: { cookie: valid + "x" } },
    h.env,
  );
  expect(await response.json()).toEqual({ email: null });
  expect(h.queries).toHaveLength(0);
});
