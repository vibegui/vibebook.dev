# Focused document ownership diagnosis

The real full Document run 4 passed its first six phases, then failed the combined disposal/account/mobile phase. The focused ownership cohort passed against existing Worker5, without starting/stopping that Worker, seeding storage, mocking canonical data or intercepting Yjs transport. It created a real room over HTTP, typed Unicode through the native editor, independently confirmed the Book document mirror, reached the real Home UI, checked old editor teardown, switched DEV identity, waited for the real foreign access UI and matching fresh AccessContext, restored the owner on desktop, and exercised the 390px Doc sheet plus Doc→Files→Doc keyboard focus and another real mirrored editor write.

Evidence: `/tmp/vibebook-documents-ownership-1/results.json` and screenshots `01-owner-editor.png`, `02-foreign-access.png`, `03-phone-doc.png`, `04-phone-keyboard.png`. Seven named substeps passed; browser pageErrors were empty. Supplied asset-build revision was `e54e9e4` (runner supplied, not independently attested), measured API/shell version `91e34bf43f6eec832fa0b5056a780938`, and fetched `/svelte-preview/app.js` SHA256 `4d9d4e09d0732fba5da49911c04870e99c344a9df831f2a2cbb3ee0e8a7b8d74`. Harness base was `76772b5`; focused source was uncommitted at execution. Bun PID360422/Chromium root PID360447 exited; browser slot was explicitly released. No product fix was made.

This is a focused pass with a desktop owner restoration detour. It does **not** establish that the earlier direct foreign→owner→phone failure was a harness-only issue, and it does not turn the full Document suite into a pass. DEV identities do not verify production session issuance; Chromium viewport/keyboard is not hardware touch, iOS, IME, crash durability or same-document account callback acceptance. Home teardown here uses real full navigation, not SPA component-only disposal.

The full Document harness final phase now has positive Home readiness, positive foreign native access readiness plus validated matching AccessContext, precise substeps, and safe pageerror names/public local asset locations with query strings removed. It preserves the original direct restore-owner→set390px→navigate sequence **without** the focused desktop detour. Missing private DOM is asserted only after positive access initialization. Its direct adverse path and diagnostics changes remain source-only/unrun. Other document phases, real relay/provider/membership and privacy assertions remain intact. Formatting and strict tooling for this checkpoint are also unrun; root owns their resource slot and the full adverse-path rerun.

Run the focused cohort only against disposable loopback DEV persistence:

```sh
TEST_BASE_URL=http://127.0.0.1:8797 TEST_APP_REVISION=<asset-build-revision> \
TEST_OUTPUT_DIR=/tmp/vibebook-documents-ownership bun run test:documents:ownership
```
