# Initial document-channel Chromium checkpoint

[Run 43574560640](https://github.com/vibegui/vibebook.dev/actions/runs/43574560640)
passed at PR head `e0920ba`, merge revision
`32d59ad91b7bb873023aa7999e12c891605d92f3`. The unchanged synthetic result
records an authorized private reply delivered as a real browser MessageEvent
with `isTrusted: true`, the actual parent source and expected parent origin.
The subsequent HTTP replacement received a generic denial; the fixture host
handled exactly one private request, from the initial document. No page errors
were recorded.

This checkpoint establishes the native-event payload compatibility mechanism
and the minimal replacement denial. Its `sameProxy` field was sampled before
navigation, so that field is **not proof of identity after navigation**. The
broader adversarial suite separately asserts both element and WindowProxy
identity after the replacement responds, uses a second HTTP origin, exercises
the installed SDK and tests held replies/consent, reopening and history.

This fixture uses the real browser channel implementation with synthetic host
handlers. It does not prove application integration, authenticated Worker file
POST navigation, CSP/base/history behavior, actual writes, providers, Safari or
BFCache admission. Those gates remain open.
