import { parseRichSource, projectRichSource } from "./project";
import { knownFileFingerprint } from "./links";
import type { RichContext, RichMode, RichNode } from "./types";
/** Values used by mention recognition, immutable file targets/version ordering and local IDs.
 * Presence/receipts/message text do not change this key. No global/account text cache exists. */
function contextKey(context: RichContext, files: string): string {
  return JSON.stringify([
    context.policy,
    context.room.id,
    context.room.me,
    context.pageUrl,
    context.idPrefix,
    context.fileLabel,
    context.room.members.map((email) => [
      email,
      context.room.names?.[email],
      context.names?.[email],
    ]),
    files,
  ]);
}
/** One syntax tree and one projection per mounted content component; disposal releases both. */
export function createRichSession() {
  let active = true,
    previousText: string | undefined,
    previousMode: RichMode | undefined,
    previousPolicy: RichContext["policy"],
    previousContext: string | undefined;
  let previousParts: readonly unknown[] | undefined;
  let parsed: ReturnType<typeof parseRichSource> | undefined,
    nodes: RichNode[] | undefined;
  return {
    render(text: string, mode: RichMode, context: RichContext): RichNode[] {
      if (!active) return [{ kind: "text", text }];
      const changed =
        text !== previousText ||
        mode !== previousMode ||
        context.policy !== previousPolicy;
      if (changed) {
        parsed = parseRichSource(text, mode, context.policy);
        previousPolicy = context.policy;
        previousText = text;
        previousMode = mode;
      }
      const parts = [
        // Validate the current scope even if all incoming props stayed identical.
        context.fileIndex?.read(context.room)?.fingerprint,
        context.fileIndex,
        context.policy,
        context.room.id,
        context.room.me,
        context.room.members,
        context.room.names,
        context.names,
        context.room.files,
        context.room.messages,
        context.room.origins,
        context.pageUrl,
        context.idPrefix,
        context.fileLabel,
      ];
      // Room reducer snapshots retain unchanged arrays/maps: receipt/presence updates avoid even fingerprint scans.
      const key =
        previousParts &&
        parts.every((part, index) => part === previousParts![index])
          ? previousContext!
          : contextKey(context, knownFileFingerprint(context));
      previousParts = parts;
      if (changed || !nodes || key !== previousContext) {
        nodes = projectRichSource(parsed!, context);
        previousContext = key;
      }
      return nodes;
    },
    dispose() {
      active = false;
      previousText = undefined;
      previousMode = undefined;
      previousPolicy = undefined;
      previousContext = undefined;
      previousParts = undefined;
      parsed = undefined;
      nodes = undefined;
    },
  };
}
