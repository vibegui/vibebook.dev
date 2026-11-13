import {
  FILE_TYPES as UPLOAD_FILE_TYPES,
  maxBytes,
} from "../../../shared/composition";
import { EMOJI } from "../../../shared/emoji";
import type { Attachment, Message, Room } from "../../../shared/room";
import type { ComposerAgent } from "./types";
export const AUDIO_EXT: Readonly<Record<string, string>> = {
  m4a: "audio/x-m4a",
  mp3: "audio/mpeg",
  wav: "audio/wav",
  aac: "audio/aac",
  ogg: "audio/ogg",
  oga: "audio/ogg",
  opus: "audio/ogg",
  webm: "audio/webm",
  flac: "audio/flac",
};
export const FILE_TYPES = new Set(UPLOAD_FILE_TYPES);
export const FILE_ACCEPT =
  "image/png,image/jpeg,image/webp,image/gif,application/pdf,text/html,.html,.htm,text/markdown,.md,text/plain,.txt,text/csv,.csv,audio/*,.m4a,.mp3,.wav,.aac,.ogg,.opus,.webm,.flac";
export const mediaType = (value: string) =>
  value.split(";")[0].trim().toLowerCase();
export function normalizeFile(input: File, now = Date.now()): File {
  let file = input;
  const extension = (/\.(\w+)$/.exec(file.name)?.[1] || "").toLowerCase();
  let type = mediaType(file.type);
  if (!type && /\.html?$/i.test(file.name)) type = "text/html";
  if (!type && extension === "md") type = "text/markdown";
  if (extension === "txt") type = "text/plain";
  if (extension === "csv") type = "text/csv";
  if (AUDIO_EXT[extension] && !type.startsWith("audio/"))
    type = AUDIO_EXT[extension];
  const name =
    !file.name || file.name === "image.png"
      ? `print-${new Date(now).toISOString().slice(0, 16).replace(/[:T]/g, "-")}.png`
      : file.name;
  if (type !== file.type || name !== file.name)
    // A Blob part avoids older Bun retaining the original File's name.
    file = new File([file.slice()], name, { type });
  return file;
}
export const fileIssue = (file: File) =>
  !FILE_TYPES.has(mediaType(file.type))
    ? "type"
    : file.size > maxBytes(mediaType(file.type))
      ? "size"
      : file.size === 0
        ? "empty"
        : null;
export const fold = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9._-]/g, "");
export function mentionPicks(
  text: string,
  caret: number,
  room: Room,
  names: Readonly<Record<string, string>> = {},
  agents: readonly ComposerAgent[] = [],
) {
  const before = text.slice(0, caret),
    match = /(^|\s)@([\p{L}\p{N}._-]*)$/u.exec(before);
  if (!match) return null;
  const query = fold(match[2]);
  const people = room.members
    .filter((email) => email !== room.me)
    .map((email) => {
      const local = email.split("@")[0],
        name = room.names?.[email] || names[email] || local;
      const handle =
        fold((room.names?.[email] || names[email] || "").split(/\s+/)[0]) ||
        fold(local.split(/[._+-]/)[0]) ||
        fold(local);
      return { email, handle, label: name === handle ? email : name };
    });
  for (const agent of agents)
    if (
      agent.email === room.me &&
      typeof agent.name === "string" &&
      agent.name.trim()
    )
      people.push({
        email: agent.email,
        handle: agent.name,
        label: "seu agent no sandbox",
      });
  return {
    start: before.length - match[2].length - 1,
    items: people
      .filter(
        (person) =>
          !query ||
          person.handle.startsWith(query) ||
          fold(person.label).includes(query),
      )
      .slice(0, 8),
  };
}
export function insertAt(
  text: string,
  start: number,
  end: number,
  value: string,
) {
  return {
    text: text.slice(0, start) + value + text.slice(end),
    caret: start + value.length,
  };
}
export function emojiPicks(query: string) {
  const needle = query.trim().toLowerCase().replace(/:/g, "");
  return [
    ...new Map(
      Object.entries(EMOJI).map(([name, value]) => [value, name]),
    ).entries(),
  ]
    .filter(
      ([emoji]) =>
        !needle ||
        Object.entries(EMOJI).some(
          ([name, value]) => value === emoji && name.includes(needle),
        ),
    )
    .map(([emoji, name]) => ({ emoji, name }));
}
export const quoteSnippet = (message: Message) =>
  (
    message.text ||
    message.files?.map((file) => file.name).join(", ") ||
    (message.poll ? "votação" : "")
  )
    .replace(/\*\*|`|^[#>]+ ?/gm, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
export type MessageSnapshot = {
  text: string;
  fileIds: string[];
  replyId?: number;
  baseline: number;
  revision: number;
};
export function matchingMessage(
  room: Room,
  thread: string,
  snapshot: MessageSnapshot,
): Message | undefined {
  const files = snapshot.fileIds.slice().sort().join(",");
  return room.messages.find(
    (message) =>
      message.id > snapshot.baseline &&
      message.author === room.me &&
      message.kind !== "agent" &&
      message.thread === thread &&
      message.text === snapshot.text &&
      (message.reply_to || undefined) === snapshot.replyId &&
      (message.files || [])
        .map((file) => file.id)
        .sort()
        .join(",") === files,
  );
}
export const maxMessageId = (room: Room) =>
  [room.messages, room.origins || []].reduce(
    (max, rows) =>
      rows.reduce((value, message) => Math.max(value, message.id), max),
    0,
  );
export type PendingAttachment = {
  id: number;
  name: string;
  type: string;
  size: number;
  file?: File;
  meta?: Attachment;
  phase: "queued" | "uploading" | "ready" | "error";
  error?: string;
};
export function composerError(
  error: string,
  t: (text: string, vars?: Record<string, string | number>) => string,
): string {
  if (error === "timeout")
    return t(
      "O upload não foi confirmado. Confira os arquivos antes de tentar novamente.",
    );
  if (error === "account-changed")
    return t("A conta mudou; selecione o arquivo novamente.");
  if (error === "forbidden") return t("Você não tem acesso a esta sala.");
  if (error === "offline") return t("Sem conexão. Seu rascunho foi mantido.");
  if (error === "text-limit")
    return t("A mensagem pode ter no máximo 4000 caracteres.");
  if (error === "attachments-limit")
    return t("Anexe no máximo 10 arquivos por mensagem.");
  if (error === "attachments-pending")
    return t("Espere os anexos terminarem ou remova-os.");
  if (error === "reply-missing")
    return t(
      "A mensagem não está mais disponível. Cancele a resposta para continuar.",
    );
  if (error === "draft-limit")
    return t(
      "Envie ou descarte um dos seus 64 rascunhos antes de abrir outro.",
    );
  if (error === "unknown thread")
    return t("O tópico não está mais disponível. Seu rascunho foi mantido.");
  if (error.startsWith("blocked:"))
    return t(
      "Não enviei: parece {reason}. Segredo não entra na sala, nem pra você nem pros agents. Manda por um canal seguro.",
      { reason: error.slice(8).trim() },
    );
  if (error.startsWith("file-type:"))
    return `${error.slice(11).trim()}: ${t("só imagens (png, jpg, webp, gif), PDF, HTML, Markdown, .txt, .csv e áudio.")}`;
  if (error.startsWith("file-size:"))
    return `${error.slice(10).trim()}: ${t("Arquivo maior que o limite: 10MB, ou 50MB para áudio.")}`;
  if (error.startsWith("file-empty:"))
    return `${error.slice(11).trim()}: ${t("Arquivo vazio.")}`;
  return error;
}
