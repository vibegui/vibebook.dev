# Application release identity

The Worker injects the sanitized HTML asset ETag into `meta[name="vb-v"]` and reports that same per-variant ETag through `/api/me.v`. Native application update availability must compare those two values. The `app.js?v=...` query identifies the browser bundle contents and belongs to a different hash domain.

The native mount now reads Worker metadata through `application/version.ts`. A compiled page with missing/empty metadata has unknown release identity; it does not invent an update signal. Vite source HTML intentionally strips the metadata and uses the existing `development` sentinel.

Local regression cohort: `bun test scripts/application-version.test.ts scripts/application-services.test.ts` passes 16 tests / 77 assertions. It includes a real parsed Document with different module/HTML hashes and actual ApplicationServices transitions from fresh metadata to a later release. Integrated Worker/browser fresh-load and update-banner checks remain required in the new harness.
