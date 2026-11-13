# Authoritative document scope guards

This narrow backend change keeps document operations on their supplied scope. A nonempty unknown/deleted epic is refused before a document write or metadata read; missing/null/empty epic retains the existing room-document meaning. Root `doc.get` reads the actual `doc` key and retains the existing empty `epic` field on the fetched event. Known epic reads/writes keep their exact target.

Late Yjs mirrors for deleted epics return before binding, metadata/task writes or broadcasts. Deleting an existing epic captures its room identity and schedules one disconnect of that exact `<room>~<epic>` relay. A disconnect failure is logged server-side; deletion is not retargeted or automatically retried. Fresh Yjs upgrades already reject deleted epics through `docSeed`.

`scripts/document-scope-guards.test.ts` executes the actual `Book` methods and correlated WebSocket dispatcher through an explicitly checked prototype test boundary. Cloudflare bindings, metadata/SQL and relay RPC are mocked. These are unit regressions, not real Durable Object, SQLite, Yjs relay or distributed-race acceptance.

Author validation: fixture/document formatting passed; 10 focused unit tests / 86 assertions passed in 2.31 seconds. Backend/type checks and real Worker/Yjs deletion, revocation and late-alarm lifecycle gates remain unrun. Vanilla remains the default; no presentation, command schema, session or unrelated backend logic changes here.
