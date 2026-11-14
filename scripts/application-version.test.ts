import { expect, test } from "bun:test";
import { Window } from "happy-dom";
import { applicationShellVersion } from "../svelte/features/application/version";

function document(html: string) {
  const page = new Window().document;
  page.head.innerHTML = html;
  return page;
}
test("production release identity comes from the Worker HTML ETag, not the module query", () => {
  expect(
    applicationShellVersion(
      document(
        '<meta name="vb-v" content="html-etag"><script type="module" src="/svelte-preview/app.js?v=module-hash"></script>',
      ),
    ),
  ).toBe("html-etag");
});
test("missing production ETag stays unknown instead of inventing a release identity", () => {
  expect(
    applicationShellVersion(
      document(
        '<script type="module" src="/svelte-preview/app.js?v=module-hash"></script>',
      ),
    ),
  ).toBeNull();
  expect(
    applicationShellVersion(document('<meta name="vb-v" content="">')),
  ).toBeNull();
});
test("source development has an explicit sentinel and keeps no production ETag", () => {
  expect(
    applicationShellVersion(
      document('<script type="module" src="/bootstrap.ts"></script>'),
    ),
  ).toBe("development");
});
