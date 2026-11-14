# Actual chunk/module attribution

Chunk filenames are arbitrary compiler labels, not library provenance. `VIBEBOOK_CHUNK_DIAGNOSTICS=1` enables a build-only Vite8/Rolldown observer. It never transforms code or emits runtime assets/manifests: metadata goes only to `.artifacts/chunk-diagnostics/{svelte,vanilla}.json`, outside public. It records actual output module renderedLength, package name/version read from the resolved dependency's package.json, normalized first-party source IDs, source static/dynamic edges and actual emitted JS/CSS bytes/SHA/gzip references. No module source, absolute user/project paths, raw query strings or environment contents are serialized. Normal builds write no diagnostic artifact.

`run-chunk-diagnostics` triggers a build-only remote job producing both graphs and static-entry summaries. That proves only the static bootstrap closure, not which dynamically imported application chunks execute during startup. `renderedLength` is bundler contribution metadata, never a module's gzip/network byte allocation. CSS is measured as a global emitted asset without individual rule attribution.

For actual startup attribution, build with the flag during the **same revision and asset build** used by the controlled browser benchmark, then run:

```
bun scripts/ui-chunk-attribution.ts .artifacts/chunk-diagnostics/svelte.json METRICS_JSON OUTPUT_JSON
```

The analyzer requires exact revision and actual observed asset SHA matches. It selects only entry-phase requested output JS/CSS, records each sample's device/status/warmup rather than converting diagnostics into a performance pass, ranks actual modules/packages and gives source-import witnesses among selected modules. Failed/missing/rebuilt/hash-mismatched graphs are refused. Keep both metadata and metrics artifacts; an old benchmark cannot be attributed to a newer build merely because chunk filenames look similar.

The existing performance workflow can opt in by adding `VIBEBOOK_CHUNK_DIAGNOSTICS: "1"`, retaining `.artifacts/chunk-diagnostics/`, and invoking the analyzer with its actual metrics.json. This source checkpoint does not change that workflow, timings, thresholds, schema validation, owner lifecycle or application behavior. Four focused cases cover misleading chunk names/dynamic observations, stale/ambiguous identity refusal, physical-root/query privacy with duplicate dependency instances, and vanilla inline Home versus delayed Inbox. Scoped formatting passed. Focused pure suite passed4tests/21assertions in2.80s after an initial temporary-filesystem ENOSPC interruption; build/types/browser remain UNRUN. Actual module attribution and optimization recommendations await remote evidence.
