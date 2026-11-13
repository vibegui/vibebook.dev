import { visibleChatMessages } from "../chat/privacy";
import type { Tool, CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { Room } from "../../../shared/room";
import type { Connection } from "../../../shared/schemas";
import type { RequestRoomCommand } from "../../roomConnection";
export const roomTools: Tool[] = [
  {
    name: "vibebook_read",
    description:
      "The room: title, doc, epics with tasks, members and the newest messages of a thread (default main).",
    inputSchema: {
      type: "object",
      properties: { thread: { type: "string" }, limit: { type: "number" } },
    },
    annotations: { readOnlyHint: true },
  },
  {
    name: "vibebook_post",
    description:
      "Post a message as the person looking at the app (they confirm first).",
    inputSchema: {
      type: "object",
      properties: { text: { type: "string" }, thread: { type: "string" } },
      required: ["text"],
    },
  },
  {
    name: "vibebook_add_task",
    description:
      "Add a task to an epic (epic_id) or to the room (main); the person confirms.",
    inputSchema: {
      type: "object",
      properties: { title: { type: "string" }, epic_id: { type: "string" } },
      required: ["title"],
    },
  },
  {
    name: "vibebook_task_status",
    description:
      "Move a task: todo | doing | review | done; the person confirms.",
    inputSchema: {
      type: "object",
      properties: {
        task_id: { type: "string" },
        status: { type: "string", enum: ["todo", "doing", "review", "done"] },
      },
      required: ["task_id", "status"],
    },
  },
  {
    name: "vibebook_connections",
    description:
      "The room's MCP connections this person can use, with their tools.",
    inputSchema: { type: "object" },
    annotations: { readOnlyHint: true },
  },
  {
    name: "vibebook_call_connection",
    description:
      "Call a tool of one of the room's MCP connections; tools that aren't read-only ask the person first.",
    inputSchema: {
      type: "object",
      properties: {
        connection_id: { type: "string" },
        tool: { type: "string" },
        arguments: { type: "object" },
      },
      required: ["connection_id", "tool"],
    },
  },
  {
    name: "vibebook_ai_spend",
    description:
      "vibebook's model spend: Jev and the LLMs by event and model, the hub router, the last 30 days and OpenRouter's total for the key. Only in vibebook's report rooms.",
    inputSchema: { type: "object", properties: {} },
    annotations: { readOnlyHint: true },
  },
  {
    name: "vibebook_router_stats",
    description:
      "The hub router A/B (Jev vs Haiku): per arm how many messages were ignored, answered or woke a Claude, latency p50/p95, cost, and the last 40 decisions (who = whose router). room: true = this room, every member's router; false = the person's own router in all rooms.",
    inputSchema: { type: "object", properties: { room: { type: "boolean" } } },
    annotations: { readOnlyHint: true },
  },
];
export type AppAsk = (what: string, detail: string) => Promise<boolean>;
export function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
export function toolOutput(value: unknown): CallToolResult {
  return {
    content: [
      {
        type: "text",
        text: typeof value === "string" ? value : (JSON.stringify(value) ?? ""),
      },
    ],
    ...(isRecord(value) ? { structuredContent: value } : {}),
  };
}
export const toolError = (text: string): CallToolResult => ({
  isError: true,
  content: [{ type: "text", text }],
});
export function roomRead(
  room: Room,
  args: Record<string, unknown>,
  name: (email: string) => string,
) {
  const thread = typeof args.thread === "string" ? args.thread : "main",
    limit = Math.min(Math.max(Number(args.limit) || 50, 1), 100);
  return {
    room: { id: room.id, title: room.book.title },
    me: { email: room.me, name: name(room.me) },
    members: room.members.map((email) => ({ email, name: name(email) })),
    doc: room.doc || "",
    epics: room.epics
      .filter((epic) => !epic.archived)
      .map((epic) => ({
        id: epic.id,
        title: epic.title,
        tasks: epic.tasks.map((task) => ({
          id: task.id,
          title: task.title,
          status: task.status,
          owner: task.owner || null,
        })),
      })),
    room_tasks: (room.roomTasks || []).map((task) => ({
      id: task.id,
      title: task.title,
      status: task.status,
    })),
    messages: visibleChatMessages(room, thread)
      .slice(-limit)
      .map((message) => ({
        id: message.id,
        from: message.author === "ai" ? "@vibe" : name(message.author),
        agent: message.kind === "agent",
        text: message.text,
        at: new Date(message.ts).toISOString(),
      })),
  };
}
export function createRoomAppTools(options: {
  room(): Room | null;
  current(): boolean;
  request: RequestRoomCommand;
  name(email: string): string;
  ask: AppAsk;
  connections(): Promise<Connection[]>;
  call(cid: string, tool: string, args: unknown): Promise<CallToolResult>;
  metric(kind: "spend" | "router", roomOnly: boolean): Promise<unknown>;
  t(text: string, vars?: Record<string, string | number>): string;
}) {
  const t = options.t;
  const current = () => {
    const room = options.room();
    return options.current() && !!room?.members.includes(room.me);
  };
  const ask = async (what: string, detail: string) =>
    current() && (await options.ask(what, detail)) && current();
  return async (name: string, raw: unknown): Promise<CallToolResult> => {
    if (!current()) return toolError("App is no longer active");
    const room = options.room();
    if (!room) return toolError("Room unavailable");
    const args = isRecord(raw) ? raw : {};
    const thread = (value: unknown) =>
      typeof value === "string" && value !== "main"
        ? room.epics.some((epic) => epic.id === value)
          ? value
          : null
        : "main";
    switch (name) {
      case "vibebook_read":
        return toolOutput(roomRead(room, args, options.name));
      case "vibebook_ai_spend":
      case "vibebook_router_stats": {
        const value = await options.metric(
          name === "vibebook_ai_spend" ? "spend" : "router",
          !!args.room,
        );
        return current()
          ? toolOutput(value)
          : toolError("App is no longer active");
      }
      case "vibebook_connections": {
        const connections = await options.connections();
        return current()
          ? toolOutput(
              connections.map((connection) => ({
                id: connection.id,
                title: connection.title,
                scope: connection.scope,
                tools: connection.tools,
              })),
            )
          : toolError("App is no longer active");
      }
      case "vibebook_post": {
        const target = thread(args.thread),
          text = String(args.text || "")
            .trim()
            .slice(0, 4000);
        if (!target || !text)
          return toolError(
            "text and a valid thread (main or an epic id) needed",
          );
        if (!(await ask(t("postar"), text)))
          return toolError("the person cancelled");
        if (
          target !== "main" &&
          !options.room()?.epics.some((epic) => epic.id === target)
        )
          return toolError("no such epic");
        const result = await options.request({
          t: "msg",
          thread: target,
          text,
          files: [],
        });
        return current() && result.ok
          ? toolOutput("posted")
          : toolError(
              result.ok
                ? "App is no longer active"
                : result.error || "Post unconfirmed",
            );
      }
      case "vibebook_add_task": {
        const target = thread(args.epic_id),
          epic = room.epics.find((epic) => epic.id === target),
          title = String(args.title || "")
            .trim()
            .slice(0, 200);
        if (!target) return toolError("no such epic");
        if (
          !title ||
          !(await ask(
            t("criar uma tarefa"),
            `${epic ? epic.title : t("sala principal")}: ${title}`,
          ))
        )
          return toolError("cancelled");
        if (
          target !== "main" &&
          !options.room()?.epics.some((epic) => epic.id === target)
        )
          return toolError("no such epic");
        const before = new Set(
          [
            ...(options.room()?.epics.flatMap((epic) => epic.tasks) || []),
            ...(options.room()?.roomTasks || []),
          ].map((task) => task.id),
        );
        const result = await options.request({
          t: "task.add",
          epic: target,
          title,
        });
        if (!current() || !result.ok)
          return toolError(
            result.ok
              ? "App is no longer active"
              : result.error || "Task unconfirmed",
          );
        const latest = options.room(),
          tasks =
            target === "main"
              ? latest?.roomTasks
              : latest?.epics.find((epic) => epic.id === target)?.tasks;
        return tasks?.some(
          (task) => !before.has(task.id) && task.title === title,
        )
          ? toolOutput("added")
          : toolError(
              "Task creation unconfirmed. Check the room before trying again.",
            );
      }
      case "vibebook_task_status": {
        const task = [
            ...room.epics.flatMap((epic) => epic.tasks),
            ...(room.roomTasks || []),
          ].find((task) => task.id === args.task_id),
          status = args.status;
        if (
          !task ||
          (status !== "todo" &&
            status !== "doing" &&
            status !== "review" &&
            status !== "done")
        )
          return toolError("no such task or bad status");
        if (!(await ask(t("mover uma tarefa"), `${task.title} → ${status}`)))
          return toolError("cancelled");
        if (
          !options
            .room()
            ?.epics.flatMap((epic) => epic.tasks)
            .concat(options.room()?.roomTasks || [])
            .some((current) => current.id === task.id)
        )
          return toolError("no such task");
        const result = await options.request({
          t: "task.status",
          id: task.id,
          status,
        });
        if (!current() || !result.ok)
          return toolError(
            result.ok
              ? "App is no longer active"
              : result.error || "Task change unconfirmed",
          );
        const latest = options.room(),
          canonical = [
            ...(latest?.epics.flatMap((epic) => epic.tasks) || []),
            ...(latest?.roomTasks || []),
          ].find((item) => item.id === task.id);
        return canonical?.status === status
          ? toolOutput("moved")
          : toolError(
              "Task change unconfirmed. Check the room before trying again.",
            );
      }
      case "vibebook_call_connection": {
        const connections = await options.connections();
        if (!current()) return toolError("App is no longer active");
        const connection = connections.find(
            (connection) => connection.id === args.connection_id,
          ),
          tool = connection?.tools.find((tool) => tool.name === args.tool);
        if (!connection || !tool)
          return toolError("no such connection/tool for this person");
        if (
          !(await ask(
            t("usar {tool} em {conn}", {
              tool: tool.name,
              conn: connection.title,
            }),
            JSON.stringify(args.arguments || {}),
          ))
        )
          return toolError("cancelled");
        const latest = await options.connections();
        if (
          !current() ||
          !latest.some(
            (item) =>
              item.id === connection.id &&
              item.tools.some((item) => item.name === tool.name),
          )
        )
          return toolError("connection/tool unavailable");
        const result = await options.call(
          connection.id,
          tool.name,
          args.arguments || {},
        );
        return current() ? result : toolError("App is no longer active");
      }
      default:
        return toolError(`unknown tool ${name}`);
    }
  };
}
