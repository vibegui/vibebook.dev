import type { TaskStatus } from "./room";

/** Commands accepted by Book.webSocketMessage. Authentication remains server-side. */
export type RoomCommand =
  | {
      t: "msg";
      thread: string;
      text?: string;
      files?: string[];
      reply_to?: number | null;
    }
  | { t: "files.get" }
  | { t: "doc.get"; epic?: string | null }
  | { t: "doc"; text: string; epic?: string | null }
  | { t: "title"; title: string }
  | { t: "epic"; title: string }
  | { t: "epic.owner"; id: string; owner: string }
  | { t: "task.add"; epic: string; title: string }
  | { t: "older"; thread: string; before?: number }
  | { t: "pin.add"; kind: "link" | "file" | "app"; ref: string; title?: string }
  | { t: "pin.del"; id: string }
  | { t: "reminder.delete"; id: string }
  | { t: "ack.dismiss"; id: number }
  | { t: "reminder.enable"; id: string; on: boolean }
  | { t: "task.toggle"; id: string }
  | { t: "task.status"; id: string; status: TaskStatus }
  | { t: "task.rename"; id: string; title: string }
  | { t: "task.del"; id: string }
  | { t: "task.assign"; id: string; owner?: string; due?: string }
  | { t: "decision.del"; id: number }
  | { t: "epic.rename"; id: string; title: string }
  | { t: "epic.del"; id: string }
  | { t: "epic.archive"; id: string; archived?: boolean }
  | { t: "epic.order"; ids: string[] }
  | {
      t: "poll.create";
      thread: string;
      question: string;
      options: string[];
      multi: boolean;
    }
  | { t: "vote"; id: string; opt: number }
  | { t: "poll.close"; id: string }
  | { t: "suggestion"; i: number; accept?: boolean };

export type SendRoomCommand = (command: RoomCommand) => boolean;
