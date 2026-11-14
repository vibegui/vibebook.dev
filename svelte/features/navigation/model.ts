import type { Epic, Message } from "../../../shared/room";
/** Keep a directly opened archived epic in its original tree position. */
export const activeEpics = (epics: readonly Epic[], thread: string) =>
  epics.filter((epic) => !epic.archived || epic.id === thread);

export type EpicForest = {
  roots: Epic[];
  byId: Map<string, Epic>;
  parents: Map<string, string | null>;
  children: Map<string, Epic[]>;
};

/** Normalize a filtered list without losing orphaned or cyclic records. */
export function epicForest(epics: readonly Epic[]): EpicForest {
  const byId = new Map<string, Epic>();
  for (const epic of epics) if (!byId.has(epic.id)) byId.set(epic.id, epic);
  const parents = new Map<string, string | null>();
  for (const epic of byId.values())
    parents.set(
      epic.id,
      epic.parent && epic.parent !== epic.id && byId.has(epic.parent)
        ? epic.parent
        : null,
    );
  // Iterative cycle detection also handles arbitrarily deep imported hierarchies.
  const settled = new Set<string>();
  for (const start of byId.keys()) {
    const path: string[] = [];
    const position = new Map<string, number>();
    let current: string | null = start;
    while (current && !settled.has(current)) {
      const cycle = position.get(current);
      if (cycle !== undefined) {
        for (const id of path.slice(cycle)) parents.set(id, null);
        break;
      }
      position.set(current, path.length);
      path.push(current);
      current = parents.get(current) ?? null;
    }
    for (const id of path) settled.add(id);
  }
  const roots: Epic[] = [];
  const children = new Map<string, Epic[]>();
  for (const epic of byId.values()) {
    const parent = parents.get(epic.id);
    if (!parent) roots.push(epic);
    else {
      const siblings = children.get(parent) ?? [];
      siblings.push(epic);
      children.set(parent, siblings);
    }
  }
  return { roots, byId, parents, children };
}

export function epicAncestors(forest: EpicForest, id: string) {
  const ancestors: string[] = [];
  let parent = forest.parents.get(id);
  while (parent) {
    ancestors.push(parent);
    parent = forest.parents.get(parent);
  }
  return ancestors;
}

export function visibleEpics(
  forest: EpicForest,
  closed: ReadonlySet<string>,
  busy: ReadonlySet<string> = new Set(),
  includeHidden = false,
) {
  const busyAncestors = new Set<string>();
  for (const id of busy) {
    let parent = forest.parents.get(id);
    while (parent && !busyAncestors.has(parent)) {
      busyAncestors.add(parent);
      parent = forest.parents.get(parent);
    }
  }
  const rows: {
    epic: Epic;
    depth: number;
    hidden: boolean;
    hasChildren: boolean;
    busyBelow: boolean;
  }[] = [];
  const stack = forest.roots
    .map((epic) => ({ epic, depth: 0, hidden: false }))
    .reverse();
  while (stack.length) {
    const row = stack.pop()!;
    const children = forest.children.get(row.epic.id) ?? [];
    rows.push({
      ...row,
      hasChildren: children.length > 0,
      busyBelow: busyAncestors.has(row.epic.id),
    });
    if (includeHidden || !closed.has(row.epic.id))
      for (let i = children.length - 1; i >= 0; i--)
        stack.push({
          epic: children[i],
          depth: row.depth + 1,
          hidden: row.hidden || closed.has(row.epic.id),
        });
  }
  return rows;
}

export function archivedEpics(
  epics: readonly Epic[],
  messages: readonly Message[],
) {
  const last = new Map<string, number>();
  for (const message of messages)
    last.set(
      message.thread,
      Math.max(last.get(message.thread) ?? 0, message.id),
    );
  return epics
    .filter((epic) => epic.archived)
    .map((epic, index) => ({ epic, index }))
    .sort(
      (a, b) =>
        (last.get(b.epic.id) ?? 0) - (last.get(a.epic.id) ?? 0) ||
        b.index - a.index,
    )
    .map(({ epic }) => epic);
}

/** Order siblings only; epic.order cannot change an epic's parent. */
export function reorderEpics(
  epics: readonly Epic[],
  from: string,
  to: string,
  after: boolean,
): string[] | null {
  if (from === to) return null;
  if (new Set(epics.map((epic) => epic.id)).size !== epics.length) return null;
  const active = epics.filter((epic) => !epic.archived);
  const forest = epicForest(active);
  if (
    !forest.byId.has(from) ||
    !forest.byId.has(to) ||
    forest.parents.get(from) !== forest.parents.get(to)
  )
    return null;
  const ids = epics.map((epic) => epic.id).filter((id) => id !== from);
  ids.splice(ids.indexOf(to) + (after ? 1 : 0), 0, from);
  return ids.every((id, index) => id === epics[index]?.id) ? null : ids;
}
