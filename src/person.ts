import { DurableObject } from "cloudflare:workers";
import type { Env } from "./index";

/** One per person (idFromName(email)): the app's push channel for what lives outside an open room (the rail's unread
 * dots and ✻, "esperando você", the room's Claudes and sandboxes). Sockets hibernate; a poke tells every open tab
 * "this changed, fetch it once" ({t:"me"} → /api/me, {t:"agents", book} → that room's /api/books/:id/agents).
 * It also keeps the last /api/me answer: served from here (no D1) until a {t:"me"} poke marks it stale, or 5 min. */
export class Person extends DurableObject<Env> {
  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    // The CLI hub's keepalive (every 45s): answered without waking the object, so an idle socket stays free.
    ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair("ping", "pong"));
  }
  async fetch(req: Request) {
    if (req.headers.get("upgrade") === "websocket") {
      const [client, server] = Object.values(new WebSocketPair());
      this.ctx.acceptWebSocket(server);
      return new Response(null, { status: 101, webSocket: client });
    }
    const path = new URL(req.url).pathname;
    if (path === "/me") {
      // gen: bumped by every {t:"me"} poke, so an answer computed before a change never lands after it.
      const gen = (await this.ctx.storage.get<number>("gen")) ?? 0;
      if (req.method === "PUT") {
        if (Number(req.headers.get("x-gen")) === gen) await this.ctx.storage.put("me", { body: await req.text(), at: Date.now() });
        return new Response(null, { status: 204 });
      }
      const me = await this.ctx.storage.get<{ body: string; at: number }>("me");
      // The generation rides on hits too: a hit the Worker can't use (written by an older deploy, off today's schema) is
      // recomputed and replaced under the same race guard, instead of costing D1 reads until it expires.
      return me && Date.now() - me.at < 5 * 60e3
        ? new Response(me.body, { headers: { "content-type": "application/json", "x-gen": String(gen) } })
        : new Response(null, { status: 404, headers: { "x-gen": String(gen) } });
    }
    const msg = await req.text();
    if (msg.includes('"t":"me"')) { // stale: the next /api/me reads D1
      await this.ctx.storage.delete("me");
      await this.ctx.storage.put("gen", ((await this.ctx.storage.get<number>("gen")) ?? 0) + 1);
    }
    for (const ws of this.ctx.getWebSockets()) try { ws.send(msg); } catch {}
    return new Response(null, { status: 204 });
  }
  webSocketMessage() {} // the app only listens
  webSocketClose(ws: WebSocket) { try { ws.close(); } catch {} }
}

/** Tell these people's open apps that something changed. Fire and forget, ≤50 people per call. */
export function poke(env: Env, emails: Iterable<string>, msg: { t: "me"; book?: string; msg?: 1 } | { t: "agents"; book: string } | { t: "focus"; book: string }) {
  const body = JSON.stringify(msg);
  return Promise.all(
    [...new Set(emails)].slice(0, 50).map((e) =>
      env.PEOPLE.get(env.PEOPLE.idFromName(e.toLowerCase())).fetch("https://person/poke", { method: "POST", body }).catch(() => {}),
    ),
  );
}
/** Everyone in a room. */
export async function pokeRoom(env: Env, bookId: string, msg: Parameters<typeof poke>[2]) {
  const r = await env.DB.prepare(`SELECT email FROM members WHERE book_id = ?`).bind(bookId).all<{ email: string }>();
  return poke(env, r.results.map((x) => x.email), msg);
}

/** How recent a listener's last call must be to count as listening: the CLI's hub checks in at least every 10 min
 * (a long-poll listener every 50s). */
export const LISTEN_FRESH = 12 * 60_000;
/** A listener's long-poll call: presence for the room's Pessoas. Its first call after a gap (started listening) pokes
 * the room's apps so "ouvindo" and "Abrindo seu Claude…" update without polling. */
export async function markListening(env: Env, agent: string, email: string, room: string, seen = false) {
  const now = Date.now();
  const was = await env.DB.prepare(`SELECT listening_at FROM agents WHERE id = ?`).bind(agent).first<{ listening_at: number | null }>();
  await env.DB.prepare(`UPDATE agents SET listening_at = ?, listen_room = ?${seen ? ", seen_at = ?1" : ""} WHERE id = ?`).bind(now, room || null, agent).run();
  if (!was?.listening_at || now - was.listening_at > LISTEN_FRESH) await (room ? pokeRoom(env, room, { t: "agents", book: room }) : poke(env, [email], { t: "agents", book: "*" }));
}
