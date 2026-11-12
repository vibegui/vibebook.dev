# Browser and backend boundaries

The browser app uses Svelte 5, TypeScript and Vite. Its entry is `svelte/main.ts`; Vite emits the committed browser bundle in `public/svelte/`. The Cloudflare Worker and Durable Objects live in `src/` and are built separately by Wrangler.

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

The app's Bun browser builds, `bun run build:collab` and `bun run build:mcp`, also enforce this shared policy through `scripts/browser-build.ts`; their regression fixtures are in `scripts/bun-client-boundary.test.ts`. The separate `site/` application has its own browser/SSR pipeline and is outside these app build guards.

The guard protects the build's module graph. It cannot classify arbitrary code fetched or executed at runtime; do not add `eval`, variable remote imports or manual source copying as a way around the module boundary. It is not a replacement for keeping credentials out of source code.

## Shared contracts and transports

`shared/room.ts` defines the JSON room snapshot and event union; `shared/commands.ts` defines browser-to-Book commands; `shared/rpc.ts` defines the room HTTP request and response DTOs. The backend uses these contracts for `Book.broadcast`, its initial snapshot, human posting and file uploads. SQLite integer flags are converted to JSON booleans before serialization.

`shared/validation.ts` validates untrusted JSON on both sides: the Worker parses incoming commands before dispatch, and `svelte/transport.ts` parses incoming events before the store sees them. Unknown event/command names, wrong primitive values and malformed nested tasks, files, polls or messages are rejected. The UI store re-exports the shared types and handles only typed events. `createRoomApi` provides typed posting/upload calls with response checks; the existing Worker routes and their authentication remain unchanged.

This is an explicit contract layer over the existing WebSocket/HTTP protocol, not a generated RPC framework. New operations should add their request/response types and validators to `shared/`, then implement the backend handler and typed frontend adapter. Keep transport and state separate: WebSocket owns room data, Yjs owns document text, and Svelte consumes the room store.

Run `bun scripts/protocol-check.ts` for malformed-payload, nullable-data, disconnected-socket and HTTP response tests. Include `shared/` and `svelte/transport.ts` in TypeScript checking so changes to command names or payloads are checked in both applications.

## Frontend layout and migration boundary

`public/app.html` is the document shell and `public/app.css` contains the existing styles. `svelte/legacy/host.js` retains existing composer, routing, document editor, embed and account integrations. It is intentionally JavaScript during the incremental migration and is not covered by the Svelte TypeScript check. `svelte/{Chat,Message,Sidebar,Tasks,Board,Files,Reminders,Inbox}.svelte`, the room reducer, and the new transport/contracts are TypeScript checked. This migration does not claim that every existing HTTP endpoint or host integration is typed.

Vite builds both `svelte/main.ts` and the host entry into `public/svelte/`. Commit **all** generated JavaScript chunks together; `ui.js` alone is no longer the complete build. Run `bun run build:ui` after browser source or shared runtime contract changes. The Worker remains a separate Wrangler build; no backend implementation is imported by the browser.

Verification commands: `bun run check`, `bun run check:ui`, `bun run test:ui`, `bun run test:store`, `bun run check:protocol`, `bun run check:client-boundary`. For live checks, start the local Worker with `DEV_EMAIL` configured, then run `bun run test:browser` and `bun run measure:ui`. Browser checks refuse production URLs and create only local test data. Metrics alternate baseline/current HTML in isolated browser contexts and record downloaded gzip bytes, readiness, thread switching, browser task duration, heap and DOM nodes; local results are not a production performance claim.

The default `bun run check` runs backend and UI typing, shared protocol checks, boundary fixtures, a real UI build with generated-asset consistency checks, component/store tests and shell-version tests. The build stamps deterministic asset query versions into the shell so the Worker's existing HTML ETag update notification continues to detect JavaScript and CSS releases. Commit the shell alongside all generated chunks.

Install a Playwright Chromium runtime before browser checks (`bunx playwright install chromium`). `test:browser` captures the real room protocol snapshot used by `measure:ui`; the benchmark starts its own local static server and simulates the same HTTP/WebSocket delivery for both versions. It does not measure backend or production network latency.
