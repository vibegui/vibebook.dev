import { expect, test } from "bun:test";
import { probeHTTP, probeFailure } from "./native-app-probe-diagnostics";
test("HTML review unavailability/refusal keeps exact actual HTTP status with only fixed artifact codes", () => {
  expect(
    probeHTTP("app-upload", 400, {
      error:
        "blocked: couldn't check this HTML right now (the safety check is down); try again in a minute.",
    }),
  ).toEqual({
    phase: "app-upload",
    status: 400,
    code: "html-review-unavailable",
  });
  expect(
    probeHTTP("app-upload", 400, {
      error: "blocked by @vibe's check: private provider details",
    }),
  ).toEqual({ phase: "app-upload", status: 400, code: "html-review-refused" });
  expect(probeHTTP("app-upload", 200, { id: "fixture" })).toEqual({
    phase: "app-upload",
    status: 200,
    code: "ok",
  });
});
test("unknown response payloads, credentials and exception stacks never reach safe evidence", () => {
  const secret = "PRIVATE_PROVIDER_BODY_OR_CREDENTIAL";
  for (const status of [400, 401, 403, 413, 415, 429, 500]) {
    const record = probeHTTP("app-upload", status, { error: secret });
    expect(record.status).toBe(status);
    expect(JSON.stringify(record)).not.toContain(secret);
  }
  const error = new Error(secret);
  error.name = secret;
  error.stack = `${secret}\n at /private/scripts/native-app-navigation-probe.ts:123456:123456`;
  const record = probeFailure(error);
  expect(record.name).toBe("UnknownError");
  expect(JSON.stringify(record)).not.toContain(secret);
  expect(record.sourceFrames).not.toContain(
    "scripts/native-app-navigation-probe.ts:123456:123456",
  );
});
