# Integrated native application browser gate

This source checkpoint runs the actual NativeApplication and RoomScope against a disposable local Worker, Book/Person/DocRoom Durable Objects, D1 and R2. It does not replace API, canonical WebSocket or Yjs responses. The separate neutral room-layout browser job proves geometry, not this application gate.

The dedicated `native-application-browser.yml` job installs the pinned lockfile/browser, builds current native assets and MCP resources, then runs `bun run test:native-application:ci`. The runner creates an exclusive local `.dev.vars`, initializes fresh local persistence through normal middleware, starts one Worker on 127.0.0.1:8797 and owns shutdown of its subprocess groups. Existing developer secret files are never overwritten.

Against an already running disposable Worker with DEV identities enabled and current assets, run:

```
TEST_BASE_URL=http://127.0.0.1:8797 TEST_OUTPUT_DIR=/tmp/native-application-evidence bun run test:native-application:browser
```

The browser creates unique example.test identities, actual rooms, a thread/task, documents, 96 history messages plus a fenced-code message, and an uploaded R2 text file through supported HTTP/MCP. The OAuth/PKCE MCP grant is real local authorization, not a provider mock. Assertions cover the vanilla default, native source selection and loaded shell/asset identity; Home/room/thread history and app-owned drafts; real UI compose and two native clients; reading anchor preservation across full Board plus a hidden real WS update; Viewer Back/Forward; native/vanilla Yjs convergence; and mobile Viewer/sheet history.

The same application document then performs at least 20 real room/thread/editor lifecycle cycles, with actual Book/Personal/Yjs socket accounting, synchronized live editors, disposal assertions and equivalent post-GC heap/DOM counters. No per-cycle navigation reload resets the heap. Raw observations do not establish complete detached-tree or observer retention freedom. Eight additional actual contexts audit EN/PT × light/dark × 1440/390, frozen Studio assets/computed roles, all seven panes, axe and keyboard overlays.

Only safe JSON, checkpoint logs and scoped synthetic test-room screenshots are uploaded. Raw Worker logs, persistence, `.dev.vars`, OAuth credentials, raw DOM, HAR and browser traces are excluded. Invalid runs retain phase timings and partial lifecycle/profile evidence. The bounded CI runner cleans owned children even on interruption.

This checkpoint is source only: formatting, strict tooling and actual runner execution remain pending. DEV identities do not prove real email/session-provider issuance; external MCP apps, model-backed operations, production deployment, crash durability, Safari/iOS, hardware touch, IME and assistive technology remain separate gates. Font asset integrity requests are audit traffic, not startup-font performance measurements.

After all seven dependent core phases pass, lifecycle, profile and replacement-App authority audits collect independently. A lifecycle failure retains its exact failed check and close-call snapshot, then fresh profile/App contexts can still produce evidence. Each audit remains strict, any failed audit makes the overall run fail, and interruption stops further work. Failed core setup or functional phases still stop the dependent cohort immediately.
