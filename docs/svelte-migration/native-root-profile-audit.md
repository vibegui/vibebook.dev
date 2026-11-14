# Integrated Root profile audit

`scripts/native-application-profiles.ts` is a source harness for the real native
application and Worker, invoked by the integrated application browser runner.
It uses eight fresh owner contexts: EN/PT, light/dark, 1440/390 pixels. The caller
must seed synthetic room content, including a recent canonical fenced-code
message within the chat window. No canonical response, API or WebSocket mocks
are permitted.

The helper visits Home, Room and each document pane. It compares the full frozen
Studio token projection and actual rendered role colors/fonts, checks loaded
Inter/CommitMono faces, and records Chromium's actual custom-font glyph usage
for the real room title and canonical code. Local font/license HTTP bytes and
SHA-256 values must match the existing font manifest. Those integrity requests
are explicit audit traffic, not renderer transfer or performance evidence.
Both archived and authenticated reference stylesheet digests are pinned; this
change amends no palette, fonts, stylesheet, manifest or application behavior.

WCAG A/AA axe runs cover the actual pages, panes and open overlays. Keyboard
checks open search and Inbox, exercise Tab/Shift+Tab containment, Escape and
exact trigger focus restoration. On mobile, search Escape must retain the
underlying side sheet; the next Escape must close it and remove its owned
history marker. These are assertions, not claimed runtime receipts.

Artifacts contain scoped test-room screenshots and JSON with computed
typography/colors, font names/hashes, keyboard completion markers and axe
IDs/impact/targets/counts. No raw HTML, HAR, traces, headers, OAuth pages or
credentials are recorded. Contexts close after each profile, including failure.
Failures remain failures; gallery results cannot substitute for this audit.

Status at source checkpoint: formatter, strict tooling, browser, axe and visual
profile execution are **unrun** under the shared resource hold. The integration
runner and its real fixture are a separate prerequisite. This is additional
acceptance coverage, not full UI, performance, real-provider or terminal proof.
