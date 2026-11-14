// Provider boundary fixtures only; not real model judgment/Worker acceptance.
import { expect, mock, spyOn, test } from "bun:test";
import { Hono } from "hono";
import { createServer } from "node:http";
import type { Env } from "../src/index";
import {
  decisionProvider,
  PRODUCTION_DECISION_API,
} from "../src/decision-provider";
import { EMBED_QUESTIONS } from "../src/embed-review-contract";
import {
  reviewModelAnswer,
  startReviewModelFixture,
  REVIEW_FIXTURE_MODEL,
} from "./native-review-model-fixture";
import {
  appProbeDocument,
  REVIEW_DENY_DOCUMENT,
} from "./native-app-probe-documents";
mock.module("cloudflare:workers", () => ({
  DurableObject: class {},
  WorkerEntrypoint: class {},
  env: {},
}));
const { decide } = await import("../src/jev");
const { storeFile } = await import("../src/rooms");
const base = "http://127.0.0.1:8797",
  endpoint = "http://127.0.0.1:12345/api/alpha/decisions";
const questions = Object.fromEntries(
  Object.entries(EMBED_QUESTIONS).map(([key, instructions]) => [
    key,
    { type: "noul" as const, instructions },
  ]),
);
const initial = appProbeDocument(
  "initial",
  base,
  "http://127.0.0.1:23456/replacement",
);
test("production endpoint remains exact and only trusted DEV with an exact raw loopback endpoint can select the fixture", () => {
  expect(decisionProvider({})).toEqual({
    url: PRODUCTION_DECISION_API,
    kind: "production",
  });
  for (const port of [1, 80, 65535])
    expect(
      decisionProvider({
        DEV_EMAIL: "ci@example.test",
        DECISION_API: `http://127.0.0.1:${port}/api/alpha/decisions`,
      }).kind,
    ).toBe("local-fixture");
  for (const value of [
    null,
    [],
    { DECISION_API: endpoint },
    { DEV_EMAIL: " ", DECISION_API: endpoint },
    ...[
      "",
      "http://localhost:12345/api/alpha/decisions",
      "http://127.1:12345/api/alpha/decisions",
      "https://127.0.0.1:12345/api/alpha/decisions",
      "http://127.0.0.1:0/api/alpha/decisions",
      "http://127.0.0.1:65536/api/alpha/decisions",
      `${endpoint}?x=1`,
      `${endpoint}#x`,
      `${endpoint}?`,
      `${endpoint}#`,
      endpoint.replace("/api/", "/%61pi/"),
      endpoint.replace("127.0.0.1", "user:pass@127.0.0.1"),
      ` ${endpoint}`,
    ].map((DECISION_API) => ({ DEV_EMAIL: "ci@example.test", DECISION_API })),
  ])
    expect(() => decisionProvider(value)).toThrow(
      "Invalid decision provider configuration",
    );
});
test("actual client omits authorization on the fixture, preserves production headers and MODEL_JUDGE off makes no call", async () => {
  const calls: {
      url: string;
      headers: Headers;
      redirect: RequestInit["redirect"];
    }[] = [],
    fetching = spyOn(globalThis, "fetch").mockImplementation(
      Object.assign(
        async (
          input: Parameters<typeof fetch>[0],
          init?: Parameters<typeof fetch>[1],
        ) => {
          calls.push({
            url: String(input),
            headers: new Headers(init?.headers),
            redirect: init?.redirect,
          });
          return Response.json({
            answers: { check: { noul: 0 } },
            usage: { cost: 0 },
          });
        },
        { preconnect: fetch.preconnect },
      ),
    );
  const logging = spyOn(console, "error").mockImplementation(() => {});
  try {
    const q = { check: { type: "noul" as const, instructions: "Controlled" } };
    await decide(
      {
        MODEL_JUDGE: "fixture",
        OPENROUTER_API_KEY: "must-not-reach-local",
        DEV_EMAIL: "ci@example.test",
        DECISION_API: endpoint,
      },
      { html: "synthetic" },
      q,
    );
    expect(calls[0].url).toBe(endpoint);
    expect(calls[0].headers.has("authorization")).toBe(false);
    expect(calls[0].redirect).toBe("manual");
    await decide(
      { MODEL_JUDGE: "normal", OPENROUTER_API_KEY: "synthetic-production-key" },
      { html: "synthetic" },
      q,
    );
    expect(calls[1].url).toBe(PRODUCTION_DECISION_API);
    expect(calls[1].redirect).toBeUndefined();
    expect(calls[1].headers.get("authorization")).toBe(
      "Bearer synthetic-production-key",
    );
    expect(
      await decide(
        {
          MODEL_JUDGE: "off",
          OPENROUTER_API_KEY: "unused",
          DECISION_API: "invalid",
        },
        { html: "synthetic" },
        q,
      ),
    ).toBeNull();
    expect(
      await decide(
        {
          MODEL_JUDGE: "fixture",
          OPENROUTER_API_KEY: "unused",
          DEV_EMAIL: "ci@example.test",
          DECISION_API: "invalid",
        },
        { html: "synthetic" },
        q,
      ),
    ).toBeNull();
    expect(calls).toHaveLength(2);
  } finally {
    fetching.mockRestore();
    logging.mockRestore();
  }
});
test("external protocol fixture judges only exact known documents and current embed questions", () => {
  const value = {
    model: REVIEW_FIXTURE_MODEL,
    state: { html: initial },
    questions,
  };
  expect(reviewModelAnswer(value, base)?.verdict).toBe("allow");
  expect(
    reviewModelAnswer({ ...value, state: { html: REVIEW_DENY_DOCUMENT } }, base)
      ?.verdict,
  ).toBe("deny");
  for (const bad of [
    null,
    { ...value, model: "other" },
    { ...value, state: { html: "unknown document" } },
    { ...value, state: { html: "x".repeat(24001) } },
    { ...value, questions: {} },
    {
      ...value,
      questions: {
        ...questions,
        credentials: { type: "noul", instructions: "changed" },
      },
    },
    {
      ...value,
      state: { html: initial.replace("vibebook_read", "vibebook_post") },
    },
  ])
    expect(reviewModelAnswer(bad, base)).toBeNull();
});
test("real external HTTP protocol drives actual storeFile DENY before put and ALLOW into normal storage", async () => {
  const provider = await startReviewModelFixture(base);
  let puts = 0,
    index = 0;
  const env = {
    DEV_EMAIL: "ci@example.test",
    DECISION_API: provider.url,
    MODEL_JUDGE: REVIEW_FIXTURE_MODEL,
    SESSION_SECRET: "synthetic",
    OPENROUTER_API_KEY: "must-not-reach-fixture",
    UPLOAD_LIMIT: { limit: async () => ({ success: true }) },
    FILES: {
      put: async () => {
        puts++;
      },
    },
    BOOK: {
      idFromName: (id: string) => id,
      get: () => ({
        fetch: async () => {
          index++;
          return new Response("ok");
        },
      }),
    },
    DB: { prepare: () => ({ bind: () => ({ run: async () => ({}) }) }) },
  };
  const app = new Hono<{ Bindings: Env }>();
  app.post("/upload", async (c) => {
    try {
      return c.json(
        await storeFile(
          c.env,
          "abcdef",
          "ci@example.test",
          "text/html",
          await c.req.arrayBuffer(),
          "apps/control.html",
        ),
      );
    } catch {
      return c.json({ error: "review refused" }, 400);
    }
  });
  try {
    expect(
      (
        await app.request(
          "https://fixture.test/upload",
          { method: "POST", body: REVIEW_DENY_DOCUMENT },
          env,
        )
      ).status,
    ).toBe(400);
    expect(puts).toBe(0);
    expect(index).toBe(0);
    expect(
      (
        await app.request(
          "https://fixture.test/upload",
          { method: "POST", body: initial },
          env,
        )
      ).status,
    ).toBe(200);
    expect(puts).toBe(1);
    expect(index).toBe(1);
    expect(provider.evidence.denied).toBe(1);
    expect(provider.evidence.allowed).toBe(1);
    expect(provider.evidence.authorizationRejected).toBe(0);
    // A valid fixture URL cannot redirect the client beyond its validated
    // loopback boundary. Even a second local target must receive no request.
    const before = { ...provider.evidence };
    const redirect = createServer((_request, response) =>
      response.writeHead(302, { location: provider.url }).end(),
    );
    await new Promise<void>((resolve, reject) => {
      redirect.once("error", reject);
      redirect.listen(0, "127.0.0.1", resolve);
    });
    const address = redirect.address();
    if (!address || typeof address === "string")
      throw Error("Missing redirect fixture address");
    const logging = spyOn(console, "error").mockImplementation(() => {});
    try {
      expect(
        await decide(
          {
            ...env,
            DECISION_API: `http://127.0.0.1:${address.port}/api/alpha/decisions`,
          },
          { html: initial },
          questions,
        ),
      ).toBeNull();
      expect(provider.evidence).toEqual(before);
    } finally {
      logging.mockRestore();
      redirect.closeAllConnections();
      await new Promise<void>((resolve, reject) =>
        redirect.close((error) => (error ? reject(error) : resolve())),
      );
    }
  } finally {
    await provider.close();
  }
});
