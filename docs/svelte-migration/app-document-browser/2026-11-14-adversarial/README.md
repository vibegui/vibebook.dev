# Adversarial document-channel Chromium checkpoint

[Run 43575694148](https://github.com/vibegui/vibebook.dev/actions/runs/43575694148)
passed at PR head `06b0a7e`, merge revision
`5d9160f5202381e36108cbeb7ac75869c9b49ac5`. Both uploaded synthetic JSON
artifacts are retained unchanged here.

The installed stock MCP App SDK 1.7.4 initialized and read through the real
channel. Legacy requests also worked. A second HTTP origin replaced content
in the same iframe; element/WindowProxy identity was checked after its response.
Its direct tools request, without initialization, was denied and the private
handler's read count stayed at one. A held private response was rejected after
navigation; held consent dispatched zero synthetic mutations. Explicit fresh
iframe reopening permitted the positive control's single synthetic mutation.
Actual subframe history restoration remained revoked. The separate synthetic
persisted-page lifecycle control also remained revoked.

No page errors were observed. The native-event fixture separately verifies
private payload hydration preserves browser source, origin and isTrusted.
These results use real Chromium channels with synthetic host handlers, not real
application writes. Authenticated Worker file POST navigation, application SDK
integration in both frontends, provider behavior, Safari and actual BFCache
admission remain separate verification requirements. The recorded history
persisted flag must not be treated as an actual BFCache pass when false.
