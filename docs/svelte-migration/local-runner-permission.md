# Native local-runner error parity

Ports main `4ba0793`'s browser diagnostic into native Agents. The loopback focus
URL, omitted credentials, explicit user action, response validator and existing
10-second owned lease are unchanged. A failed/null focus response queries the
browser's `local-network-access` permission. Known denied/prompt states show the
same EN/PT instructions to enable local access; granted, missing, unsupported or
malformed permission results keep the existing runner-unavailable error. An
explicit validated runner error does not trigger that browser query.

The permission query is readonly and cannot grant/request permission. Its emerging
name is not in all pinned DOM declarations, so a localized reflection boundary
preserves the actual receiver and narrows its unknown result, without an assertion
or global type widening. The query remains inside the focus lease: timeout,
cancel/disposal and owner tickets fence ignored late answers. No raw browser or
runner error body is newly disclosed.

The upstream CLI change selects the room's terminal session behind the same
`/focus?room=` endpoint; there is no new native endpoint or browser-side selection
policy to port. Four focused source cases cover diagnostic states, unchanged
loopback request properties, skipped queries on successful/explicit-error replies,
late cancellation and the actual receiver/result adapter. Real Local Network
Access behavior, browser support and loopback/CLI focus remain runtime gates.

Author verification: the combined edge/runner pure suite passed eight tests / 44
assertions with Bun 1.4.4 in 1.244 seconds; owned formatting/config checks passed.
No compiler, actual permission/hardware, CLI focus or browser run occurred here.

Peer follow-up: focus now allocates its ticket before publishing focusing state
and rechecks ownership afterward, so a synchronous subscriber cancel/dispose
cannot start a new old-room lease. The regression requires zero requests in both
cases. Two-file formatting passed; the final combined suite passed nine tests /
48 assertions in 635 ms. DOM/compiler/browser checks remain separate.
