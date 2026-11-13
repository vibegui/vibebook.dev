# Browser and backend boundaries

The browser app uses Svelte 5, TypeScript and Vite. Its root entry is `svelte/bootstrap.ts`, with native mounts exported by `svelte/main.ts`; Vite emits the committed browser bundle in `public/svelte-preview/`. The Cloudflare Worker and Durable Objects live in `src/` and are built separately by Wrangler.

`clientBoundary` in `svelte/build/clientBoundary.ts` rejects backend imports while Vite resolves the browser dependency graph. This applies to direct imports, transitive imports, aliases, symlinks and statically analyzable dynamic imports. A browser build fails if it reaches:

- Any runtime module under `src/`.
- A `*.server.ts`/`*.server.js` module or a project-owned `server/` directory. A dependency's directory layout alone does not mark its browser-safe helpers as server-only; the runtime and explicit marker checks still apply to dependencies.
- A module importing `server-only`.
- A Node, Cloudflare or workerd runtime module.
- A `.env`/`.env.*` or `.dev.vars`/`.dev.vars.*` file, or content inside `.git/`, `.ssh/` or `.vibebook/`. This includes raw and URL asset imports; use `import.meta.env` for deliberately public Vite configuration.

Mark backend modules outside `src/` explicitly:

```ts
import "server-only";

export async function readPrivateData() {
  // Backend implementation.
}
```

The local `server-only` package is an empty module on the Worker. The Vite plugin rejects it in the browser graph before tree shaking, so the marker cannot disappear unnoticed as an unused import.

Place browser-safe runtime helpers and wire contracts in `shared/`. Shared modules must not import backend implementations. Type-only imports (`import type`) are erased before dependency resolution and can refer to backend types without adding backend runtime code to the browser bundle. Prefer contracts in `shared/` when both sides use them.

Run `bun run check:client-boundary` to build positive and negative fixtures through Vite. The fixtures verify shared imports, type erasure and public Vite configuration, and reject direct, transitive, aliased, symlinked, dynamic, marked and runtime-specific backend imports. Synthetic private-file fixtures also cover raw/URL imports and externally configured imports without reading project credentials. `bun run build:ui` enforces the same boundary on the actual app. Browser builders share the classification rules exported by `createClientBoundaryPolicy` so they cannot silently diverge.

CSS asset resolution needs its own enforcement: Vite's CSS `url()` and nested `@import` reads can bypass module hooks. The plugin protects existing alias resolvers and the fallback resolver in place, before file reads; replacing the alias array leaves Vite's previously captured CSS resolver unprotected. Real plain-CSS and Tailwind builds reject private/backend font URLs, URL assets, aliases, symlinks and nested imports while permitting browser-safe fonts. Public assets short-circuit CSS resolution, so the plugin also inspects the public directory's paths and symlink targets before a build can publish them. Missing optional public directories are allowed; traversal errors are not ignored.

These are browser guards. Vite's separate server dependency optimizer legitimately imports Node modules; server consumer contexts are excluded explicitly, while client and unknown alias contexts remain guarded. A server-build positive fixture and matching browser negatives keep that distinction checked. Component-gallery HMR must also start and update successfully with the guard installed.

One localized SDK typing workaround exists in that alias adapter: Vite 8.3.8's exported `ResolverFunction` omits async returns that its runtime accepts and awaits. A documented `@ts-expect-error` covers only the adapter return assignment; callback parameters and resolved IDs remain typed, with real CSS/Tailwind regression builds. It does not suppress application or wire-contract errors. Remove the directive when the upstream type admits the async return; TypeScript reports it as unused when that happens.

The app's Bun browser builds, `bun run build:collab` and `bun run build:mcp`, also enforce this shared policy through `scripts/browser-build.ts`; their regression fixtures are in `scripts/bun-client-boundary.test.ts`. The separate `site/` application has its own browser/SSR pipeline and is outside these app build guards.

The guard protects the build's module graph. It cannot classify arbitrary code fetched or executed at runtime; do not add `eval`, variable remote imports or manual source copying as a way around the module boundary. It is not a replacement for keeping credentials out of source code.

## Shared contracts and transports

`shared/room.ts` defines the JSON room snapshot and event union; `shared/commands.ts` defines browser-to-Book commands; `shared/rpc.ts` defines the room HTTP request and response DTOs. The backend uses these contracts for `Book.broadcast`, its initial snapshot, human posting and file uploads. SQLite integer flags are converted to JSON booleans before serialization.

`shared/validation.ts` validates untrusted JSON on both sides: the Worker parses incoming commands before dispatch, and `svelte/transport.ts` parses incoming events before the store sees them. Unknown event/command names, wrong primitive values and malformed nested tasks, files, polls or messages are rejected. The UI store re-exports the shared types and handles only typed events. `createRoomApi` provides typed posting/upload calls with response checks; the existing Worker routes and their authentication remain unchanged.

