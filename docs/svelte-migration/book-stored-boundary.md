# Book stored-data boundary: first cohort

This bounded source slice covers document notes, grade flags, the epic hash
cache, epic prod metadata, epic attachment summaries, suggestions, poll
options/votes, file-table rows and the internal `/file` HTTP body. It does not
complete the Book/M1 audit.

`bookStored.ts` validates before values enter room output or poll logic. Shared
Attachment/Suggestion/Epic contracts provide the wire fields. Valid siblings
survive a corrupt entry; invalid data emits a kind-only diagnostic, never raw
stored content. Corrupt option arrays invalidate that poll rather than shifting
indices and attributing existing votes to another option. Poll author is never
invented or defaulted to AI. Valid file IDs/types/metadata remain exact; bad file
rows are isolated rather than supplying guessed author/size/version metadata.

Compatibility includes absent/null note collections, absent/null optional prod
at/note, generic existing prod stage strings, absent/null suggestion task lists
as empty and optional why as absent, nullable old poll bits as false, and older
epic attachment summaries containing only id/name/type. Optional author/timestamp
are not invented for actual file-table rows: those must satisfy the existing
Attachment wire contract. No poll count/option-length policy, permission, upload
limit, vote/close behavior, task logic or vanilla source changes are introduced.
The `/file` body is rejected at 400 before metadata binding, insertion or
broadcast when JSON/schema validation fails.

Source fixtures cover corruption isolation, the shared wire contracts, older
nullable/optional shapes, duplicate option identities with unchanged vote
indices, exact file versions, actual Book notes/files/polls/epics/suggestions
methods, and actual `/file` rejection before writes plus the valid insert/event.
They use explicit SQL/DO doubles, not real SQLite/Worker acceptance.

## Remaining direct JSON/HTTP assertion inventory

The following direct `JSON.parse` paths remain outside this first cohort:

| Path                                 | Remaining payload                                                      |
| ------------------------------------ | ---------------------------------------------------------------------- |
| `messages`                           | Serialized message attachments and whole SQL row → Message assertion   |
| `roomWindow` recent rows and origins | Serialized attachments and whole Message assertions; origin truncation |
| `closeAsk`                           | Serialized choices (existing guarded parse, shape still unchecked)     |
| `quotes`                             | Serialized attachments projected to names                              |
| `agentRead`                          | Choices, cards and attachments in agent-facing output                  |
| `pinAdd`                             | Cached MCP tool metadata/resource URI                                  |
| `search`                             | Serialized attachments projected to id/name                            |
| `runCommand` older                   | Serialized attachments and whole Message assertions                    |
| `fetch` access-requested             | HTTP `{who,name}` assertion before request notice                      |

The receipt timer's `as unknown as number` remains a platform timer-handle type
issue, not stored JSON. Other scalar SQL/type assertions (including statuses,
book metadata/names/counts), `costOf` usage metadata and SQL generic assumptions
are not all runtime-validated by this cohort. Existing card normalization and
WebSocket command-envelope validation remain separate boundaries; this change
does not claim that their upstream stored strings are fully audited.

The allocated scoped formatter passed four paths, and focused Bun tests passed
seven cases with 42 assertions in 2.49 seconds. Expected invalid-row diagnostics
contain kinds only. Backend/API/worker and full UI/tooling types, builds and real
Worker/browser validation remain **unrun** for this cohort. Book's compact file
layout and generated assets are preserved.
