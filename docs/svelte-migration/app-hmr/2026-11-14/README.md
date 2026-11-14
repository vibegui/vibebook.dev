# Full application source HMR receipt

[Run 43567717044](https://github.com/vibegui/vibebook.dev/actions/runs/43567717044)
passed at PR head `eeedb13`, merge revision
`45c2b4303d6616cc6f9d8efc961fa80a3615c067`. The isolated Ubuntu job installs from
the frozen lockfile, creates private synthetic local credentials, and launches
the actual Worker/Vite development command. It does not replace canonical API
or WebSocket responses with browser mocks.

The original [results](results.json) verify startup cancellation and owned
descendant cleanup; cold startup; identity forwarding; source versus default
vanilla shells; access denial; protected/encoded/symlink paths and hostile
authorities; HTTP writes and room/personal/editor WebSocket handshakes; mounted
Sidebar and sole Tailwind stylesheet HMR with the application-owned composer
draft and connection retained; shared-contract declaration regeneration and
reload/reconnection; Worker/API source updates; final port/process cleanup.

Cold readiness took 4,305 ms in this run. All five intentionally edited sources
have their exact original SHA-256 restored, with zero active mutations, page
errors or cleanup errors. The [runner receipt](runner.json) confirms its private
variable cleanup; raw logs, variables, Worker persistence and source backups
are excluded from uploaded evidence.

This proves the stated local development scope at this checkpoint. It does not
prove production, mobile, all feature workflows, model-provider quality or
performance budgets. Later deferred-view changes require a fresh HMR run,
including a representative deferred component edit, before final sign-off.
