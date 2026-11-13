import { decodeHTML } from "entities";
import type { Attachment } from "../../../shared/room";
import type { LinkTarget, RichContext } from "./types";
const protocols = new Set(
  "http: https: ftp: ftps: mailto: tel: callto: sms: cid: xmpp:".split(" "),
);
/** Entity decoding precedes URL normalization; neither raw attributes nor a permissive custom scheme reach the DOM. */
export function safeUrl(value: string, pageUrl: string): string | null {
  const decoded = decodeHTML(value).trim();
  try {
    const url = new URL(decoded, pageUrl);
    return protocols.has(url.protocol) ? decoded : null;
  } catch {
    return null;
  }
}
export function knownFiles(context: RichContext): Attachment[] {
  const files = new Map<string, Attachment>();
  for (const file of context.room.files || []) files.set(file.id, file);
  for (const m of [...context.room.messages, ...(context.room.origins || [])])
    for (const file of m.files || [])
      if (!files.has(file.id)) files.set(file.id, file);
  return [...files.values()];
}
export function fileTarget(
  href: string,
  label: string,
  context: RichContext,
): Extract<LinkTarget, { kind: "file" }> | null {
  const base = new URL(context.pageUrl),
    url = new URL(href, base);
  if (url.origin !== base.origin) return null;
  const match = /^\/api\/books\/([0-9a-f]+)\/files\/([0-9a-f]+)$/.exec(
    url.pathname,
  );
  if (!match || match[1] !== context.room.id) return null;
  const files = knownFiles(context),
    file = files.find((f) => f.id === match[2]);
  const name =
    file?.name || (label && !/^https?:\/\//.test(label) ? label : "arquivo");
  const versions = file
    ? files.filter((f) => f.name === file.name).sort((a, b) => b.ts - a.ts)
    : [];
  return {
    kind: "file",
    href: `${url.pathname}${url.search}${url.hash}`,
    file: { roomId: match[1], id: match[2], name, type: file?.type },
    attachment: file,
    version:
      versions.length > 1
        ? versions.length - versions.findIndex((f) => f.id === match[2])
        : undefined,
  };
}
export function linkTarget(
  value: string,
  label: string,
  context: RichContext,
  localIds: ReadonlyMap<string, string> = new Map(),
): LinkTarget | null {
  const href = safeUrl(value, context.pageUrl);
  if (href === null) return null;
  if (href.startsWith("#") && localIds.has(href.slice(1)))
    return {
      kind: "url",
      href: `#${localIds.get(href.slice(1))}`,
      external: false,
    };
  const message = /^#m(\d+)$/.exec(href);
  if (
    message &&
    Number.isSafeInteger(Number(message[1])) &&
    Number(message[1]) >= 0
  )
    return { kind: "message", id: Number(message[1]), href };
  const epic = /^#e([\w-]+)$/.exec(href);
  if (epic) return { kind: "thread", id: epic[1], href };
  if (/^#doc[\w:-]*$/.test(href))
    return { kind: "document", id: href.split(":")[1], href };
  const file = fileTarget(href, label, context);
  if (file) return file;
  const gh =
    /^https:\/\/github\.com\/([\w.-]+)\/([\w.-]+)(?:\/(pull|issues|commit)\/(\w+))?\/?(?:[?#].*)?$/.exec(
      href,
    );
  if (
    gh &&
    !/^(orgs|settings|features|marketplace|sponsors|apps|topics)$/.test(gh[1])
  ) {
    const display =
      gh[3] === "commit"
        ? `${gh[1]}/${gh[2]}@${gh[4].slice(0, 7)}`
        : gh[3]
          ? `${gh[1]}/${gh[2]} #${gh[4]}`
          : `${gh[1]}/${gh[2]}`;
    return {
      kind: "github",
      href,
      label:
        !label || label === href || /^https?:\/\//.test(label) ? display : "",
    };
  }
  return { kind: "url", href, external: true };
}
export const foldHandle = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9._-]/g, "");
export function mentionTarget(
  handle: string,
  context: RichContext,
): string | null {
  const folded = foldHandle(handle);
  if (folded === "vibe" || folded === "ai") return "ai";
  return (
    context.room.members.find((email) => {
      const local = email.split("@")[0];
      return [
        context.room.names?.[email]?.split(/\s+/)[0] ||
          context.names?.[email]?.split(/\s+/)[0] ||
          "",
        local.split(/[._+-]/)[0],
        local,
      ]
        .map(foldHandle)
        .filter(Boolean)
        .includes(folded);
    }) || null
  );
}
