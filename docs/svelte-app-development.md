# Full app development with the local Worker

Install dependencies with `bun install`. Use the same local `.dev.vars`, D1
migrations and fixture data as the normal Worker workflow. For a local identity,
set `DEV_EMAIL` in `.dev.vars`; it is read only by the local Worker. Do not copy
production credentials into browser configuration.

Run from the repository root:

```sh
bun run dev:app
```

This first generates the inferred API declarations and MCP asset, then owns a
TypeScript declaration watcher, Wrangler at `http://127.0.0.1:8787`, and Vite at
`http://127.0.0.1:5173`. Wait for both servers to be ready. Stop the command with
Ctrl+C to terminate all three watchers. Existing local servers must release those
ports first. This workflow does not rebuild or rewrite production UI assets.

Open `http://127.0.0.1:5173/app?ui=svelte` or
`http://127.0.0.1:5173/b/ROOM?ui=svelte`. Use the literal `127.0.0.1` hostname:
the proxy trusts only the configured Vite origin. Login and archived views keep
the explicit selection. `/app` and `/b/ROOM` without that query still serve the
normal vanilla app through the Worker, using its existing production assets.
To modify vanilla assets use the existing vanilla build workflow.

The selected app HTML comes from the Worker, including its session and room
access checks. Vite replaces the compiled entry with `/bootstrap.ts` and injects
`/@vite/client`. API, room/personal WebSockets, editor transport and auth routes
share the browser's Vite origin and proxy to the local Worker. Session cookies
are forwarded. The separate collaborative editor entry is served from source.
The component gallery remains available at `/` with `bun run dev:components`;
that command does not start the full application backend.

Component and CSS changes use Svelte/Vite HMR without navigating the page.
Store-owned drafts and the existing host-owned composer remain outside replaced
components. Svelte 5 recreates edited components and resets component-local
state: drafts must belong to the room/thread session store when the composer
becomes native. Changes to `src/`, `shared/` or `collab/` cause a full reload
to refresh contracts, host/editor code and connections. Wrangler restarts the
Worker automatically; its existing WebSocket reconnect path recovers
connections. API declarations regenerate in parallel without a manual
`build:api-types`. Full reloads and incompatible HMR updates can discard
transient component state.

The source shell removes the production `vb-v` meta marker: production
`/api/me` and socket version signals cannot display a stale production update
banner for this source session. Production shell versioning, assets and the
Worker CSRF middleware are unchanged. Only the exact configured Vite Origin is
translated for HTTP and WebSocket proxy requests; other origins reach the
Worker unchanged. The development request allowlist exposes only browser source roots, published
assets, dependencies and Vite runtime modules. It checks both lexical and real
symlink targets, denying backend/tooling/configuration files and hidden Worker
bundles/caches, including `?raw`, `?url` and encoded-path attempts. Incoming
absolute or network-path request targets are rejected before forwarding cookies;
the Worker fetch target is always constructed from a local pathname and query.
The target is restricted to a loopback HTTP Worker. Provider OAuth callbacks
still use the Worker's origin (8787); use the local `DEV_EMAIL` identity for this
workflow, or configure provider callbacks separately for local OAuth testing.

Run the small routing/security/version regression suite with:

```sh
bun run test:dev-app
```

Runtime acceptance: open a fixture room through 5173, type a draft and edit a
mounted component and the stylesheet; check that the draft and open socket
remain. Edit a shared contract or Worker route and check reload/reconnection and
declaration regeneration. Revisit the unselected room URL and verify vanilla
assets. Check foreign-origin API writes and WebSocket handshakes still fail,
and protected `/@fs/.../src/api.ts?raw` and private-file URLs return 403. Do not
mark the M7 runtime gate complete solely from the pure test suite.
