import { expect, spyOn, test } from "bun:test";
import { decide } from "../src/jev";

test("decision responses retain numeric answers, null fallback fields and optional usage", async () => {
  let body: unknown = {
    answers: { answer: { noul: 0.75, score: 3, extension: "ignored" } },
    usage: { cost: 0.002 },
  };
  const original = globalThis.fetch;
  const fetching = spyOn(globalThis, "fetch").mockImplementation(
    Object.assign(async () => Response.json(body), {
      preconnect: original.preconnect,
    }),
  );
  try {
    const env = { OPENROUTER_API_KEY: "controlled-fixture" };
    const questions = {
      answer: { type: "noul" as const, instructions: "Controlled question" },
    };
    expect(await decide(env, {}, questions)).toEqual({
      answers: { answer: { noul: 0.75, score: 3 } },
      cost: 0.002,
    });
    body = { answers: { answer: { noul: null, score: null } }, usage: null };
    expect(await decide(env, {}, questions)).toEqual({
      answers: { answer: { noul: null, score: null } },
      cost: 0,
    });
    body = { answers: { answer: {} } };
    expect(await decide(env, {}, questions)).toEqual({
      answers: { answer: {} },
      cost: 0,
    });
    body = { answers: null };
    expect(await decide(env, {}, questions)).toBeNull();
  } finally {
    fetching.mockRestore();
  }
});

test("malformed nested model output cannot become typed decisions or usage", async () => {
  let body: unknown;
  const original = globalThis.fetch;
  const fetching = spyOn(globalThis, "fetch").mockImplementation(
    Object.assign(async () => Response.json(body), {
      preconnect: original.preconnect,
    }),
  );
  const logging = spyOn(console, "error").mockImplementation(() => {});
  try {
    for (body of [
      null,
      [],
      {},
      { answers: [] },
      { answers: { answer: true } },
      { answers: { answer: { noul: "0.9" } } },
      { answers: { answer: { score: {} } } },
      { answers: { answer: { noul: 0.5 } }, usage: { cost: "free" } },
    ])
      expect(
        await decide(
          { OPENROUTER_API_KEY: "controlled-fixture" },
          {},
          { answer: { type: "noul", instructions: "Controlled" } },
        ),
      ).toBeNull();
  } finally {
    fetching.mockRestore();
    logging.mockRestore();
  }
});

test("HTTP, JSON and network failures retain the null decision fallback", async () => {
  let mode = "http";
  const original = globalThis.fetch;
  const fetching = spyOn(globalThis, "fetch").mockImplementation(
    Object.assign(
      async () => {
        if (mode === "network") throw Error("controlled network failure");
        return mode === "json"
          ? new Response("invalid JSON")
          : new Response("controlled failure", { status: 503 });
      },
      { preconnect: original.preconnect },
    ),
  );
  const logging = spyOn(console, "error").mockImplementation(() => {});
  try {
    for (mode of ["http", "json", "network"])
      expect(
        await decide(
          { OPENROUTER_API_KEY: "controlled-fixture" },
          {},
          { answer: { type: "noul", instructions: "Controlled" } },
        ),
      ).toBeNull();
  } finally {
    fetching.mockRestore();
    logging.mockRestore();
  }
});

test("disabled judges and empty questions perform no provider request", async () => {
  const original = globalThis.fetch;
  const fetching = spyOn(globalThis, "fetch").mockImplementation(
    Object.assign(
      async () => {
        throw Error("Unexpected provider call");
      },
      { preconnect: original.preconnect },
    ),
  );
  try {
    expect(
      await decide(
        { OPENROUTER_API_KEY: "fixture", MODEL_JUDGE: "off" },
        {},
        { answer: { type: "noul", instructions: "Controlled" } },
      ),
    ).toBeNull();
    expect(await decide({ OPENROUTER_API_KEY: "fixture" }, {}, {})).toBeNull();
    expect(fetching).not.toHaveBeenCalled();
  } finally {
    fetching.mockRestore();
  }
});
