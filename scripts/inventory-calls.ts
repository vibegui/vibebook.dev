import ts from "typescript";

const methods = new Set([
  "get",
  "post",
  "put",
  "patch",
  "delete",
  "head",
  "options",
  "all",
]);
const fluent = new Set([
  ...methods,
  "route",
  "on",
  "use",
  "basePath",
  "notFound",
  "onError",
]);
type Binding = {
  initializer?: ts.Expression;
  kind?: "constructor" | "namespace";
};
type Scope = { parent?: Scope; bindings: Map<string, Binding> };

function unwrap(expression: ts.Expression): ts.Expression {
  while (
    ts.isParenthesizedExpression(expression) ||
    ts.isAsExpression(expression) ||
    ts.isTypeAssertionExpression(expression) ||
    ts.isNonNullExpression(expression) ||
    ts.isSatisfiesExpression(expression)
  )
    expression = expression.expression;
  return expression;
}

function member(expression: ts.Expression) {
  const value = unwrap(expression);
  if (ts.isPropertyAccessExpression(value))
    return { receiver: value.expression, name: value.name.text };
  if (
    ts.isElementAccessExpression(value) &&
    value.argumentExpression &&
    ts.isStringLiteralLike(value.argumentExpression)
  )
    return { receiver: value.expression, name: value.argumentExpression.text };
  return null;
}

/** Syntactic candidates only: imported Hono receivers and lexical aliases, not route typechecking or mount resolution. */
export function createInventoryCallClassifier(source: ts.SourceFile) {
  const owners = new WeakMap<ts.Node, Scope>();
  const root: Scope = { bindings: new Map() };
  const declare = (name: ts.BindingName, scope: Scope, binding: Binding) => {
    if (ts.isIdentifier(name)) scope.bindings.set(name.text, binding);
    else
      for (const element of name.elements)
        if (ts.isBindingElement(element)) declare(element.name, scope, {});
  };
  function collect(node: ts.Node, parent: Scope) {
    if (
      (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node)) &&
      node.name
    )
      parent.bindings.set(node.name.text, {});
    const scope =
      node !== source &&
      (ts.isBlock(node) ||
        ts.isModuleBlock(node) ||
        ts.isClassLike(node) ||
        ts.isFunctionLike(node) ||
        ts.isCatchClause(node) ||
        ts.isForStatement(node) ||
        ts.isForOfStatement(node) ||
        ts.isForInStatement(node))
        ? { parent, bindings: new Map<string, Binding>() }
        : parent;
    owners.set(node, scope);
    if (
      (ts.isFunctionExpression(node) || ts.isClassExpression(node)) &&
      node.name
    )
      scope.bindings.set(node.name.text, {});
    if (ts.isImportDeclaration(node)) {
      const fromHono =
        ts.isStringLiteral(node.moduleSpecifier) &&
        node.moduleSpecifier.text === "hono";
      const clause = node.importClause;
      if (clause?.name) declare(clause.name, scope, {});
      const imports = clause?.namedBindings;
      if (imports && ts.isNamespaceImport(imports))
        declare(
          imports.name,
          scope,
          fromHono && !clause?.isTypeOnly ? { kind: "namespace" } : {},
        );
      else if (imports)
        for (const item of imports.elements)
          declare(
            item.name,
            scope,
            fromHono &&
              !clause?.isTypeOnly &&
              !item.isTypeOnly &&
              (item.propertyName ?? item.name).text === "Hono"
              ? { kind: "constructor" }
              : {},
          );
    }
    if (ts.isVariableDeclaration(node))
      declare(node.name, scope, { initializer: node.initializer });
    if (ts.isParameter(node)) declare(node.name, scope, {});
    ts.forEachChild(node, (child) => collect(child, scope));
  }
  collect(source, root);
  const lookup = (node: ts.Identifier): Binding | undefined => {
    let scope = owners.get(node);
    while (scope) {
      if (scope.bindings.has(node.text)) return scope.bindings.get(node.text);
      scope = scope.parent;
    }
  };
  function isConstructor(
    expression: ts.Expression,
    visiting = new Set<ts.Expression>(),
  ): boolean {
    const value = unwrap(expression);
    if (visiting.has(value)) return false;
    visiting.add(value);
    if (ts.isIdentifier(value)) {
      const binding = lookup(value);
      return (
        binding?.kind === "constructor" ||
        (!!binding?.initializer && isConstructor(binding.initializer, visiting))
      );
    }
    const access = member(value);
    return (
      access?.name === "Hono" &&
      ts.isIdentifier(access.receiver) &&
      lookup(access.receiver)?.kind === "namespace"
    );
  }
  const cache = new WeakMap<ts.Expression, boolean>();
  function isHono(
    expression: ts.Expression,
    visiting = new Set<ts.Expression>(),
  ): boolean {
    const value = unwrap(expression),
      known = cache.get(value);
    if (known !== undefined) return known;
    if (visiting.has(value)) return false;
    visiting.add(value);
    let result = false;
    if (ts.isNewExpression(value)) result = isConstructor(value.expression);
    else if (ts.isIdentifier(value)) {
      const binding = lookup(value);
      if (binding?.initializer) result = isHono(binding.initializer, visiting);
    } else if (ts.isCallExpression(value)) {
      const access = member(value.expression);
      result =
        !!access &&
        fluent.has(access.name) &&
        isHono(access.receiver, visiting);
    }
    visiting.delete(value);
    cache.set(value, result);
    return result;
  }
  return {
    site(node: ts.CallExpression): ts.Node {
      const expression = unwrap(node.expression);
      if (ts.isPropertyAccessExpression(expression)) return expression.name;
      if (ts.isElementAccessExpression(expression))
        return expression.argumentExpression ?? expression;
      return expression;
    },
    endpoint(node: ts.CallExpression) {
      const access = member(node.expression);
      return access &&
        methods.has(access.name) &&
        node.arguments[0] &&
        isHono(access.receiver)
        ? {
            method: access.name.toUpperCase(),
            path: node.arguments[0].getText(source),
          }
        : null;
    },
    inferredRpc(node: ts.CallExpression) {
      const access = member(node.expression);
      return access &&
        /^\$(?:get|post|put|patch|delete|head|options)$/.test(access.name)
        ? {
            method: access.name.slice(1).toUpperCase(),
            kind: "inferred-rpc" as const,
          }
        : null;
    },
  };
}
