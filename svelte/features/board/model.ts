import type { PanelRoom, Task } from "../../panels";
import { TASK_STATUSES, type TaskStatus } from "../../../shared/room";

const statusLabels = {
  todo: "A fazer",
  doing: "Fazendo",
  review: "Esperando OK",
  done: "Feito",
} satisfies Record<TaskStatus, string>;
export const lanes = TASK_STATUSES.map((value) => ({
  value,
  label: statusLabels[value],
}));
export type BoardMode = "board" | "list";
export type BoardTask = Task & { epicId: string; epicTitle: string };
export type BoardGroup = { id: string; title: string; tasks: BoardTask[] };
export type AddTarget = { id: string; title: string };

export function boardModel(room: PanelRoom, thread: string) {
  const scope = thread === "main" || thread.startsWith("pre:") ? null : thread;
  const selected = scope ? room.epics.find((epic) => epic.id === scope) : null;
  const epics = scope
    ? selected
      ? [selected]
      : []
    : room.epics.filter((epic) => !epic.archived);
  const groups: BoardGroup[] = [
    ...(!scope
      ? [
          {
            id: "main",
            title: room.book?.title || "vibebook",
            tasks: room.roomTasks ?? [],
          },
        ]
      : []),
    ...epics,
  ].map((group) => ({
    id: group.id,
    title: group.title,
    tasks: group.tasks.map((task) => ({
      ...task,
      epicId: group.id,
      epicTitle: group.title,
    })),
  }));
  return {
    scope,
    missingScope: Boolean(scope && !selected),
    title: selected?.title ?? null,
    groups,
    tasks: groups.flatMap((group) => group.tasks),
    targets: groups.map(({ id, title }) => ({ id, title })),
  };
}

export function readBoardMode(): BoardMode {
  try {
    return localStorage.getItem("vb.boardMode") === "list" ? "list" : "board";
  } catch {
    return "board";
  }
}

export function adjacentStatus(
  status: TaskStatus,
  direction: -1 | 1,
): TaskStatus | undefined {
  return lanes[lanes.findIndex((lane) => lane.value === status) + direction]
    ?.value;
}

export function isTaskStatus(value: string): value is TaskStatus {
  return lanes.some((lane) => lane.value === value);
}
