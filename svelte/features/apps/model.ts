import type { Room, Attachment } from "../../../shared/room";
import type { Connection } from "../../../shared/schemas";
export type AppTarget = { connection: string; tool: string };
export type RoomApp = { tool: string; title: string; file: Attachment };
export function roomApps(room: Room): RoomApp[] {
  const seen = new Set<string>();
  return (room.files || [])
    .filter(
      (file) =>
        file.type === "text/html" &&
        /^apps\/[\w.-]+\.html$/i.test(file.name) &&
        !seen.has(file.name) &&
        !!seen.add(file.name),
    )
    .map((file) => ({
      tool: file.name.slice(5, -5),
      title: file.name.slice(5, -5),
      file,
    }));
}
export function appIdentity(
  room: Room,
  connections: readonly Connection[],
  target: AppTarget,
): string | null {
  if (target.connection === "room") {
    const app = roomApps(room).find((app) => app.tool === target.tool);
    return app
      ? JSON.stringify([
          room.id,
          room.me,
          "room",
          app.tool,
          app.file.id,
          app.file.ts,
        ])
      : null;
  }
  const connection = connections.find(
    (connection) => connection.id === target.connection,
  );
  const app = connection?.apps.find((app) => app.tool === target.tool);
  return app && connection
    ? JSON.stringify([
        room.id,
        room.me,
        connection.id,
        app.tool,
        connection.auth,
        connection.signed_in,
      ])
    : null;
}
export function signinUrl(roomId: string, connectionId: string) {
  return `/api/books/${encodeURIComponent(roomId)}/connections/${encodeURIComponent(connectionId)}/signin?ui=svelte`;
}
export function safeOpenLink(raw: string): string | null {
  try {
    const url = new URL(raw);
    return ["http:", "https:"].includes(url.protocol) &&
      !url.username &&
      !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}

export function connectionApps(connection: Connection) {
  const seen = new Set<string>();
  return connection.apps.filter(
    (app) => !seen.has(app.tool) && !!seen.add(app.tool),
  );
}
