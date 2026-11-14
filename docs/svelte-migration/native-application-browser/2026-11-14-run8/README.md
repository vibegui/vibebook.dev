# Actual integrated application run 8: partial proof, overall failure

[GitHub run 43563524139](https://github.com/vibegui/vibebook.dev/actions/runs/43563524139) tested PR head `743a4e0d15e491714afc8e82fe22eb630db31e0d`; the runner reports GitHub merge revision `bc66f233f03d3a4c4e2875e1d111ea012a1768aa`. Chromium was `158.0.8127.18`. These JSON files are the actual downloaded safe artifacts, without regenerated or fabricated observations.

Loaded entry SHA-256: `7fb704c8fd9b4efa36bcbc6856f3bbbb18075bc29bf8a74b9d1992946e7cb01b`. CSS SHA-256: `9da04f91a424416b34315e689a479b389d65cc4892baca1d08c4073f7d052dad`. Worker shell/Me version: `e50676b1ab8553db940f3d15858a8f82`.

| Actual gate | Result |
| --- | --- |
| All seven dependent functional phases | Passed: real HTTP/MCP/R2 setup, vanilla default, native drafts/history, two-client compose, bounded reading window/anchor and repin/own-send, Viewer Back/Forward, native/vanilla Unicode Yjs convergence plus actual Book mirror read, mobile Viewer/sheet history |
| 20 same-document room/thread/live-editor lifecycle cycles | Passed all socket/editor assertions, including synchronized `1 Book / 1 Personal / 1 Yjs` and closed-editor `1 / 1 / 0` |
| Close completion | All 66 recorded application close calls completed; maximum 27ms, code 1005 after a no-code client close. Earlier runs retained CLOSING transports and abnormal 1006 completion; explicit server close completion is present in this source. |
| EN/PT × light/dark × desktop/mobile profiles | All eight failed Home axe `link-in-text-block` (serious). Home palette checks recorded zero mismatches. The later Room/panes/keyboard checks were not reached. |
| Actual replacement-App authority probe | Inconclusive during real setup after room creation and before file identification/user open/read. No inherited-read or denial claim is supported. |
| Page errors and owned runner cleanup | No page errors, no cleanup errors, zero remaining owned process groups |

The independent-audit collector correctly retained these failures and kept the overall run failed. Profile and probe failures are not waived by the functional/lifecycle passes.

Post-GC heap increased from 18,298,512 to 21,168,696 bytes (+2,870,184 bytes). Growth slowed: cycle 1→5 added 1,314,948 bytes, cycle 15→20 added 148,820 bytes. The last five samples still slope upward by about 32,728 bytes/cycle. DOM nodes stayed at 7,765 after cycle 1 and event listeners stayed at 437. These observations support the socket/editor disposal result but do not prove a heap plateau, complete observer disposal or freedom from retained/detached objects. Warming/JIT and bounded diagnostic metadata can contribute; the report does not attribute every byte to them. A longer cohort and heap-retainer analysis remain separate work.

The fixture used actual disposable local Worker/D1/R2/Book/DocRoom and DEV example.test identities. No canonical responses were mocked. This is Chromium/local evidence, not real email-provider, external MCP-provider, production durability, Safari/iOS, hardware/IME or assistive-technology acceptance. Raw Worker logs, state, credentials and browser traces are excluded.
