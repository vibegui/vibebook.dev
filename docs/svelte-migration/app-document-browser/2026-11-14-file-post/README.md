# Passing document-bound HTTP transport

[Run 43588998458](https://github.com/vibegui/vibebook.dev/actions/runs/43588998458)
passes at exact source head `e7b9263e784993cb5f11921110cc0c8c27f29908`.
The three original JSON reports are retained unchanged; `runner.json` records
their byte counts and SHA-256 identities.

The controlled native bridge proof observes a valid nonce/cookie/origin POST
returning 200 with the exact production file headers. Its pre-insertion public
target matches the actual child navigable; navigation stays in the owned
iframe, with no extra page. The original document performs one private read
through a trusted native MessageEvent while retaining opaque origin, standards
mode, actual HTTP URL and base URL. Replacement navigation receives an explicit
refusal, retires the grant and does not increase the private-handler read count.

The stock-SDK and expanded adversarial suites also pass. Their original reports
retain the specific identity, held-message, consent, fresh-frame and history
controls. Actual BFCache admission is not claimed. This HTTP fixture is a
synthetic cookie/file server; actual Worker membership/session/R2 proof is the
separate [passing application cohort](../../native-application-browser/2026-11-14-passing-cohort/README.md).
