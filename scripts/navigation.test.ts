import { describe, expect, test } from "bun:test";
import { get } from "svelte/store";
import type { Epic } from "../shared/room";
import {
  archivedEpics,
  epicAncestors,
  epicForest,
  reorderEpics,
  visibleEpics,
} from "../svelte/features/navigation/model";
import {
  createNavigationSession,
  enterNavigationThread,
  toggleNavigationBranch,
  syncNavigationSession,
} from "../svelte/features/navigation/session";

const epic = (
  id: string,
  parent: string | null = null,
  archived = false,
): Epic => ({ id, title: id, tasks: [], parent, archived });
const storage = () => {
  const values = new Map<string, string>();
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => {
      values.set(key, value);
    },
  };
};
const ids = (
  forest: ReturnType<typeof epicForest>,
  closed = new Set<string>(),
) => visibleEpics(forest, closed).map((row) => row.epic.id);

describe("native epic navigation model", () => {
  test("filtered or missing parents remain visible roots; siblings retain canonical order", () => {
    const forest = epicForest([
      epic("child", "parent"),
      epic("leaf", "child"),
      epic("orphan", "absent"),
      epic("self", "self"),
    ]);
    expect(forest.roots.map((row) => row.id)).toEqual([
      "child",
      "orphan",
      "self",
    ]);
    expect(ids(forest)).toEqual(["child", "leaf", "orphan", "self"]);
    expect(epicAncestors(forest, "leaf")).toEqual(["child"]);
    expect(ids(forest, new Set(["child"]))).toEqual([
      "child",
      "orphan",
      "self",
    ]);
  });
  test("cycles, attached descendants and duplicate IDs render every ID exactly once", () => {
    const forest = epicForest([
      epic("a", "b"),
      epic("b", "c"),
      epic("c", "a"),
      epic("child", "a"),
      epic("leaf", "child"),
      epic("a"),
    ]);
    expect(ids(forest)).toEqual(["a", "child", "leaf", "b", "c"]);
    expect(forest.parents.get("a")).toBeNull();
    expect(forest.parents.get("b")).toBeNull();
    expect(forest.parents.get("c")).toBeNull();
    expect(epicAncestors(forest, "leaf")).toEqual(["child", "a"]);
  });
  test("deep imported hierarchies traverse without recursion or lost descendants", () => {
    const records = Array.from({ length: 5000 }, (_, i) =>
      epic(String(i), i ? String(i - 1) : null),
    );
    const forest = epicForest(records);
    const rows = visibleEpics(forest, new Set(), new Set(["4999"]));
    expect(rows).toHaveLength(5000);
    expect(rows.at(-1)?.depth).toBe(4999);
    expect(rows[0].busyBelow).toBe(true);
    expect(rows.at(-1)?.busyBelow).toBe(false);
    expect(ids(forest, new Set(["0"]))).toEqual(["0"]);
  });
  test("busy descendants remain signaled while closed", () => {
    const forest = epicForest([
      epic("root"),
      epic("child", "root"),
      epic("other"),
    ]);
    expect(visibleEpics(forest, new Set(["root"]), new Set(["child"]))).toEqual(
      [
        {
          epic: epic("root"),
          depth: 0,
          hidden: false,
          hasChildren: true,
          busyBelow: true,
        },
        {
          epic: epic("other"),
          depth: 0,
          hidden: false,
          hasChildren: false,
          busyBelow: false,
        },
      ],
    );
  });
  test("hidden descendants keep stable rows and controls without repeated ancestor scans", () => {
    const forest = epicForest([
      epic("root"),
      epic("child", "root"),
      epic("leaf", "child"),
      epic("other"),
    ]);
    expect(
      visibleEpics(forest, new Set(["root"]), new Set(), true).map((row) => [
        row.epic.id,
        row.hidden,
      ]),
    ).toEqual([
      ["root", false],
      ["child", true],
      ["leaf", true],
      ["other", false],
    ]);
  });
  test("archive view orders by last message, then reverse canonical index", () => {
    const records = [
      epic("open"),
      epic("a", null, true),
      epic("b", null, true),
      epic("c", null, true),
    ];
    expect(
      archivedEpics(records, [
        { id: 8, thread: "a", author: "me", ts: 0, text: "activity" },
      ]).map((row) => row.id),
    ).toEqual(["a", "c", "b"]);
  });
  test("reordering changes sibling positions only and preserves all room IDs and parents", () => {
    const records = [
      epic("a"),
      epic("a1", "a"),
      epic("b"),
      epic("b1", "b"),
      epic("a2", "a"),
      epic("arch", null, true),
    ];
    expect(reorderEpics(records, "a2", "a1", false)).toEqual([
      "a",
      "a2",
      "a1",
      "b",
      "b1",
      "arch",
    ]);
    expect(reorderEpics(records, "b", "a", false)).toEqual([
      "b",
      "a",
      "a1",
      "b1",
      "a2",
      "arch",
    ]);
    expect(records.map((row) => row.id)).toEqual([
      "a",
      "a1",
      "b",
      "b1",
      "a2",
      "arch",
    ]);
    expect(reorderEpics(records, "a1", "b1", false)).toBeNull();
    expect(reorderEpics(records, "arch", "a", false)).toBeNull();
    expect(reorderEpics(records, "a", "missing", false)).toBeNull();
    expect(reorderEpics(records, "a", "a", false)).toBeNull();
    expect(
      reorderEpics([epic("a"), epic("a"), epic("b")], "a", "b", true),
    ).toBeNull();
  });
});

