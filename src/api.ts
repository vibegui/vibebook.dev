// Typed application routes (M2): validated Hono handlers chained into one app whose type (AppType) the Svelte client
// consumes through hc<AppType> (svelte/lib/client/api.ts, import type only: no backend code reaches the browser).
// The vanilla app calls the same paths with the same payloads. Routes move here slice by slice
// (docs/svelte-migration/api-coverage.md); index.ts mounts this app after its auth middleware.
import { Hono } from "hono";
import { validator } from "hono/validator";
import { PostMessageBody, UploadHeaders } from "../shared/schemas";
import type { Env } from "./index";
import { bookStub, FILE_TYPES, isMember, maxBytes, sizeError, storeFile, TYPES_ERROR } from "./rooms";
import { track } from "./track";

// The route types the browser sees carry only what's on the wire: no Worker bindings in AppType, so its declaration
// (.api-types, `bun run build:api-types`) doesn't drag the backend and its Cloudflare types into the browser program.
// Handlers reach the bindings through this one accessor instead of c.env.
export type ApiCtx = { Variables: { email: string } };
const bindings = (c: { env: unknown }): Env => c.env as Env; // the Worker always runs these routes with its Env
const waitUntil = (c: { executionCtx: { waitUntil(p: Promise<unknown>): void } }, p: Promise<unknown>) => c.executionCtx.waitUntil(p);

export const api = new Hono<ApiCtx>()
  .post(
    "/api/books/:id/post",
    validator("json", (value, c) => {
      const r = PostMessageBody.safeParse(value);
      return r.success ? r.data : c.json({ ok: false as const, error: "invalid message payload" }, 400);
    }),
    async (c) => {
      const email = c.get("email");
      const id = c.req.param("id");
      if (!(await isMember(bindings(c).DB, id, email))) return c.json({ ok: false as const, error: "forbidden" }, 403);
      const { text, thread } = c.req.valid("json");
      const out = await bookStub(bindings(c), id).humanPost(id, email, text, thread || "main");
      if (!out.ok) return c.json({ ok: false as const, error: out.error }, 400);
      waitUntil(c, track(bindings(c), "home_route_sent", { user: email, dims: { book: id, epic: out.thread !== "main" } }));
      return c.json({ ok: true as const, id: out.id, thread: out.thread }, 200);
    },
  )
  // Binary upload: the body is the file; headers carry its type and name. Stored in R2 under <book>/<file> (rooms.ts).
  .post(
    "/api/books/:id/files",
    validator("header", (value, c) => {
      const r = UploadHeaders.safeParse(value);
      return r.success ? r.data : c.json({ error: TYPES_ERROR }, 415);
    }),
    async (c) => {
      const email = c.get("email");
      const id = c.req.param("id");
      if (!(await isMember(bindings(c).DB, id, email))) return c.json({ error: "forbidden" }, 403);
      const h = c.req.valid("header");
      const type = h["content-type"].split(";")[0].trim().toLowerCase();
      if (!FILE_TYPES.includes(type)) return c.json({ error: TYPES_ERROR }, 415);
      if (Number(c.req.header("content-length") ?? 0) > maxBytes(type)) return c.json({ error: sizeError(type) }, 413);
      try {
        const meta = await storeFile(bindings(c), id, email, type, await c.req.arrayBuffer(), decodeURIComponent(h["x-filename"] ?? ""));
        waitUntil(c, track(bindings(c), "file_uploaded", { user: email, dims: { book: id, type, size: meta.size } }));
        return c.json(meta, 200);
      } catch (e) {
        return c.json({ error: e instanceof Error ? e.message : String(e) }, 400);
      }
    },
  );

export type AppType = typeof api;
