import type { Hono } from "hono";
import type { Ctx } from "./index";
import { isMember, fileHeaders } from "./rooms";
import {
  AppDocumentClaim,
  withAppDocumentBootstrap,
} from "../shared/appDocument";

/** A read-only navigation POST, never an upload or a generic API mutation exemption. */
export const isAppDocumentNavigation = (
  request: Pick<Request, "method" | "url">,
) =>
  request.method === "POST" &&
  /^\/api\/books\/[^/]+\/files\/[^/]+$/.test(new URL(request.url).pathname);

const MAX_FORM_BYTES = 256;
async function readClaim(request: Request): Promise<string | null> {
  if (!request.body) return null;
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const part = await reader.read();
      if (part.done) break;
      size += part.value.byteLength;
      if (size > MAX_FORM_BYTES) {
        await reader.cancel();
        return null;
      }
      chunks.push(part.value);
    }
  } catch {
    return null;
  } finally {
    reader.releaseLock();
  }
  const bytes = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  let body: string;
  try {
    body = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    return null;
  }
  const entries = [...new URLSearchParams(body)];
  if (entries.length !== 1 || entries[0][0] !== "nonce") return null;
  const parsed = AppDocumentClaim.safeParse({ nonce: entries[0][1] });
  return parsed.success ? parsed.data.nonce : null;
}

export function mountAppDocumentFiles(app: Hono<Ctx>) {
  app.post("/api/books/:id/files/:fid", async (c) => {
    const email = c.get("email");
    if (!email) return c.json({ error: "unauthenticated" }, 401);
    const url = new URL(c.req.url);
    if (
      c.req.header("origin") !== url.origin ||
      c.req.header("sec-fetch-site") === "cross-site"
    )
      return c.json({ error: "bad origin" }, 403);
    if (url.search || c.req.header("range"))
      return c.json({ error: "invalid document navigation" }, 400);
    if (
      !/^application\/x-www-form-urlencoded(?:\s*;\s*charset=(?:utf-8|"utf-8"))?$/i.test(
        c.req.header("content-type") ?? "",
      )
    )
      return c.json({ error: "invalid document form" }, 415);
    const nonce = await readClaim(c.req.raw);
    if (!nonce) return c.json({ error: "invalid document form" }, 400);
    const id = c.req.param("id");
    if (!(await isMember(c.env.DB, id, email)))
      return c.json({ error: "forbidden" }, 403);
    const obj = await c.env.FILES.get(`${id}/${c.req.param("fid")}`);
    if (!obj) return c.notFound();
    // File identity and approved stored HTML stay authoritative; this endpoint never accepts HTML input.
    if (obj.httpMetadata?.contentType !== "text/html")
      return c.json({ error: "not an HTML document" }, 415);
    const headers = new Headers(
      fileHeaders("text/html", obj.customMetadata?.name ?? "arquivo"),
    );
    headers.set("cache-control", "private, no-store");
    headers.delete("etag");
    headers.delete("last-modified");
    headers.delete("content-length");
    return new Response(withAppDocumentBootstrap(await obj.text(), nonce), {
      headers,
    });
  });
}
