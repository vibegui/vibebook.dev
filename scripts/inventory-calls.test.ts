import { expect, test } from "bun:test";
import ts from "typescript";
import { createInventoryCallClassifier } from "./inventory-calls";

function scan(text: string) {
  const source = ts.createSourceFile(
    "fixture.ts",
    text,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const classify = createInventoryCallClassifier(source);
  const endpoints: { method: string; path: string; line: number }[] = [];
  const network: { method: string; kind: "inferred-rpc"; line: number }[] = [];
  function visit(node: ts.Node) {
    if (ts.isCallExpression(node)) {
      const line =
        source.getLineAndCharacterOfPosition(
          classify.site(node).getStart(source),
        ).line + 1;
      const endpoint = classify.endpoint(node),
        rpc = classify.inferredRpc(node);
      if (endpoint) endpoints.push({ ...endpoint, line });
      if (rpc) network.push({ ...rpc, line });
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
  return { endpoints: endpoints.sort((a, b) => a.line - b.line), network };
}

test("Hono constructor chains retain each route's HTTP method, textual path and source location", () => {
  const result = scan(`import { Hono } from "hono";
const routes = new Hono<{ Variables: Env }>()
  .post("/api/post", handler)
  .get("/api/read", handler);
routes.delete(dynamicPath, handler);`);
  expect(result.endpoints).toEqual([
    { method: "POST", path: '"/api/post"', line: 3 },
    { method: "GET", path: '"/api/read"', line: 4 },
    { method: "DELETE", path: "dynamicPath", line: 5 },
  ]);
});

test("import/constructor/receiver aliases and namespaced constructors are recognized", () => {
  const result = scan(`import { Hono as Server } from "hono";
import * as framework from "hono";
const Constructor = Server;
const original = new Constructor();
const alias = original;
const prefixed = alias.basePath("/api").use(middleware);
prefixed["patch"]("/item", handler);
new framework.Hono().options("/options", handler);
alias.route("/mounted", anotherRouter).head("/health", handler);`);
  expect(result.endpoints).toEqual([
    { method: "PATCH", path: '"/item"', line: 7 },
    { method: "OPTIONS", path: '"/options"', line: 8 },
    { method: "HEAD", path: '"/health"', line: 9 },
  ]);
});

test("Map.get, lookalike names, type-only imports and non-Hono instances are excluded", () => {
  const result = scan(`import type { Hono } from "hono";
import { Hono as Other } from "unrelated-package";
const app = new Map(); const auth = app; const router = new Other();
app.get("not a route"); auth.delete("not a route"); router.get("not a route");
new Hono().get("type only", handler);
const circular = other; const other = circular; circular.get("cycle", handler);`);
  expect(result.endpoints).toEqual([]);
});

test("lexical parameters and block/loop declarations shadow outer Hono receivers", () => {
  const result = scan(`import { Hono } from "hono";
const app = new Hono();
function useMap(app: Map<string, string>) { app.get("parameter"); }
{ const app = new Map(); app.get("block"); }
for (const app of maps) { app.get("loop"); }
function useDestructured({ app }: Input) { app.get("destructured"); }
app.get("/real", handler);
const named = function app() { app.get("named function"); };
function constructorShadow(Hono: typeof Map) { new Hono().get("constructor parameter"); }`);
  expect(result.endpoints).toEqual([
    { method: "GET", path: '"/real"', line: 7 },
  ]);
});

test("inferred RPC candidates include computed/parenthesized methods and exact HTTP verbs", () => {
  const result = scan(`api.books[":id"].$post({ json: body });
(client["$get"])({ query: input });
route.$head();
route.$options();
route.$put({ json: body });
route.$patch({ json: body });
route.$delete();
route.get("not an imported Hono receiver"); route.$url();`);
  expect(result.network).toEqual(
    ["POST", "GET", "HEAD", "OPTIONS", "PUT", "PATCH", "DELETE"].map(
      (method, index) => ({ method, kind: "inferred-rpc", line: index + 1 }),
    ),
  );
  expect(result.endpoints).toEqual([]);
});
