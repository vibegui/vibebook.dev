import { expect, mock, test } from "bun:test";
// External service answers are checked where they come in (review, room 1935). These modules reach the Workers
// runtime through their imports; the names they use are enough here.
mock.module("cloudflare:workers", () => ({
  DurableObject: class {},
  WorkerEntrypoint: class {},
  env: {},
}));
const { fs, FsVm, FsExec, FsCreated } = await import("../src/sandbox");
const { publicConn } = await import("../src/mcpconn");

const answer = (status: number, body: unknown) => {
  globalThis.fetch = (async () =>
    new Response(typeof body === "string" ? body : JSON.stringify(body), {
      status,
    })) as unknown as typeof fetch;
};

test("freestyle: well-formed answers parse, malformed ones are errors with the path (ids hidden)", async () => {
  answer(200, { state: "running", totalRunSeconds: 12, extra: "kept out" });
  expect(
    await fs("k", "GET", "/v5/vms/0123456789abcdef", undefined, FsVm),
  ).toEqual({ state: "running", totalRunSeconds: 12 });
  answer(200, { state: 3 });
  await expect(
    fs("k", "GET", "/v5/vms/0123456789abcdef", undefined, FsVm),
  ).rejects.toThrow("freestyle GET /v5/vms/:id: unexpected answer");
  answer(200, { stdout: "ok", stderr: null });
  expect(
    await fs("k", "POST", "/v5/vms/abcdef0123/exec-await", {}, FsExec),
  ).toEqual({ stdout: "ok", stderr: null });
  answer(200, { stdout: ["not", "text"] });
  await expect(
    fs("k", "POST", "/v5/vms/abcdef0123/exec-await", {}, FsExec),
  ).rejects.toThrow("unexpected answer");
  answer(200, "<html>proxy page</html>");
  await expect(fs("k", "POST", "/v5/vms", {}, FsCreated)).rejects.toThrow(
    "unexpected answer",
  );
  answer(502, { message: "upstream down" });
  await expect(fs("k", "GET", "/v5/vms?limit=1")).rejects.toThrow(
    "freestyle 502: upstream down",
  );
  answer(200, "anything");
  expect(await fs("k", "POST", "/v5/vms/x/start")).toEqual({
    message: "anything",
  }); // no schema: nothing is read from it
});

test("MCP: malformed stored tools and context are dropped before a connection is shown", () => {
  const row = {
    id: "c1",
    book_id: "r",
    owner: "a@x.com",
    scope: "room" as const,
    url: "https://mcp.example/mcp",
    title: "Mock",
    enc: null,
    iv: null,
    created_at: 1,
    tools: JSON.stringify([
      {
        name: "ok",
        description: "fine\nsecond line",
        annotations: { readOnlyHint: true, destructiveHint: false },
      },
      {
        name: "app",
        _meta: { ui: { resourceUri: "ui://x", visibility: ["app"] }, other: 1 },
      },
      { description: "no name" },
      { name: 7 },
      "junk",
    ]),
    ctx: JSON.stringify({
      ok: { text: "t", by: "a@x.com", at: 1 },
      bad: { text: 5 },
      worse: "x",
    }),
  };
  const c = publicConn(row, "a@x.com");
  expect(c.tools.map((t) => [t.name, t.description, t.read_only])).toEqual([
    ["ok", "fine", true],
  ]);
  expect(c.apps.map((a) => [a.tool, a.screen])).toEqual([["app", true]]);
  expect(Object.keys(c.context)).toEqual(["ok"]);
  expect(
    publicConn({ ...row, tools: "{not json", ctx: "[1,2]" }, "a@x.com"),
  ).toMatchObject({ tools: [], apps: [], context: {} });
});
