# Vanilla and product change ledger

| Reference | Change | Migration action | Status |
| --- | --- | --- | --- |
| `fbbd82b` / `d3e1473` | PWA install/banner, push notifications, service worker, CLI warning behavior | Keep default assets/behavior; port owned push/install UI into native Svelte and include F12/F13/F52 in final tests | Baseline preserved; Svelte port pending |
| Room message 1787 (Gimenes) | Local persistent router with per-room UI controls to wake/enable/disable the computer's Claude | Preserve current runner controls F41/F42 and account for published router contract/UI changes as that separate work lands; do not invent a protocol or disable vanilla's controls | Product direction acknowledged; not yet a published baseline feature |
| `2d5dbfe` / room 1822 | Compact read/delivery receipts with profile faces and agent marks; hover/tap details; viewer open-in-new-tab fix | Include the compact receipt interaction and delivered/read states in F22; preserve actual new-tab navigation in F34/F35 | Published vanilla change recorded; native port and final parity verification pending |
| `e0bce88` / room 1826 | Nested epic tree, per-room remembered expansion, current-branch expansion, busy descendant indicator and nested reordering, including archived epics | Include all these interactions and reload persistence in F24/F25 at desktop/mobile sizes | Published vanilla change recorded; native port and final parity verification pending |
| M0 Inbox isolation | Separate vanilla Inbox source so preview styling cannot break its rebuild | Keep typed source in `vanilla/inbox/`; enforce source/build boundaries and preserve compiled default assets | Strict source checks pass (0 errors/warnings); independent build and import-boundary fixtures pass; final-revision recheck remains required |

Add new vanilla commits affecting behavior/data contracts here before integrating them. A changed vanilla baseline requires an intentional ledger entry and parity update, not overwriting previous benchmark evidence.
