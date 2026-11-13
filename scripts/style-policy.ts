import ts from "typescript";
import { parse } from "svelte/compiler";
import postcss from "postcss";
import { parse as parseHTML } from "parse5";

export type StyleViolation = { file: string; line: number; reason: string };
export function auditHTML(file: string, source: string): StyleViolation[] {
  const issues: StyleViolation[] = [];
  const walk = (node: unknown): void => {
    if (!node || typeof node !== "object") return;
    let offset = 0;
    if (
      "sourceCodeLocation" in node &&
      node.sourceCodeLocation &&
      typeof node.sourceCodeLocation === "object" &&
      "startOffset" in node.sourceCodeLocation &&
      typeof node.sourceCodeLocation.startOffset === "number"
    )
      offset = node.sourceCodeLocation.startOffset;
    const attrs = new Map<string, string>();
    if ("attrs" in node && Array.isArray(node.attrs))
      for (const attr of node.attrs) {
        if (
          attr &&
          typeof attr === "object" &&
          "name" in attr &&
          typeof attr.name === "string" &&
          "value" in attr &&
          typeof attr.value === "string"
        )
          attrs.set(attr.name, attr.value);
      }
    const add = (reason: string) =>
      issues.push({
        file,
        line: source.slice(0, offset).split("\n").length,
        reason,
      });
    if (attrs.has("style")) add("Inline HTML style attribute");
    if (
      (attrs.get("class") ?? "")
        .split(/\s+/)
        .some((name) => name && name !== "dark" && !name.startsWith("tw:"))
    )
      add("First-party class outside the Tailwind namespace");
    if ("tagName" in node) {
      if (node.tagName === "style") add("HTML style block");
      if (
        node.tagName === "link" &&
        ((attrs.get("rel") ?? "")
          .toLowerCase()
          .split(/\s+/)
          .includes("stylesheet") ||
          attrs.get("as") === "style") &&
        !/^\/svelte-preview\/ui\.css(?:\?[^#]*)?$/.test(attrs.get("href") ?? "")
      )
        add("HTML stylesheet outside emitted Tailwind entry");
      if (
        node.tagName === "script" &&
        !attrs.has("src") &&
        "childNodes" in node &&
        Array.isArray(node.childNodes)
      )
        for (const child of node.childNodes) {
          if (
            child &&
            typeof child === "object" &&
            "value" in child &&
            typeof child.value === "string"
          ) {
            const base = source.slice(0, offset).split("\n").length - 1;
            issues.push(
              ...auditPresentation(`${file}#script`, child.value).map(
                (issue) => ({ ...issue, file, line: base + issue.line }),
              ),
            );
          }
        }
    }
    if ("childNodes" in node && Array.isArray(node.childNodes))
      node.childNodes.forEach(walk);
    if ("content" in node) walk(node.content);
  };
  walk(parseHTML(source, { sourceCodeLocationInfo: true }));
  return issues;
}
export function auditPresentation(
  file: string,
  source: string,
): StyleViolation[] {
  if (file.endsWith(".html")) return auditHTML(file, source);
  const issues: StyleViolation[] = [];
  const add = (offset: number, reason: string) =>
    issues.push({
      file,
      line: source.slice(0, offset).split("\n").length,
      reason,
    });
  const classText = (text: string, offset: number) => {
    if (
      text
        .split(/\s+/)
        .some((name) => name && name !== "dark" && !name.startsWith("tw:"))
    )
      add(offset, "First-party class outside the Tailwind namespace");
  };
  const classExpression = (text: string, offset: number) => {
    const ast = ts.createSourceFile(
      file,
      `(${text})`,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
    const visit = (node: ts.Node): void => {
      if (ts.isStringLiteralLike(node))
        classText(node.text, offset + node.getStart(ast) - 1);
      else if (
        ts.isParenthesizedExpression(node) ||
        ts.isExpressionStatement(node)
      )
        visit(node.expression);
      else if (ts.isConditionalExpression(node)) {
        visit(node.whenTrue);
        visit(node.whenFalse);
      } else if (ts.isArrayLiteralExpression(node))
        node.elements.forEach(visit);
      else if (ts.isObjectLiteralExpression(node))
        for (const property of node.properties) {
          if (
            ts.isPropertyAssignment(property) &&
            !ts.isComputedPropertyName(property.name)
          )
            classText(
              property.name.getText(ast).replace(/^["']|["']$/g, ""),
              offset + property.getStart(ast) - 1,
            );
        }
      else if (
        ts.isBinaryExpression(node) &&
        [
          ts.SyntaxKind.BarBarToken,
          ts.SyntaxKind.AmpersandAmpersandToken,
          ts.SyntaxKind.QuestionQuestionToken,
        ].includes(node.operatorToken.kind)
      ) {
        if (node.operatorToken.kind !== ts.SyntaxKind.AmpersandAmpersandToken)
          visit(node.left);
        visit(node.right);
      } else if (
        ts.isCallExpression(node) &&
        /^(?:cn|clsx|twMerge)$/.test(node.expression.getText(ast))
      )
        node.arguments.forEach(visit);
      else if (
        ts.isTemplateExpression(node) ||
        (ts.isBinaryExpression(node) &&
          node.operatorToken.kind === ts.SyntaxKind.PlusToken)
      )
        add(
          offset + node.getStart(ast) - 1,
          "Runtime class concatenation is not statically discoverable",
        );
    };
    ast.statements.forEach(visit);
  };
  const script = (text: string, offset: number) => {
    const ast = ts.createSourceFile(
      file,
      text,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
    // The card protocol's `props.style` is a closed semantic variant, not CSS.
    // Permit only strict comparisons with its catalog values, never mutation,
    // forwarding as inline CSS, computed access, or reading DOM style fields.
    const cardVariantComparison = (node: ts.PropertyAccessExpression) => {
      if (
        node.name.text !== "style" ||
        !ts.isPropertyAccessExpression(node.expression) ||
        node.expression.name.text !== "props"
      )
        return false;
      const parent = node.parent;
      if (
        !ts.isBinaryExpression(parent) ||
        ![
          ts.SyntaxKind.EqualsEqualsEqualsToken,
          ts.SyntaxKind.ExclamationEqualsEqualsToken,
        ].includes(parent.operatorToken.kind)
      )
        return false;
      const other = parent.left === node ? parent.right : parent.left;
      return (
        ts.isStringLiteral(other) &&
        [
          "plain",
          "bold",
          "muted",
          "code",
          "default",
          "primary",
          "danger",
        ].includes(other.text)
      );
    };
    // ECMA-402's number-format option is unrelated to CSS. Only the literal
    // built-in constructor/call option is allowed; generic style objects stay banned.
    const numberFormatOption = (node: ts.PropertyAssignment) => {
      const options = node.parent;
      if (!ts.isObjectLiteralExpression(options)) return false;
      const call = options.parent;
      return (
        (ts.isNewExpression(call) || ts.isCallExpression(call)) &&
        call.expression.getText(ast) === "Intl.NumberFormat" &&
        call.arguments?.[1] === options &&
        ts.isStringLiteral(node.initializer) &&
        ["decimal", "currency", "percent", "unit"].includes(
          node.initializer.text,
        )
      );
    };
    const visit = (node: ts.Node) => {
      const at = offset + node.getStart(ast);
      if (
        ts.isBindingElement(node) &&
        ts.isObjectBindingPattern(node.parent) &&
        ["style", "adoptedStyleSheets", "cssText"].includes(
          (node.propertyName ?? node.name).getText(ast).replace(/["']/g, ""),
        )
      )
        add(at, "Destructured CSSOM access");
      if (
        ts.isPropertyAccessExpression(node) &&
        ["style", "adoptedStyleSheets"].includes(node.name.text) &&
        !cardVariantComparison(node)
      )
        add(at, `CSSOM access: ${node.name.text}`);
      if (
        ts.isElementAccessExpression(node) &&
        ts.isStringLiteralLike(node.argumentExpression) &&
        ["style", "adoptedStyleSheets"].includes(node.argumentExpression.text)
      )
        add(at, "Computed CSSOM access");
      if (
        ts.isPropertyAssignment(node) &&
        ["style", "cssText"].includes(
          node.name.getText(ast).replace(/["']/g, ""),
        ) &&
        !(
          node.name.getText(ast).replace(/["']/g, "") === "style" &&
          numberFormatOption(node)
        )
      )
        add(at, "First-party style object");
      if (ts.isCallExpression(node)) {
        const callee = node.expression.getText(ast);
        if (
          node.expression.kind === ts.SyntaxKind.ImportKeyword &&
          node.arguments[0] &&
          ts.isStringLiteralLike(node.arguments[0]) &&
          /\.(?:css|scss|sass|less)(?:[?#]|$)/.test(node.arguments[0].text)
        )
          add(at, "Dynamic stylesheet import outside the sole entry");
        if (
          /(?:insertRule|deleteRule|replaceSync|addRule)$/.test(callee) ||
          /(?:EditorView|EditorState)\.(?:theme|baseTheme)$/.test(callee)
        )
          add(at, "Runtime stylesheet/theme API");
        if (
          callee.endsWith("createElement") &&
          node.arguments[0] &&
          ts.isStringLiteral(node.arguments[0]) &&
          node.arguments[0].text.toLowerCase() === "style"
        )
          add(at, "Runtime style element");
        if (
          callee.endsWith("setAttribute") &&
          node.arguments[0] &&
          ts.isStringLiteral(node.arguments[0]) &&
          node.arguments[0].text.toLowerCase() === "style"
        )
          add(at, "Inline style attribute mutation");
      }
      if (
        ts.isNewExpression(node) &&
        node.expression.getText(ast) === "CSSStyleSheet"
      )
        add(at, "Constructed stylesheet");
      if (
        ts.isTaggedTemplateExpression(node) &&
        /^(?:css|styled)(?:\.|$)/.test(node.tag.getText(ast))
      )
        add(at, "CSS-in-JS template");
      if (
        (ts.isStringLiteralLike(node) ||
          ts.isTemplateHead(node) ||
          ts.isTemplateMiddle(node) ||
          ts.isTemplateTail(node)) &&
        /<style\b|\bstyle\s*=/i.test(node.text)
      )
        add(at, "Styles in HTML/template text");
      if (
        ts.isImportDeclaration(node) &&
        ts.isStringLiteral(node.moduleSpecifier)
      ) {
        const path = node.moduleSpecifier.text;
        if (
          /\.(?:css|scss|sass|less)(?:[?#]|$)/.test(path) &&
          !(file === "svelte/styles.ts" && path === "./styles/tailwind.css")
        )
          add(at, "Stylesheet import outside the sole entry");
        if (
          /(?:@emotion\/|styled-components|goober|@vanilla-extract\/)/.test(
            path,
          )
        )
          add(at, "CSS-in-JS dependency");
      }
      if (
        ts.isExportDeclaration(node) &&
        node.moduleSpecifier &&
        ts.isStringLiteralLike(node.moduleSpecifier) &&
        /\.(?:css|scss|sass|less)(?:[?#]|$)/.test(node.moduleSpecifier.text)
      )
        add(at, "Stylesheet re-export outside the sole entry");
      ts.forEachChild(node, visit);
    };
    visit(ast);
  };
  if (file.endsWith(".svelte")) {
    const ast = parse(source, { filename: file, modern: true });
    if (ast.css) add(ast.css.start, "Svelte style block");
    const expressions = new Set<string>();
    const walk = (value: unknown): void => {
      if (Array.isArray(value)) {
        value.forEach(walk);
        return;
      }
      if (!value || typeof value !== "object") return;
      for (const key of ["expression", "test", "declaration"]) {
        if (!(key in value)) continue;
        const expression: unknown = Reflect.get(value, key);
        if (
          !expression ||
          typeof expression !== "object" ||
          !("start" in expression) ||
          typeof expression.start !== "number" ||
          !("end" in expression) ||
          typeof expression.end !== "number"
        )
          continue;
        const identity = `${expression.start}:${expression.end}`;
        if (expressions.has(identity)) continue;
        expressions.add(identity);
        const text = source.slice(expression.start, expression.end);
        script(
          key === "declaration" ? text : `(${text})`,
          expression.start - (key === "declaration" ? 0 : 1),
        );
      }
      if (
        "type" in value &&
        "start" in value &&
        typeof value.start === "number"
      ) {
        if (value.type === "StyleDirective")
          add(value.start, "Svelte style directive");
        if (
          value.type === "Attribute" &&
          "name" in value &&
          value.name === "class" &&
          "value" in value
        ) {
          const parts: unknown[] = Array.isArray(value.value)
            ? value.value
            : [value.value];
          for (const part of parts) {
            if (
              part &&
              typeof part === "object" &&
              "expression" in part &&
              part.expression &&
              typeof part.expression === "object" &&
              "start" in part.expression &&
              typeof part.expression.start === "number" &&
              "end" in part.expression &&
              typeof part.expression.end === "number"
            )
              classExpression(
                source.slice(part.expression.start, part.expression.end),
                part.expression.start,
              );
            if (
              part &&
              typeof part === "object" &&
              "type" in part &&
              part.type === "Text" &&
              "data" in part &&
              typeof part.data === "string" &&
              part.data
                .split(/\s+/)
                .some(
                  (name) => name && name !== "dark" && !name.startsWith("tw:"),
                )
            )
              add(
                value.start,
                "First-party class outside the Tailwind namespace",
              );
          }
        }
        if (
          value.type === "RegularElement" &&
          "name" in value &&
          value.name === "link"
        ) {
          const attrs = new Map<string, string>();
          let spread = false;
          if ("attributes" in value && Array.isArray(value.attributes))
            for (const attribute of value.attributes) {
              if (!attribute || typeof attribute !== "object") continue;
              if ("type" in attribute && attribute.type === "SpreadAttribute")
                spread = true;
              if (
                !("name" in attribute) ||
                typeof attribute.name !== "string" ||
                !("value" in attribute) ||
                !Array.isArray(attribute.value)
              )
                continue;
              const parts: string[] = [];
              for (const part of attribute.value) {
                if (
                  !part ||
                  typeof part !== "object" ||
                  !("type" in part) ||
                  part.type !== "Text" ||
                  !("data" in part) ||
                  typeof part.data !== "string"
                ) {
                  parts.length = 0;
                  break;
                }
                parts.push(part.data);
              }
              if (parts.length) attrs.set(attribute.name, parts.join(""));
            }
          const rel = attrs.get("rel");
          if (
            spread ||
            !rel ||
            rel.toLowerCase().split(/\s+/).includes("stylesheet") ||
            attrs.get("as") === "style"
          )
            add(
              value.start,
              "Svelte stylesheet link outside the sole root entry",
            );
        }
        if (
          value.type === "TransitionDirective" ||
          value.type === "AnimateDirective"
        )
          add(value.start, "First-party runtime transition styling");
        if (
          value.type === "Attribute" &&
          "name" in value &&
          value.name === "style"
        )
          add(value.start, "Inline style attribute");
      }
      Object.values(value).forEach(walk);
    };
    walk(ast.fragment);
    for (const section of [ast.instance, ast.module]) {
      if (!section) continue;
      // The compiler supplies source offsets on ESTree programs; ESTree's public
      // Program declaration omits them. Narrow the actual metadata before use.
      const content = section.content;
      if (
        !("start" in content) ||
        typeof content.start !== "number" ||
        !("end" in content) ||
        typeof content.end !== "number"
      )
        throw new Error("Svelte script source offsets unavailable");
      script(source.slice(content.start, content.end), content.start);
    }
  } else script(source, 0);
  return issues;
}

export function auditTailwind(file: string, source: string): StyleViolation[] {
  const issues: StyleViolation[] = [];
  const ast = postcss.parse(source, { from: file });
  const add = (line: number | undefined, reason: string) =>
    issues.push({ file, line: line ?? 1, reason });
  ast.walkAtRules((rule) => {
    if (
      ![
        "import",
        "source",
        "custom-variant",
        "theme",
        "font-face",
        "layer",
        "media",
        "supports",
        "keyframes",
      ].includes(rule.name)
    )
      add(
        rule.source?.start?.line,
        `Unapproved CSS/Tailwind directive @${rule.name}`,
      );
    if (["apply", "utility"].includes(rule.name))
      add(rule.source?.start?.line, "Custom utility/@apply escape");
    if (
      rule.name === "import" &&
      !/^"tailwindcss(?:\/(?:theme|preflight|utilities)\.css)?"(?:\s|;|$)/.test(
        rule.params,
      )
    )
      add(rule.source?.start?.line, "Unregistered stylesheet import");
  });
  ast.walkRules((rule) => {
    // Only the unmodified upstream reset import may cross this migration boundary.
    if (
      rule.selector === ":where([data-vb-native])" &&
      rule.nodes.every(
        (node) =>
          node.type === "comment" ||
          (node.type === "atrule" &&
            node.name === "import" &&
            node.params === '"tailwindcss/preflight.css" layer(base)'),
      )
    )
      return;
    // Rules in the sole entry may assign tokens, register fonts or define token animations.
    // Component selectors and declarations belong to utility classes in their components.
    if (
      rule.parent?.type === "atrule" &&
      rule.parent.name.endsWith("keyframes")
    )
      return;
    if (
      !rule.selector
        .split(",")
        .every((selector) =>
          /^\s*(?::root(?:\[[^\]]+\]|:not\([^)]*\))*|\.dark)\s*$/.test(
            selector,
          ),
        )
    )
      add(rule.source?.start?.line, "Bespoke component selector");
    rule.walkDecls((declaration) => {
      if (!declaration.prop.startsWith("--"))
        add(declaration.source?.start?.line, "Non-token presentation rule");
    });
  });
  return issues;
}
