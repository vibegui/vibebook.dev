import assert from "node:assert/strict";
import type { BrowserContext } from "@playwright/test";

/** Shared only by incremental native UI suites, not production acceptance. */
export async function nativeBrowserFixtures(
  context: BrowserContext,
  base: string,
) {
  assert(
    /^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(base),
    "Use a local test Worker",
  );
  await context.route("https://fonts.googleapis.com/**", (route) =>
    route.fulfill({ status: 200, contentType: "text/css", body: "" }),
  );
  await context.route("http://127.0.0.1:47321/**", (route) => {
    const path = new URL(route.request().url()).pathname;
    assert(
      path === "/ping" || path === "/where",
      "Unexpected local runner operation",
    );
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: { "access-control-allow-origin": base },
      body: path === "/ping" ? '{"rooms":[]}' : "null",
    });
  });
  return [
    "legacy-only Google CSS isolated",
    "local runner: no active rooms/directory",
  ];
}
