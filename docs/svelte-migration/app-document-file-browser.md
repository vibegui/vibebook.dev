# Controlled HTTP file navigation proof

The existing `test:app-document:browser` cohort now also invokes `app-document-file-browser.ts`. It bundles the actual native SDK bridge and calls its unchanged `loadFile` implementation against an owned loopback HTTP server. The file response uses the exact extracted server-only `fileHeaders` function and the production bootstrap injector. Existing room imports reexport the same function; GET/upload policy and header values are unchanged.

The positive case requires the nonce-only POST with the expected Origin and synthetic cookie, standards mode, the original file URL/base URI, opaque origin, and a private read delivered as an actual trusted parent MessageEvent. A subsequent same-frame replacement must receive a refusal without another private read. Raw GET bytes and CSP are checked separately. This controlled server does not prove Worker middleware, membership, session, R2, provider review or production authorization.

`file-post/results.json` records each safe phase, POST count/status, Boolean Origin/cookie/nonce checks, and classified console errors. It never records the nonce, cookie, private marker or response payload. A canceled disconnected-form submission is recorded as `form-disconnected`; the fixture does not alter form removal or retry navigation. This source checkpoint is unexecuted. In particular, it does not establish that the real Worker probe's initial-read timeout is fixed.

Build, server acquisition and page acquisition share the same `try/finally` boundary. A startup failure still writes its safe phase/error name; any acquired page/server is released, and cleanup failures are recorded and fail the case. The main runner must supply a page from an explicit browser context so a second owned page is permitted.
