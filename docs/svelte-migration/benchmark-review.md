# Benchmark evidence review

Reference input: room message 1775, attachment `02e2366d44ad40fe` (`bench-harness.txt`), retrieved 2026-11-12. SHA-256 of the returned text: `9f2247d05dc2a5c25d27a198d313a2b25e143be58c98d1de4a48e91d0523a4db`. This is an earlier hybrid-preview experiment, not final M7 evidence.

The full-product browser script measures readiness, thread switching, older history, heap and transferred bytes against a synthetic local room. Its seed generator targets 30 epics, 210 tasks and 1,000 messages. The attachment also includes reduced-feature rendering experiments; those must remain separate from the actual-product comparison.

Before adopting it for M7:

- Generate a fresh deterministic fixture and assert the persisted counts. Re-running this seed appends more data, and it reads every matching existing epic; accumulated rooms are not a reproducible fixture.
- Alternate vanilla/Svelte rounds in one orchestrator, seven successful rounds per variant and device profile. The provided runner measures a single variant per invocation and cannot itself prove alternation.
- Fix readiness and history windows to equivalent semantic states. Record fixture revision, browser version, viewport, CPU/network/cache settings and tested source revision. Do not depend only on legacy class names or assume the same number of nodes means the same work.
- Fail the run on missing readiness, thread/history timeout, page errors or required-asset failures. The supplied script skips readiness failures and includes `-1` timeout samples in medians; neither is acceptable evidence of a passing budget.
- Report application JS and CSS gzip separately from font transfer. Its `docJsKb` groups documents and scripts and omits stylesheet/font categories; total network encoded length is not a replacement for the specified asset budgets.
- Preserve raw samples, use a consistent post-GC measurement point and run the required twenty room/thread/editor lifecycle cycles. Identify inactive sockets/providers/observers and detached trees rather than inferring disposal from one heap number.
- Compare the complete native Svelte product against current vanilla. Reduced-feature pages and the hybrid host cannot prove the final migration's performance.

Status: source reviewed; final harness, baseline capture and M7 measurements remain pending. No prior reported numbers have been promoted to acceptance evidence.
