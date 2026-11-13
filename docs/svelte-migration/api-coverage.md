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
| POST | `/api/books/:id/icon` | `src/api.ts` | binary upload (typed adapter) | 37 | tested (slice 11) |
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
| GET | `/api/me` | `src/api.ts` | JSON RPC | 14 | tested (slice 10) |
| POST | `/api/me` | `src/api.ts` | JSON RPC | 14 | tested (slice 5) |
| POST | `/api/me/avatar` | `src/api.ts` | binary upload (typed adapter) | 1 | tested (slice 11) |
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

Slice 10 (`GET /api/me`): the handler moves to `ApiServices.me` (`src/services.ts`, with the shell-version lookup); the Person DO cache is checked against `MeData` before it is served (an entry from an older deploy that no longer fits is recomputed), and the D1 rows are checked before they leave the Worker. Every D1 column is nullable, so a row off the schema is logged ("/api/me rows off schema") and served as before instead of failing every home. Checked locally: uncached then cached answer, same keys and counts, vanilla and `?ui=svelte` homes load with no page errors. 47 of 49; left: the two binary uploads (room icon, avatar).

Slice 11 (profile picture, room icon): raw image bytes with a validated `content-type` header, same checks in the same order as before (same origin, type 415, size 413, `UPLOAD_LIMIT` 429; the icon: membership 403, a JSON body removes it, `setRoomIcon`'s own errors 400); the R2/D1 writes sit behind `ApiServices.saveAvatar` / `setRoomIcon`. Checked locally with a real PNG: set, wrong type, other origin, set icon + GET it back, remove, outsider. **49 of 49 JSON routes typed and tested**; the rest of the inventory is redirects, assets and external protocols, documented as n/a.

Slice 12 (public auth, room 1947): the login page's JSON calls were outside the inventory because they don't start with `/api` and run signed out: `GET /auth/providers`, `POST /auth/email/start`, `POST /auth/email/verify`, `POST /auth/logout` (JSON, or a form post that redirects to the login) and `POST /auth/logout-all`. They are now `authApi` in `src/api.ts`, its own typed app (`AuthAppType`, client `authClient` in `svelte/lib/client/api.ts`) mounted before the Worker's sign-in middleware, so no signed-in route can be reached through it. The handlers' bodies moved unchanged into `authServices` (`src/auth.ts`): same origin check, `LOGIN_LIMIT` keys, attempt counting, code hash, session cookie. `GET /auth/room/:id` gives the access page its context (`AccessContext`: state missing|out|ask|asked|member, title, email; the same `roomAccess` the `/b/*` page now uses). New `GET /auth/context?next=&error=` gives the native login page its context (`LoginContext`: providers, a safe `next`, `error` google|github|null). Redirect flows (`/auth/google|github/*`, `/auth/invite`) stay plain redirects; they now keep `?ui=svelte` when `next` carries it (`loginUrl`). Tests: `scripts/auth-ui.test.ts` (contract through `hc<AuthAppType>`, redirects). Slice 13: `GET /api/agents`, `POST /api/agents/revoke` and `DELETE /api/agents/:id` (your Claudes' OAuth grants) moved from `src/connect.ts` into the typed chain (`ApiServices.grants` = `grantOps`), so they now sit behind the sign-in middleware like every `/api` route; schemas `AgentGrant`, `AgentGrantsResult`, `RevokeAgentsBody`, `RevokeAgentsResult`. Slice 14: `GET /api/authorize/context` (same query as `/authorize`) gives a native consent page its `ConsentContext` (client name and verified domain, redirect host, loopback warning, scopes, the signed-in email, the one-time handle) through the same `parseAuthRequest` / `describeConsent` / `beginConsent` as the server page, on a request rebuilt at `/authorize` (the library accepts only that path), and passes on the transaction's `__Host-` binding cookie and `no-store`. Getting it grants nothing: approval stays the form `POST /authorize`, which checks the handle against that cookie and uses it once. Checked in Chromium against local dev with a DCR client: approve after a reload, reuse, deny, bogus handle, handle from another browser, refused requests (`redirect_to` only when the library built it). A signed-out `/authorize?…&ui=svelte` now goes to `/login?ui=svelte`.

Vanilla refs = occurrences of the path prefix in `public/app.html` (approximate; a shared prefix counts for several routes). The Svelte preview today reaches all of them through `svelte/legacy/host.js`; each slice moves its operations to the inferred client and updates this table.
