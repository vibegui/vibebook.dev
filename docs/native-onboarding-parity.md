# Native first-room onboarding source slice

Baseline: main `6aa968611559659a4327641f7affd7c9f8438b05`. Native source parent: `24e73ae`.

The real Home mount selects the upstream three-step flow only for accounts with no rooms. Existing/invited users keep ordinary Home. Canonical profile name selects name/connect/first-room recovery; the upstream browser-global `vb.obDone` and `vb.obClaude` flags retain their exact meanings. A storage failure permits an in-memory skip but does not claim reload persistence.

The existing AccountSession singleton presents its profile mutation owner inline, without opening a second dialog. Name/photo still wait for canonical Me confirmation. Existing AppNavigation.creator presents the existing shared room draft and model-backed start-room command inline, and navigates only to its authoritative returned room ID. No HTTP or backend business rule changes. Back/Skip/unmount cancel only their captured bindings, never a replacement modal owner; account revision changes revoke the page. The Personal agent reader coalesces in-flight requests; the step polls at four seconds up to 150 reads and never treats copying setup instructions as a connection. Already-connected reads advance immediately; a fresh connection after an empty read displays the upstream 1.5-second success stage.

Source fixtures cover canonical name waiting, fresh/existing Claude stages, skip and reload flags, old poll completion, shared drafts and late creation, identity replacement, actual Home step rendering and IME Enter. The loopback browser source harness uses real profile HTTP/canonical reads and explicitly controlled grant metadata; it does not prove OAuth/Claude delivery or model-backed first-room creation. Existing/invited and model-backed creation runtime remain integration gates.

All formatter, pure, DOM, types, style, build and browser checks are UNRUN for this checkpoint. Preview assets are unchanged. Parent integration must preserve newer personal-channel identity reset and the connected-old-account control fix; this branch intentionally starts from the authorized 24e base and does not copy unrelated later source.
