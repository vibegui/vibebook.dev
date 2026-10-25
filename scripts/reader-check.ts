// Run: bun scripts/reader-check.ts
import { checkUrl, clean } from "../src/reader";

const assert = (c: unknown, msg?: string) => {
  if (!c) throw new Error(`assert failed: ${msg ?? ""}`);
};
const ok = (v: object) => "url" in v;

for (const u of ["https://www.princess.com/x?a=1#y", "http://example.com"]) assert(ok(checkUrl(u)), u);
for (const u of ["http://localhost:8787", "http://127.0.0.1", "http://[::1]/", "file:///etc/passwd", "http://user:pw@x.com", "http://printer.local", "https://vibebook.dev/app", "http://intranet"])
  assert(!ok(checkUrl(u)), u);
assert(clean("![a](b.png)\n\n\n[Rome](http://r)") === "Rome", "clean");
console.log("reader check ok");
