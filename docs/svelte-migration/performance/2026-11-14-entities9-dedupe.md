# Shared entities 9 decoder

The native application imports only `decodeHTML` from `entities`, in rich-text
URL normalization and Markdown token projection. parse5 8.1.1 already requires
entities 9. The direct runtime pin changes from 7.0.1 to 9.0.0 so a frozen install
can share that dependency instead of shipping two decoder implementations.
No parser, schema, URL allowlist, source budget or projection logic changes.

The v9 decoder implementation differs substantially from v7. A pinned **dev-only**
`entities-legacy` alias references the old 7.0.1 implementation for differential
tests through its public API. Only the compatibility test imports this alias;
application code never imports it. happy-dom also independently still requires
v7 as a dev dependency. This is not a global override of other packages' pins.

The pinned WHATWG named-reference data contains 2,231 entries, including legacy
names without semicolons. Tests validate its digest and reference codepoints,
check exact default decoded values, then compare both versions through default,
strict and attribute APIs with surrounding text and nine suffix boundaries
(120,474 differential comparisons). Additional cases cover numeric references,
Windows-1252 control replacements, surrogates, Unicode endpoints, deterministic
samples across Unicode, partial/malformed references and long overflow numbers.
Actual native `safeUrl` and rich AST projection continue rejecting encoded
javascript/data/control/custom URLs while preserving safe protocols and escaped
literal markup. All existing rich-text tests remain unchanged.

Author evidence: Bun 1.4.4 `install --lockfile-only --ignore-scripts` passed in
385 ms with an owned node_modules directory; shared dependencies were never
mutated. The first test attempt stopped before assertions because the older
primary dependency directory lacked Marked. After linking this isolated worktree
to the current canonical dependencies, `bun test
scripts/entities-compatibility.test.ts scripts/rich-text.test.ts` passed 19 tests /
4,628 assertions in 5.86 seconds. Node Prettier passed the new test, package.json
and tooling config. No compiler, Vite build, browser or fresh byte measurement was
run locally.

Remote frozen installation, strict types, security/browser gates and actual
post-build module/request attribution remain required. The expected production
source graph has one entities 9 instance and no `entities-legacy` or entities 7
application import; this source change does not establish a byte saving or clear
any previous performance failure. Existing workloads, readiness and budgets are
unchanged.