Every JSON route the app calls (49) is inferred Hono RPC: `shared/schemas.ts` provides runtime schemas, `src/api.ts` builds the validated route type and the frontend imports only generated API declarations through `hono/client`; the rest of the inventory (redirects, assets, external protocols) is documented as n/a in `docs/svelte-migration/api-coverage.md`. The legacy host's own fetches are not claimed as inferred RPC until their callers move to the client.

Room commands are schema-derived too (`RoomCommandSchema` in `shared/commands.ts`; `RoomCommand` is `z.infer` of it, and `isRoomCommand` is that schema). Correlated commands: a command may carry `cid` (1-64 chars); the Book then answers it exactly once with `{ t: "result", cid, ok: true }` or `{ t: "result", cid, ok: false, error }` (invalid command, refused by the room's rules, e.g. an empty message, an unknown thread, a secret, a bad pin, or a server error). A command without `cid` gets no extra event, so vanilla and already-open tabs are untouched, and the old `blocked`/`error` events still go out. In the browser, `createRoomConnection().send` stays the Boolean bridge (true = queued), and `request(command)` is the typed async call: it resolves `{ ok: true }` or `{ ok: false, error }` and never hangs (`offline`, `disconnected`, `timeout` after 10s); results are consumed by the connection, not forwarded to the store. Room events (`shared/room.ts`) are still hand-written interfaces checked by `shared/validation.ts`; deriving them from schemas is the next step. Keep transport and state separate: WebSocket owns room data, Yjs owns document text, and Svelte consumes the room store. See `docs/svelte-migration/api-coverage.md` and the full migration plan for acceptance.

Run `bun scripts/protocol-check.ts` for malformed-payload, nullable-data, disconnected-socket and HTTP response tests. Include `shared/` and `svelte/transport.ts` in TypeScript checking so changes to command names or payloads are checked in both applications.

## Frontend layout and migration boundary

`public/app-svelte.html` is the document shell and `public/app-svelte.css` contains transitional legacy styles. Native primitives and Inbox use the sole new Tailwind entry, `svelte/styles/tailwind.css`, imported once through `svelte/styles.ts`. The old stylesheet remains an explicit full-migration debt. `svelte/legacy/host.js` retains existing composer, routing, document editor, embed and account integrations. It is intentionally JavaScript during the incremental migration and is not covered by the Svelte TypeScript check. `svelte/{Chat,Message,Sidebar,Tasks,Board,Files,Reminders,Inbox}.svelte`, the room reducer, and the new transport/contracts are TypeScript checked. This migration does not claim that every existing HTTP endpoint or host integration is typed.

Vite builds `svelte/main.ts` and the bootstrap's lazy gallery/host branches into `public/svelte-preview/`. Commit **all** generated JavaScript chunks and the single generated `ui.css` together; `ui.js` alone is not the complete build. Run `bun run build:ui` after browser source or shared runtime contract changes. The Worker remains a separate Wrangler build; no backend implementation is imported by the browser.

Verification commands: `bun run check`, `bun run check:ui`, `bun run test:ui`, `bun run test:store`, `bun run check:protocol`, `bun run check:client-boundary`. For live checks, start the local Worker with `DEV_EMAIL` configured, then run `bun run test:browser` and `bun run measure:ui`. Browser checks refuse production URLs and create only local test data. Metrics alternate baseline/current HTML in isolated browser contexts and record downloaded gzip bytes, readiness, thread switching, browser task duration, heap and DOM nodes; local results are not a production performance claim.

The default `bun run check` runs backend and UI typing, shared protocol checks, boundary fixtures, a real UI build with generated-asset consistency checks, component/store tests and shell-version tests. The build stamps deterministic asset query versions into the shell so the Worker's existing HTML ETag update notification continues to detect JavaScript and CSS releases. Commit the shell alongside all generated chunks.

Install a Playwright Chromium runtime before browser checks (`bunx playwright install chromium`). `test:browser` captures the real room protocol snapshot used by `measure:ui`; the benchmark starts its own local static server and simulates the same HTTP/WebSocket delivery for both versions. It does not measure backend or production network latency.

## Development and review checks

`bun run dev` builds current frontend assets before starting Wrangler. Run `bun run dev:ui` in a second terminal for guarded frontend build watching; this workflow does not provide HMR. `bun run dev:components` provides verified component-gallery Vite HMR separately; full-application, Worker and shared-contract HMR remain migration work. New build/test tooling is strictly checked by `check:tooling`. Scoped `format:check` covers the typed frontend, contracts and related scripts; the existing JavaScript integration host is excluded from that formatting migration.

The typed `roomConnection.ts` owns one room's socket and retry/stability timers until disposal. Leaving a room invalidates callbacks, cancels retries and destroys collaborative editor providers. `test:connection` exercises these lifecycle boundaries, including callbacks already queued at disposal. See `adversarial-architecture-review.md` for reproduced findings and remaining architecture work.

Vanilla remains the default at ordinary URLs, with its original HTML, Inbox and editor assets. The Svelte preview is selected only by `?ui=svelte`; `shared/uiVariant.ts` and `svelte/navigation.ts` preserve that per-URL selection without global history overrides or sticky assignment. See `svelte-rollout-plan.md`.
