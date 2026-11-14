# Production room layout browser evidence

Run [43547637652](https://github.com/vibegui/vibebook.dev/actions/runs/43547637652), Chromium job 132302555928, passed against PR head d97bcf0351cb523764e783dcb5485e905e5eea5d and GitHub merge revision b8be79f9cd9ec1c1a2f39492c2aa2802c3b93471. The report records exact entry/CSS hashes and browser version.

This executes the production layout controller and frame with neutral gallery snippets. It verifies continuous CSS animation geometry, drag thresholds, native range input, retained Board identity, sheet history, deferred navigation, disposal, and no first-party style writes or uncaught page errors. Synthetic input/cancellation and unsupported hardware/browser coverage are recorded explicitly in report.json.

It does not establish integrated RoomScope/Worker authentication, collaborative business state, provider behavior, or deployed acceptance. The same run built the full native preview on Linux and macOS, but stopped its broader checks at 15 RoomScope TypeScript errors. Later Board adapter retirement assertions are not covered by this receipt.
