# Native room route intents

The MCP sign-in return in `src/mcpconn.ts` uses `/b/ROOM?ui=svelte#app:CID`.
Native routing now retains that validated catalog intent until the authorized
canonical room and its matching RoomScope are attached. A CID-only return
refreshes the Apps catalog and clears any old selected frame; it does not guess
or invoke a tool, repeat sign-in, write data, or accept a consent question.
`#app:CID/tool` and `#app:room/tool` use the existing app opener and canonical
catalog/file identity checks. The backend authorization remains authoritative.

Vanilla `cardGo` accepts `#eEPIC` and `#doc[:EPIC]` and validates the epic against
its current room. Its initial reload handler currently handles only `#m`/`#f`;
this source does not claim otherwise or change vanilla. Native URL routing
supports those precise legacy card destinations as deep links, with explicit
query `t` taking precedence and final epic validation against the actual room.
A deleted document destination is reported unavailable rather than being
silently opened as the main document. Malformed app/document fragments do not
become app or document actions.

Once validated, a legacy epic hash is replaced in the same history entry by its
query `t` (and `#doc` when applicable). The Viewer can then own `#f` without
losing the selected epic on Back/Forward. Invalid epics are not normalized and
explicit query threads are preserved.

Pending intents retain account, room, root connection and navigation ownership.
Viewer and sheet navigation deferral remains in the existing owner chain.
Copied nested app targets prevent later edits to a caller's object from changing
an already queued navigation. Unit/actual Scope-owner cases exercise initial
returns, catalog versus tool behavior, stale/disposed and foreign room intents,
query precedence, and deleted epics. Browser/provider return verification remains
a separate gate; no new execution result is claimed by this source checkpoint.