describe("room-owned navigation session", () => {
  test("rail-only thread entries reopen ancestors without discarding the room draft", () => {
    const room = {
      id: "room",
      epics: [epic("parent"), epic("child", "parent")],
    };
    const session = syncNavigationSession(null, room, "child");
    session.state.update((state) => ({ ...state, draft: "Rail draft" }));
    toggleNavigationBranch(session, "parent");
    expect([...get(session.state).closed]).toEqual(["parent"]);
    expect(syncNavigationSession(session, room, "main")).toBe(session);
    expect(syncNavigationSession(session, room, "child")).toBe(session);
    expect([...get(session.state).closed]).toEqual([]);
    expect(get(session.state).draft).toBe("Rail draft");
    const other = syncNavigationSession(
      session,
      { id: "other", epics: [] },
      "main",
    );
    expect(other).not.toBe(session);
    expect(get(other.state).draft).toBe("");
  });
  test("returning from an archived thread is a new entry even while the active tab stays selected", () => {
    const session = createNavigationSession("room", false, storage());
    const forest = epicForest([
      epic("a"),
      epic("a-leaf", "a"),
      epic("b", null, true),
      epic("b-leaf", "b", true),
    ]);
    enterNavigationThread(session, forest, "a-leaf");
    toggleNavigationBranch(session, "a");
    enterNavigationThread(session, forest, "b-leaf");
    toggleNavigationBranch(session, "b");
    enterNavigationThread(session, forest, "a-leaf");
    expect([...get(session.state).closed]).toEqual(["b"]);
    enterNavigationThread(session, forest, "a-leaf");
    expect([...get(session.state).closed]).toEqual(["b"]);
  });
  test("entering a filtered archived child reveals its branch when its tab opens", () => {
    const local = storage();
    local.setItem("vb.tree.room", '["parent"]');
    const session = createNavigationSession("room", false, local);
    enterNavigationThread(session, epicForest([epic("open")]), "child");
    expect(get(session.state).openedFor).toBeNull();
    const archived = epicForest([
      epic("parent", null, true),
      epic("child", "parent", true),
    ]);
    enterNavigationThread(session, archived, "child");
    expect([...get(session.state).closed]).toEqual([]);
    toggleNavigationBranch(session, "parent");
    enterNavigationThread(session, archived, "child");
    expect([...get(session.state).closed]).toEqual(["parent"]);
  });
  test("ancestor auto-opening runs once per thread entry, preserving manual collapse and drafts", () => {
    const local = storage();
    local.setItem("vb.tree.room", '["root","child"]');
    const session = createNavigationSession("room", false, local);
    const forest = epicForest([
      epic("root"),
      epic("child", "root"),
      epic("leaf", "child"),
    ]);
    enterNavigationThread(session, forest, "leaf");
    expect([...get(session.state).closed]).toEqual([]);
    session.state.update((state) => ({ ...state, draft: "Retained draft" }));
    toggleNavigationBranch(session, "root");
    let notifications = 0;
    const stop = session.state.subscribe(() => notifications++);
    enterNavigationThread(
      session,
      epicForest([...forest.byId.values()]),
      "leaf",
    );
    expect(notifications).toBe(1);
    expect([...get(session.state).closed]).toEqual(["root"]);
    expect(get(session.state).draft).toBe("Retained draft");
    enterNavigationThread(session, forest, "main");
    enterNavigationThread(session, forest, "leaf");
    expect([...get(session.state).closed]).toEqual([]);
    expect(get(session.state).draft).toBe("Retained draft");
    stop();
  });
  test("closed branches reload per room; another room never receives its draft", () => {
    const local = storage();
    const a = createNavigationSession("a", false, local);
    toggleNavigationBranch(a, "root");
    a.state.update((state) => ({ ...state, draft: "Only in a" }));
    const reload = createNavigationSession("a", false, local);
    const b = createNavigationSession("b", false, local);
    expect([...get(reload.state).closed]).toEqual(["root"]);
    expect(get(reload.state).draft).toBe("");
    expect([...get(b.state).closed]).toEqual([]);
    expect(get(b.state).draft).toBe("");
  });
  test("malformed and unavailable storage cannot break navigation", () => {
    for (const value of ["{bad", '"root"', "null", "{}", '["root",7]']) {
      const local = storage();
      local.setItem("vb.tree.a", value);
      expect([
        ...get(createNavigationSession("a", false, local).state).closed,
      ]).toEqual([]);
    }
    const unavailable = {
      getItem() {
        throw Error("denied");
      },
      setItem() {
        throw Error("denied");
      },
    };
    const session = createNavigationSession("a", false, unavailable);
    toggleNavigationBranch(session, "root");
    expect([...get(session.state).closed]).toEqual(["root"]);
  });
});
