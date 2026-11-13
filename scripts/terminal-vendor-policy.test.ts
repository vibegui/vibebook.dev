import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import {
  TERMINAL_VENDOR_FAMILY,
  TERMINAL_VENDOR_SCOPE,
  TERMINAL_PACKAGES,
  TERMINAL_ARTIFACTS,
  terminalVendorProblems,
  terminalArtifactMatches,
} from "./terminal-vendor-policy";
const approved = () => ({
  family: TERMINAL_VENDOR_FAMILY,
  scope: TERMINAL_VENDOR_SCOPE,
  packages: TERMINAL_PACKAGES.map((value) => ({ ...value })),
  sources: TERMINAL_ARTIFACTS.map((value) => value.path),
  artifacts: TERMINAL_ARTIFACTS.map((value) => ({ ...value })),
});
test("terminal vendor permission is the exact approved package source and digest set", () => {
  expect(terminalVendorProblems(approved())).toEqual([]);
  for (const value of [
    { ...approved(), family: "arbitrary renderer" },
    { ...approved(), scope: "body" },
    { ...approved(), packages: [{ name: "@xterm/*", version: "*" }] },
    {
      ...approved(),
      packages: [
        { name: "@xterm/xterm", version: "6.0.0" },
        TERMINAL_PACKAGES[1],
      ],
    },
    {
      ...approved(),
      sources: [...approved().sources, "@xterm/xterm/theme.css"],
    },
    { ...approved(), sources: ["@xterm/xterm/**/*"] },
    { ...approved(), artifacts: [] },
    {
      ...approved(),
      artifacts: approved().artifacts.map((value) => ({
        ...value,
        sha256: "forged",
      })),
    },
  ])
    expect(terminalVendorProblems(value).length).toBeGreaterThan(0);
});
test("installed terminal CSS and runtime injectors match measured upstream artifacts and reject modified bytes", () => {
  for (const artifact of TERMINAL_ARTIFACTS) {
    const bytes = readFileSync(
      new URL(`../node_modules/${artifact.path}`, import.meta.url),
    );
    expect(terminalArtifactMatches(artifact.path, bytes)).toBe(true);
    expect(
      terminalArtifactMatches(artifact.path, new Uint8Array([...bytes, 10])),
    ).toBe(false);
  }
  expect(terminalArtifactMatches("arbitrary.css", new Uint8Array())).toBe(
    false,
  );
});
