import "server-only";
import { FILE_TYPES } from "../shared/composition";

// Uploaded HTML runs in an opaque origin: scripts may run (reports draw charts) but can't reach vibebook.dev's
// cookies or storage, can't fetch anything, submit forms, open popups or navigate the top page. Images only from
// here or data: (no tracking pixels); fonts from Google Fonts.
const HTML_CSP =
  "sandbox allow-scripts; default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline' https://fonts.googleapis.com; " +
  "font-src https://fonts.gstatic.com data:; img-src 'self' data: blob:; connect-src 'none'; form-action 'none'; base-uri 'none'; frame-ancestors 'self'";
const FILE_CSP = "sandbox; default-src 'none'; img-src 'self'; style-src 'unsafe-inline'";

export const fileHeaders = (type: string, name: string) => ({
  "content-type": FILE_TYPES.includes(type) ? (type === "text/html" ? "text/html; charset=utf-8" : type.startsWith("text/") ? "text/plain; charset=utf-8" : type) : "application/octet-stream",
  "content-disposition": `inline; filename*=UTF-8''${encodeURIComponent(name)}`,
  "x-content-type-options": "nosniff",
  "content-security-policy": type === "text/html" ? HTML_CSP : FILE_CSP,
  "referrer-policy": "no-referrer",
  "cross-origin-opener-policy": "same-origin",
  "cache-control": "private, max-age=86400",
  // A private cache is still shared by successive accounts in this browser.
  "vary": "Cookie",
});
