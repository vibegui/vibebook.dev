# Actual entry chunk attribution

Metadata run43580265241 and mobile-first benchmark43580287468 used the exact same merge revision `8f50d87d28a365515fb11f8890227d456a1c5b9e`. The typed analyzer matched every observed output asset by revision **and source SHA**:48 native entry JS/CSS assets totaling422901gzip-reference bytes. This is actual request/source attribution, not accepted mobile timing: vanilla's mobile warmup passed, native failed later in history paging, and no complete mobile cohort exists. The six earlier valid-desktop budget failures remain unchanged.

| Actual emitted chunk | Gzip-reference bytes | Actual constituent modules, not filename guesses                     |
| -------------------- | -------------------: | -------------------------------------------------------------------- |
| mount-BLHvX3Tj.js    |               147174 | First-party application, room/controller and rendered component code |
| copy-tvfhUyOC.js     |                48159 | Marked12, entities7, rich AST/projection/rendering                   |
| dist-CW5RjG30.js     |                45978 | parse5 + its entities9 dependency                                    |
| Button-DeJmD0tV.js   |                42616 | tailwind-variants engine/core, tailwind-merge, shared Svelte runtime |
| api-DKmEofkD.js      |                17694 | Zod core runtime validation                                          |

MCP SDK modules exist in other deferred output chunks but are **absent from the observed entry package set**. Disabling protocol validation or changing SDK transport would not address this startup evidence. Both entities major versions are real resolved dependencies; this receipt does not authorize replacing either parser dependency or forcing a dedupe across incompatible versions.

The parser source-import witness is bootstrap→application mount→NativeApplication→RoomShell→RoomScene→DocumentPanel→DocumentPreview→rich session/project→markdownTree→parse5/Marked. Chat also needs rich parsing for agent messages. Merely delaying nonselected panel markup leaves those owner/import edges eager. Moving parser work out of entry requires bounded per-owner asynchronous lifetimes, safe raw-text availability, retained semantics and a readiness assertion that waits for the required rich output; otherwise an apparent timing improvement would measure incomplete UI.

The first low-risk change uses the installed documented `tailwind-variants/lite` entry for Button/Badge. Both actual recipes already configure `twMerge:false`; the existing namespaced `cn()` merger remains unchanged and authoritative. Lite uses the same variant core without eagerly importing its redundant built-in merge/debug engine. Only two import specifiers change; configuration, types, rendered classes, tokens and merge semantics stay unchanged. Existing UI-variant tests exercise actual atoms plus semantic radius/size/color overrides. No byte/timing improvement is claimed before rebuilding and rerunning the same graph/cohort.

The mount chunk's first-party contribution includes application89458, composer77857, documents65220, chat-interactive54801, app-navigation49086 and agents38530 rendered characters. These are bundler contribution metadata, **not gzip-byte allocations**. Candidate follow-up owner boundaries are closed navigation/dialog UI and nonselected pane-controller work; initial Chat/Document/Sidebar/Composer state must keep canonical identity and usability. No blanket owner replacement or parser fallback is authorized by these observations.

Full normalized typed attribution is retained in the two JSON files. Provenance hashes identify the original metadata/metrics inputs. Vanilla has zero Vite entry files because its Home code is inline; that is not zero application bytes. Tiny analyzer execution passed for both variants. Full build/type/UI/browser/performance checks for the two-import lite change remain pending at source checkpoint.

Author validation: scoped formatting passed; existing actual UI-variant suite passed1test/8assertions in481ms. No local Vite/type/browser/performance run was performed. Post-change bytes must come from a new metadata-enabled build, not a predicted subtraction of renderedLength.
