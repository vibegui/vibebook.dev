import { DurableObject } from "cloudflare:workers";
import type { Env } from "./index";

/** One per person (idFromName(email)): the app's push channel for what lives outside an open room (the rail's unread
 * dots and ✻, "esperando você", the room's Claudes and sandboxes). It holds no data: sockets hibernate, and a poke
 * just tells every open tab "this changed, fetch it once" ({t:"me"} → /api/me, {t:"agents", book} → that room's
 * /api/books/:id/agents). Replaces the app's 30s polling. */
export class Person extends DurableObject<Env> {
  async fetch(req: Request) {
    if (req.headers.get("upgrade") === "websocket") {
      const [client, server] = Object.values(new WebSocketPair());
      this.ctx.acceptWebSocket(server);
      return new Response(null, { status: 101, webSocket: client });
    }
    const msg = await req.text();
    for (const ws of this.ctx.getWebSockets()) try { ws.send(msg); } catch {}
    return new Response(null, { status: 204 });
  }
  webSocketMessage() {} // the app only listens
  webSocketClose(ws: WebSocket) { try { ws.close(); } catch {} }
}

/** Tell these people's open apps that something changed. Fire and forget, ≤50 people per call. */
export function poke(env: Env, emails: Iterable<string>, msg: { t: "me"; book?: string } | { t: "agents"; book: string }) {
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

/** A listener's long-poll call: presence for the room's Pessoas. Its first call after a gap (started listening) pokes
 * the room's apps so "ouvindo" and "Abrindo seu Claude…" update without polling. */
export async function markListening(env: Env, agent: string, email: string, room: string, seen = false) {
  const now = Date.now();
  const was = await env.DB.prepare(`SELECT listening_at FROM agents WHERE id = ?`).bind(agent).first<{ listening_at: number | null }>();
  await env.DB.prepare(`UPDATE agents SET listening_at = ?, listen_room = ?${seen ? ", seen_at = ?1" : ""} WHERE id = ?`).bind(now, room || null, agent).run();
  if (!was?.listening_at || now - was.listening_at > 120_000) await (room ? pokeRoom(env, room, { t: "agents", book: room }) : poke(env, [email], { t: "agents", book: "*" }));
}
