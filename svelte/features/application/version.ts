/** Worker shell metadata and /api/me.v use the HTML asset ETag. The module
 * query is a different content hash and must never be compared with Me.v. */
export function applicationShellVersion(doc: {
  querySelector(
    selector: string,
  ): { getAttribute(name: string): string | null } | null;
}): string | null {
  const metadata = doc.querySelector('meta[name="vb-v"]');
  if (metadata) return metadata.getAttribute("content") || null;
  // Vite's source HTML deliberately strips production version metadata.
  return doc.querySelector(
    'script[type="module"][src*="/svelte-preview/app.js"]',
  )
    ? null
    : "development";
}
