# Native file viewer source slice

Status: source in progress. No final migration acceptance, generated asset update or browser result is claimed here.

The opt-in application mounts a typed Svelte viewer from Files, pinned files, chat attachments/rich links, deep links and retained document links. Full attachments are immutable identity witnesses; partial links retain exact room/file IDs. Same-name uploads never retarget a selected version. A fresh partial index retains the selected version while requesting full history once; index acceptance and canonical delivery have separate bounded waits and explicit retries. An authoritative full index can establish removal.

Native Tailwind atoms own the dialog, controls, version selector and thread-file strip. Markdown uses the native sanitized rich renderer, CSV projects bounded data cells, plain text is escaped. Text reads cap bytes and characters and abort independently of an ignored fetch promise. Image/audio resources, sandboxed uploaded HTML and PDF wrappers own per-selection callbacks and disposal. Uploaded HTML receives no MCP host bridge; only Escape messages from the current connected iframe are honored. PDF browser plugin rendering and Safari audio/standalone behavior require real platform gates.

The existing authorized raw file endpoint still serves bytes, ranges and CSP. Explicit probe/text reads use `cache:no-store`; media and external links retain stable URLs. Backend cookie-partition changes are independently owned in `ff0479a`; the cache browser gate must use an unrouted context and the same exact URL before and after a supported account switch. No cache-busting query or Playwright routing may stand in for that test. Old already-fresh browser responses created before Vary:Cookie and same-cookie membership revocation are separate existing backend limits.

Opt-in browser file navigations denied with 401/403 receive the minimal native shell and a public `file-access` discriminant. IDs are validated from the exact current path. The existing grant-free access API/session is reused, with no automatic join request; sign-in/request/poll continuations preserve the exact file hash through the room route. Vanilla access cards, successful bytes and raw API failures remain unchanged. Native no-JavaScript fallback links explicitly remove `ui=svelte` and return to the standard card. The development adapter selects only exact opt-in file navigation GETs accepting HTML without Range; only marked native denial HTML is transformed, while successful bytes stream without text conversion.

History owns one overlay entry. Direct deep links create a safe base entry, version changes replace the overlay, Back closes and Forward reopens exact identity. Matching room/account/thread Forward adopts its existing entry and preserves the underlying phone sheet; validated foreign file navigation bypasses the old sheet pop handler. A user close followed immediately by room/Home navigation waits for the owned Back with a bounded unconfirmed warning; elapsed time never rewrites history or releases queued navigation. A late matching pop reconciles only the newest queued intent, and foreign room pops continue through the application router. An explicit Reload control is available while unconfirmed. Room/account disposal cancels requests, timers, pin state and private preview content. Detached version controls and old rich/media callbacks cannot act on a newer selection.

Source fixtures:

- `scripts/native-file-viewer.test.ts`: pure model, canonical index/read ownership, deadlines, range/stream bounds and history.
- `scripts/native-file-viewer-dom.test.ts`: component projection, exact selection and component-only disposal.
- Existing native auth and development middleware fixtures extend file-access/no-auto-request/continuation and exact raw-byte forwarding coverage.
- `scripts/files-browser.ts`: prior real Files suite adapted to the native viewer selectors; retains its explicit authentic delayed-frame fault injection scope.
- `scripts/native-file-viewer-browser.ts`: real typed uploads plus history, media, HTML Escape, PDF URL, keyboard and separate unrouted account-cache/access checks. Requires an already built local Worker with DEV_EMAIL. Run `TEST_BASE_URL=http://127.0.0.1:8797 TEST_APP_REVISION=<exact-built-source> bun scripts/native-file-viewer-browser.ts`. JSON report records supplied revision and loaded app version. This script has not been run by the source author.

Author validation: owned sources formatted (compact host/backend index retained); 16 focused pure tests / 81 assertions passed in 4.23 seconds. No DOM/compiler/browser process was run.

Pending gates: strict frontend/backend/tooling checks, source component suite, production build/boundary checks, real Worker/Vite/Chromium runs, cookie/provider lifecycle and mobile/Safari media behavior. Root coordinates these sequentially under the memory budget.
