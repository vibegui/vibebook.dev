import ts from "typescript";
import { parse } from "svelte/compiler";

const portuguese =
  /[ãõçáéíóúâêôà]|\b(você|voce|não|sala|salas|épico|tarefa|tarefas|esperando|apagar|enviar|enviando|cancelar|arquivar|entrar|sair|novo|nova|pessoas|amigos|mensagem|clique|aqui|ainda|seu|sua|seus|nada|pra|para|com|está|agora|ouvindo|conectar|copiar|remover|abrir|fechar|votação|lembrete|decisões|arquivos)\b/i;
const sourceFile = (source: string, filename: string) =>
  ts.createSourceFile(
    filename,
    source,
    ts.ScriptTarget.Latest,
    true,
    filename.endsWith(".js") ? ts.ScriptKind.JS : ts.ScriptKind.TS,
  );
const translationCall = (node: ts.Node): node is ts.CallExpression =>
  ts.isCallExpression(node) &&
  ((ts.isIdentifier(node.expression) && node.expression.text === "t") ||
    (ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === "t"));
function record(value: unknown): Record<string, unknown> | undefined {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}

/** Inspect syntax, so formatting and translated examples in strings cannot change coverage. */
export function translationKeys(source: string, filename: string): string[] {
  const keys = new Set<string>();
  if (!filename.endsWith(".svelte")) {
    const visit = (node: ts.Node) => {
      if (translationCall(node)) {
        const argument = node.arguments[0];
        if (
          argument &&
          (ts.isStringLiteral(argument) ||
            ts.isNoSubstitutionTemplateLiteral(argument))
        )
          keys.add(argument.text);
      }
      ts.forEachChild(node, visit);
    };
    visit(sourceFile(source, filename));
  } else {
    const visit = (value: unknown): void => {
      if (Array.isArray(value)) {
        for (const child of value) visit(child);
        return;
      }
      const node = record(value);
      if (!node) return;
      const callee = record(node.callee),
        property = record(callee?.property);
      if (
        node.type === "CallExpression" &&
        ((callee?.type === "Identifier" && callee.name === "t") ||
          (callee?.type === "MemberExpression" &&
            !callee.computed &&
            property?.name === "t"))
      ) {
        const argument = record(
          Array.isArray(node.arguments) ? node.arguments[0] : undefined,
        );
        if (argument?.type === "Literal" && typeof argument.value === "string")
          keys.add(argument.value);
        if (
          argument?.type === "TemplateLiteral" &&
          Array.isArray(argument.expressions) &&
          argument.expressions.length === 0 &&
          Array.isArray(argument.quasis)
        ) {
          const literal = record(record(argument.quasis[0])?.value);
          if (typeof literal?.cooked === "string") keys.add(literal.cooked);
        }
      }
      for (const child of Object.values(node)) visit(child);
    };
    visit(parse(source, { modern: true }));
  }
  return [...keys];
}

export function inspectLegacyTranslations(source: string) {
  const file = sourceFile(source, "host.js"),
    translations = new Map<string, string>();
  const leftovers: { line: number; text: string }[] = [];
  let dictionary = false;
  const intentional = (node: ts.Node): boolean => {
    for (
      let parent: ts.Node | undefined = node;
      parent;
      parent = parent.parent
    ) {
      if (
        ts.isVariableDeclaration(parent) &&
        ts.isIdentifier(parent.name) &&
        ["EN", "STOP", "FILE_KINDS"].includes(parent.name.text)
      )
        return true;
      if (
        translationCall(parent) &&
        parent.arguments[0] &&
        node.pos >= parent.arguments[0].pos &&
        node.end <= parent.arguments[0].end
      )
        return true;
      if (
        ts.isTemplateExpression(parent) &&
        parent.getText(file).includes("**Objetivo:** o que este épico entrega")
      )
        return true;
      if (
        ts.isBinaryExpression(parent) &&
        (parent
          .getText(file)
          .includes('textContent.trim().toLowerCase() === "tarefas"') ||
          parent.getText(file).includes('=== "[[tarefas]]"'))
      )
        return true;
    }
    return false;
  };
  const visit = (node: ts.Node) => {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.name.text === "EN"
    ) {
      if (!node.initializer || !ts.isObjectLiteralExpression(node.initializer))
        throw new Error("EN must be an object literal");
      dictionary = true;
      for (const property of node.initializer.properties) {
        if (
          !ts.isPropertyAssignment(property) ||
          !(
            ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)
          ) ||
          !(
            ts.isStringLiteral(property.initializer) ||
            ts.isNoSubstitutionTemplateLiteral(property.initializer)
          )
        )
          throw new Error("EN entries must be static string translations");
        translations.set(property.name.text, property.initializer.text);
      }
    }
    if (
      (ts.isStringLiteral(node) ||
        ts.isNoSubstitutionTemplateLiteral(node) ||
        ts.isTemplateHead(node) ||
        ts.isTemplateMiddle(node) ||
        ts.isTemplateTail(node)) &&
      !intentional(node)
    ) {
      if (portuguese.test(node.text.replace(/https?:\/\/[^\s"'<>]+/g, "")))
        leftovers.push({
          line:
            file.getLineAndCharacterOfPosition(node.getStart(file)).line + 1,
          text: node.text.slice(0, 160),
        });
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  if (!dictionary) throw new Error("Missing EN translation dictionary");
  return {
    translations: Object.fromEntries(translations),
    keys: translationKeys(source, "host.js"),
    leftovers,
  };
}
