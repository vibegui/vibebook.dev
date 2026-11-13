# API coverage (M2)

Every route the Worker answers, generated from `src/*.ts` at the start of M2 (main d3e1473). **RPC** = served by a validated Hono route whose types reach the Svelte client through `hc<AppType>` (no hand-written DTO). Status: `todo` → `typed` (route chained + schema-validated + inferred client) → `tested` (positive/negative type tests + runtime tests).

| Method | Path | Handler | Kind | Vanilla refs | RPC status |
|---|---|---|---|---|---|
| GET | `/.well-known/jwks.json` | `src/index.ts:371` | external auth protocol (public keys for X-Vibebook-Identity), not app RPC | 0 | n/a (documented) |
| GET | `/api/archived` | `src/api.ts` | JSON RPC | 1 | tested (slice 3) |
| GET | `/api/avatar/:email` | `src/index.ts:549` | binary GET (asset) | 2 | n/a (documented) |
| POST | `/api/books` | `src/api.ts` | JSON RPC | 37 | tested (slice 5) |
| GET | `/api/books/:id/access` | `src/api.ts` | JSON RPC | 37 | tested (slice 4) |
| GET | `/api/books/:id/agents` | `src/api.ts` | JSON RPC | 37 | tested (slice 7) |
| POST | `/api/books/:id/archive` | `src/api.ts` | JSON RPC | 37 | tested (slice 2) |
| POST | `/api/books/:id/claude` | `src/api.ts` | JSON RPC | 37 | tested (slice 4) |
| GET | `/api/books/:id/connections` | `src/api.ts` | JSON RPC | 37 | tested (slice 9) |
| POST | `/api/books/:id/connections` | `src/api.ts` | JSON RPC | 37 | tested (slice 9) |
| DELETE | `/api/books/:id/connections/:cid` | `src/api.ts` | JSON RPC | 37 | tested (slice 9) |
| POST | `/api/books/:id/connections/:cid/call` | `src/api.ts` | JSON RPC | 37 | tested (slice 9) |
| POST | `/api/books/:id/connections/:cid/context` | `src/api.ts` | JSON RPC | 37 | tested (slice 9) |
| POST | `/api/books/:id/connections/:cid/refresh` | `src/api.ts` | JSON RPC | 37 | tested (slice 9) |
| GET | `/api/books/:id/connections/:cid/signin` | `src/mcpconn.ts:229` | browser navigation / redirect | 37 | n/a (documented) |
| POST | `/api/books/:id/connections/:cid/signout` | `src/api.ts` | JSON RPC | 37 | tested (slice 9) |
| GET | `/api/books/:id/connections/:cid/ui` | `src/api.ts` | JSON RPC (`{ html, tool }`: the app HTML travels as a string for srcdoc) | 37 | tested (slice 9; was listed as an HTML resource, but it answers JSON) |
| POST | `/api/books/:id/files` | `src/api.ts` | binary upload (typed adapter) | 37 | tested (slice 1) |
| GET | `/api/books/:id/files/:fid` | `src/index.ts:813` | binary GET (asset) | 37 | n/a (documented) |
| POST | `/api/books/:id/icon` | `src/index.ts:507` | binary upload (typed adapter) | 37 | todo |
| GET | `/api/books/:id/icon` | `src/index.ts:539` | binary GET (asset) | 37 | n/a (documented) |
| POST | `/api/books/:id/members` | `src/api.ts` | JSON RPC | 37 | tested (slice 3) |
| DELETE | `/api/books/:id/members/:email` | `src/api.ts` | JSON RPC | 37 | tested (slice 3) |
| POST | `/api/books/:id/post` | `src/api.ts` | JSON RPC | 37 | tested (slice 1) |
| POST | `/api/books/:id/request` | `src/api.ts` | JSON RPC | 37 | tested (slice 4) |
| POST | `/api/books/:id/requests` | `src/api.ts` | JSON RPC | 37 | tested (slice 4) |
| GET | `/api/books/:id/sandboxes` | `src/api.ts` | JSON RPC | 37 | tested (slice 8) |
| POST | `/api/books/:id/sandboxes` | `src/api.ts` | JSON RPC | 37 | tested (slice 8) |
| POST | `/api/books/:id/tint` | `src/api.ts` | JSON RPC | 37 | tested (slice 2) |
| POST | `/api/books/start` | `src/api.ts` | JSON RPC | 2 | tested (slice 5) |
| POST | `/api/claude-token` | `src/api.ts` | JSON RPC | 2 | tested (slice 6) |
| DELETE | `/api/claude-token` | `src/api.ts` | JSON RPC | 2 | tested (slice 6) |
| GET | `/api/dev/as` | `src/index.ts:405` | local dev only (DEV_EMAIL, loopback) | 0 | n/a (documented) |
| GET | `/api/dev/digest` | `src/index.ts:397` | local dev only (DEV_EMAIL, loopback) | 0 | n/a (documented) |
| GET | `/api/dev/report` | `src/index.ts:401` | local dev only (DEV_EMAIL, loopback) | 0 | n/a (documented) |
| GET | `/api/freestyle` | `src/api.ts` | JSON RPC | 2 | tested (slice 6) |
| POST | `/api/freestyle` | `src/api.ts` | JSON RPC | 2 | tested (slice 6) |
| DELETE | `/api/freestyle` | `src/api.ts` | JSON RPC | 2 | tested (slice 6) |
| POST | `/api/friends` | `src/api.ts` | JSON RPC | 2 | tested (slice 3) |
| DELETE | `/api/friends/:email` | `src/api.ts` | JSON RPC | 2 | tested (slice 3) |
| GET | `/api/mcp-oauth/callback` | `src/mcpconn.ts:245` | browser navigation / redirect | 0 | n/a (documented) |
| GET | `/api/me` | `src/index.ts:420` | JSON RPC | 14 | todo |
| POST | `/api/me` | `src/api.ts` | JSON RPC | 14 | tested (slice 5) |
| POST | `/api/me/avatar` | `src/index.ts:492` | binary upload (typed adapter) | 1 | todo |
| GET | `/api/me/logins` | `src/api.ts` | JSON RPC | 1 | tested (slice 3) |
| GET | `/api/notify` | `src/index.ts:310` | agent long-poll (CLI), not the app | 0 | n/a (documented) |
| GET | `/api/push/key` | `src/api.ts` | JSON RPC | 1 | tested (slice 2) |
| POST | `/api/push/subscribe` | `src/api.ts` | JSON RPC | 1 | tested (slice 2) |
| POST | `/api/push/test` | `src/api.ts` | JSON RPC | 0 | tested (slice 2) |
| POST | `/api/push/unsubscribe` | `src/api.ts` | JSON RPC | 1 | tested (slice 2) |
| POST | `/api/rooms/order` | `src/api.ts` | JSON RPC | 1 | tested (slice 2) |
| POST | `/api/route` | `src/api.ts` | JSON RPC | 1 | tested (slice 5) |
| DELETE | `/api/sandboxes/:sid` | `src/api.ts` | JSON RPC | 4 | tested (slice 8) |
| POST | `/api/sandboxes/:sid/pause` | `src/api.ts` | JSON RPC | 1 | tested (slice 8; was loop-registered, missing from the first inventory) |
| POST | `/api/sandboxes/:sid/start` | `src/api.ts` | JSON RPC | 1 | tested (slice 8; was loop-registered, missing from the first inventory) |
| POST | `/api/sandboxes/:sid/setup` | `src/api.ts` | JSON RPC | 4 | tested (slice 8) |
| POST | `/api/sandboxes/:sid/terminal` | `src/api.ts` | JSON RPC | 4 | tested (slice 8) |
| GET | `/api/search` | `src/api.ts` | JSON RPC | 2 | tested (slice 3) |
| PUT | `/api/upload/:token` | `src/index.ts:286` | binary PUT (agent upload link) | 0 | n/a (documented) |
| POST | `/api/waits/resolve` | `src/api.ts` | JSON RPC | 2 | tested (slice 2) |
| GET | `/app` | `src/index.ts:259` | HTML shell (navigation) | 16 | n/a (documented) |
| GET | `/archived` | `src/index.ts:263` | HTML shell (navigation) | 4 | n/a (documented) |
| GET | `/b/*` | `src/index.ts:270` | HTML shell (navigation) | 0 | n/a (documented) |
| GET | `/login` | `src/index.ts:258` | HTML page (navigation) | 8 | n/a (documented) |
| GET | `/mail/:onoff{off|on}` | `src/index.ts:346` | browser navigation / redirect | 0 | n/a (documented) |
| GET | `/oauth/code` | `src/index.ts:357` | browser navigation / redirect | 0 | n/a (documented) |
| GET | `/ws-me` | `src/index.ts:845` | WebSocket upgrade (typed protocol, not JSON RPC) | 2 | n/a (documented) |
| GET | `/ws/:id` | `src/index.ts:849` | WebSocket upgrade (typed protocol, not JSON RPC) | 3 | n/a (documented) |
| GET | `/yjs/:name` | `src/index.ts:833` | WebSocket upgrade (typed protocol, not JSON RPC) | 1 | n/a (documented) |

