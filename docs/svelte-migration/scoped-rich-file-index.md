# Room-owned rich-text file lookup

The prior per-content context key traversed canonical messages/origins and rebuilt
the same known-file fingerprint whenever their array references changed. A room
with 60 mounted content sessions and 660 loaded messages could therefore repeat
that traversal 60 times for one incoming message. File-link projection also used
the same collector. This is a source work count, not a measured timing result.

RoomScope now owns one lazy file snapshot: canonical files/messages/origins
references, ordered attachment witnesses and the existing metadata fingerprint.
Every read validates current account, room, identity/connection generation and
the supplied input references against the authoritative current supplier. An old
cached context or projected partial/full file list cannot borrow current files.
An owner/scope mismatch irreversibly closes the service; missing canonical state
clears its snapshot. Disposal clears references, arrays/fingerprint and callbacks.

The readonly reader is provided through the mounted RoomScene's typed Svelte
context. No module-global private data or WeakMap exists; the only module-level
context value is its public symbol key. RichContent and DocumentPreview opt in.
Standalone consumers or contexts rejected for reference mismatch collect fresh
files from their own explicit room input, never another owner's cached snapshot.
The context consumer has no disposal/mutation method.

Collection preserves files-first priority, then message and origin insertion,
same-ID deduplication and exact attachment identity. Version ordering, URL/private
ID/image policy, member/name keys and per-content syntax caches are unchanged.
Canonical room state, message reading windows, actions and readiness are not
delayed. The existing reducer replaces messages/files for relevant events and keeps
them for receipts/presence; this service does not promise to detect undocumented
in-place mutation of canonical arrays/attachment objects.

Six focused source cases exercise 60 actual RichSessions against an instrumented
canonical array (counting the real production collector's iteration), actual
receipt/delta/file/older reducer updates, exact file/version outputs, removal,
partial/full overrides, account/room/generation/current-owner invalidation,
disposal, and unchanged name/policy/private-prefix cache keys. They are not a
browser latency, memory or byte-budget result. Compiler, DOM, matched resource
graph and full performance cohort remain separate acceptance gates.

Author verification: 12 owned files formatted and both configuration checks
passed. The new six-case suite plus existing rich-text suite passed 22 tests /
299 assertions with Bun 1.4.4 in 4.15 seconds. Observed Bun VmHWM was 63,616 KiB
(`/proc` sampled every 50 ms, not aggregate process RSS). No compiler, component
DOM, browser latency, heap-retention or requested-byte measurement ran here.
