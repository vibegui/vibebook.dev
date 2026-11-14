# Legacy Board placement adapter retirement

The direct RoomLayout/RoomScene runtime never imports legacy/boardLayout.ts. Its single Board cell changes CSS-grid placement without selecting, moving or remounting child nodes. The obsolete adapter and its combined move/watch fixture are removed; all actual Board task/filter/drag/mutation tests remain unchanged.

Coverage mapping:

| Retired adapter assertion | Actual production replacement |
| --- | --- |
| Preserve Board node, input value and component identity across chat/doc moves | room-layout-dom.test.ts first case: same Board/draft node, retained Unicode draft and exactly one component mount across pane/full/rail changes; actual RoomShell also checks native Board identity |
| Keep focused input while placement changes | Same DOM case now focuses the draft and asserts exact focused-node and selection preservation; room-layout-browser.ts adds programmatic placement/focus checks separate from pointer clicks that intentionally focus their controls |
| Ignore untrusted duplicate legacy IDs/classes | Same production DOM case inserts a foreign kanban/doc node in Chat, then verifies it stays in Chat while the explicitly owned Board remains unchanged |
| Ignore disposed callbacks, remove media effects idempotently | Existing production range/disposal case rejects old input/key events, now dispatches resize after disposal and repeats disposal without changing owner geometry/storage; geometry.dispose explicitly removes its media/viewport/listener owners |
| Mobile full Board returns to the document pane on a desktop media transition | Browser source waits for the prior sheet marker to leave history, opens full Board at 390px, resizes to 1440px and requires pane=board/full=false, exact same Board node/draft and one mount, then restores the document pane and 390px before the next proof |

Only the legacy adapter import/test and style-audit entry are removed. The replacement source assertions are UNRUN in this follow-up. The earlier scoped Layout pass does not cover these additions; real browser geometry/focus/provider acceptance remains a root gate.