Slice 1 (post, upload): schemas in `shared/schemas.ts`, routes in `src/api.ts`, client `svelte/lib/client/api.ts`, type tests `svelte/lib/client/api.typetest.ts` (request and response mismatches fail svelte-check), runtime: `scripts/protocol-check.ts`, `scripts/ui-panels.test.ts` and a local run of every status (200, business 400, invalid payload 400, 403, 415).

Slice 2 (push subscribe/unsubscribe/key/test, waits/resolve, rooms/order, tint, archive): same gates; runtime run of each success and error status. One stricter answer: `archive` with a non-boolean `archived` is now a 400 (it used to archive). Bundle cost so far: the preview's main chunk grew 39.1 → 48.3 KB gzip (hono/client + zod/mini + the response schemas).

Slice 3 (archived, search, logins, friends add/remove, members invite/remove): database rows are parsed with the response schemas (`ArchivedRoom`, `LoginsResult`) before they leave the Worker; the type tests assert each route's 200 body equals its schema type.

Slice 4 (Ligar Claude, access request, approve/deny, access status): same gates; runtime run of every branch (non-member 403, unknown room 404, already a member, asked, deny twice → 404, approve → member).

Slice 5 (your name, create room, start room in one step, home router): the model's answers (start, route) are parsed with their schemas before they leave the Worker; runtime run of each status (empty 400, AI limit 429, cross-site 403, model failure 502, success).

Slice 9 (MCP connections: list, create, delete, refresh, ui, call, context, signout): `mountConnections` keeps only the two browser redirects (sign-in on the server, its OAuth callback); the rest is `connOps` in `src/mcpconn.ts` behind `ApiServices.connections`, every connection still looked up by room + the signed-in person (`getConn`/`canUse`). Failures keep `{ error }` and their status (400/404/429/502), and a server that wants its own sign-in still answers 401 with `sign_in: true`. `/ui` was inventoried as an HTML resource but answers JSON (`{ html, tool }`, the page puts the HTML in srcdoc), so it is typed too (`tool` as a validated query). 46 of 49 JSON routes typed and tested; left: `GET /api/me` and the two binary uploads (room icon, avatar).

Vanilla refs = occurrences of the path prefix in `public/app.html` (approximate; a shared prefix counts for several routes). The Svelte preview today reaches all of them through `svelte/legacy/host.js`; each slice moves its operations to the inferred client and updates this table.
