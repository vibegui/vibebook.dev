# Browser harness ownership after native Documents/Sidebar

The existing Tasks, Board, Files, Pins, navigation, secondary panels, Viewer and general live-browser suites now address the actual native document toolbar/peek and Sidebar controls. This is a source harness update; it does not add compatibility DOM IDs, mutate application state or remove assertions.

The shared helpers in `scripts/native-browser-fixtures.ts` select `#nativeDocumentToolbar` / `#nativeDocumentPeek button[data-document-pane]`, preserve an already selected phone sheet, and enter Board through the full document toolbar when the compact peek lacks that tab. Native task assertions scope to the real `[data-document-preview] [data-document-tasks]` AST slot and explicitly select preview mode. They never select the retained hidden `#tasks` shell placeholder. Phone Sidebar disclosure uses the actual native ThreadHeader button; desktop rail disclosure uses the native Sidebar button.

The general smoke suite also uses the current native Chat/Composer message, reply, file-input and send markers, native Files pin and Board controls, the accessible Inbox dialog, native CodeMirror container and actual Home room links. Its deliberate vanilla tab retains vanilla task selectors and still asserts vanilla default headers, absence of native Documents, independent assets/release versions and bidirectional cross-variant task fan-out. Yjs input uses actual editor keyboard input, retaining existing content, and still waits for the second live editor's matching text. SPA Home/Back/room navigation still proves editor teardown.

Existing native backend operations, authentic held-frame/disconnect fixtures, exact version identities, canonical persistence, keyboard/Escape/focus checks, accessibility/font assertions and phone history/Forward/Back checks are retained. No route/provider/database fixture was added or broadened by this update. Existing declared fixtures remain declared in each suite.

No browser, Worker, compiler, test or formatter was run while authoring this checkpoint. Parent sequential tooling/format/runtime gates remain required.
