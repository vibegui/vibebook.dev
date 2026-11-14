// Header-policy fixtures, not a real browser HTTP-cache or R2 integration gate.
import { expect, mock, test } from "bun:test";
mock.module("cloudflare:workers", () => ({
  DurableObject: class {},
  WorkerEntrypoint: class {},
  env: {},
}));
const { FILE_TYPES, fileHeaders } = await import("../src/rooms");

test("every supported private file type varies by the actual account cookie", () => {
  for (const type of [...FILE_TYPES, "unknown/unsupported"]) {
    const headers = new Headers(fileHeaders(type, "private file"));
    expect(headers.get("vary")).toBe("Cookie");
    expect(headers.get("cache-control")).toBe("private, max-age=86400");
    expect(headers.get("etag")).toBeNull();
    expect(headers.get("last-modified")).toBeNull();
  }
});

test("account cache partition leaves MIME, disposition and HTML sandbox intact", () => {
  const headers = new Headers(
    fileHeaders("text/html", 'ação"\r\n<script>.html'),
  );
  expect(headers.get("content-type")).toBe("text/html; charset=utf-8");
  expect(headers.get("content-disposition")).toBe(
    "inline; filename*=UTF-8''a%C3%A7%C3%A3o%22%0D%0A%3Cscript%3E.html",
  );
  expect(headers.get("x-content-type-options")).toBe("nosniff");
  expect(headers.get("content-security-policy")).toContain(
    "sandbox allow-scripts;",
  );
  expect(headers.get("content-security-policy")).not.toContain(
    "allow-same-origin",
  );
  expect(headers.get("content-security-policy")).toContain(
    "connect-src 'none'",
  );
  expect(headers.get("referrer-policy")).toBe("no-referrer");
  expect(headers.get("cross-origin-opener-policy")).toBe("same-origin");
});

test("plain text and unknown types retain non-executable serving policies", () => {
  expect(fileHeaders("text/markdown", "notes.md")["content-type"]).toBe(
    "text/plain; charset=utf-8",
  );
  const headers = fileHeaders("image/svg+xml", "unsafe.svg");
  expect(headers["content-type"]).toBe("application/octet-stream");
  expect(headers["content-security-policy"]).toBe(
    "sandbox; default-src 'none'; img-src 'self'; style-src 'unsafe-inline'",
  );
  expect(headers.vary).toBe("Cookie");
});
