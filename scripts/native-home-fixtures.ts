import type { HomeApi } from "../svelte/features/home/api";
import type { MeResult, RouteResult } from "../shared/schemas";
import type { AuthClock } from "../svelte/features/auth/owner";
export const room = (
  id = "aaaaaa",
  extra: Partial<MeResult["books"][number]> = {},
): MeResult["books"][number] => ({
  id,
  title: "Room " + id,
  folder: null,
  summary: null,
  updated_at: 100,
  created_at: 10,
  icon: null,
  busy_until: null,
  position: null,
  tint: null,
  opened_at: null,
  last_human_id: 0,
  last_agent_id: 0,
  read_id: 0,
  sandboxes_running: 0,
  members: "me@test.com",
  ...extra,
});
export const me = (extra: Partial<MeResult> = {}): MeResult => ({
  email: "me@test.com",
  name: "Me",
  avatar: null,
  books: [room()],
  friends: [],
  waits: [],
  v: "0123456789abcdefabcd",
  ...extra,
});
export const suggestion: RouteResult = {
  pick: {
    book_id: "aaaaaa",
    book_title: "Room",
    epic_id: "epic-1",
    epic_title: "Epic",
  },
  alternatives: [],
  new_room_title: "A new room",
  cost: 0,
};
export function homeApi(overrides: Partial<HomeApi> = {}): HomeApi {
  return {
    me: async () => me(),
    inbox: async () => ({waits:[],mentions:[],tasks:[]}),
    agents: async () => ({ agents: [], last_used: null }),
    archived: async () => ({ books: [] }),
    search: async () => ({ rooms: 1, epics: [], messages: [] }),
    route: async () => suggestion,
    startRoom: async () => ({
      id: "bbbbbb",
      unknown: [],
      invited: [],
      cost: 0,
    }),
    post: async () => ({ ok: true, id: 1, thread: "main" }),
    archive: async () => ({ ok: true }),
    tint: async () => ({ ok: true }),
    icon: async () => ({ ok: true, icon: 1 }),
    order: async () => ({ ok: true }),
    resolve: async () => ({ ok: true }),
    ...overrides,
  };
}
export function deferred<T>() {
  let resolve!: (value: T) => void, reject!: (error: Error) => void;
  const promise = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}
export function manualClock() {
  let time = 0,
    id = 0;
  const jobs = new Map<number, { at: number; fn: () => void }>();
  const clock: AuthClock = {
    schedule(fn, ms) {
      const key = ++id;
      jobs.set(key, { at: time + ms, fn });
      return key;
    },
    cancel(handle) {
      jobs.delete(handle as number);
    },
  };
  return {
    clock,
    jobs,
    advance(ms: number) {
      const until = time + ms;
      let runs = 0;
      while (true) {
        const next = [...jobs]
          .filter(([, job]) => job.at <= until)
          .sort((a, b) => a[1].at - b[1].at)[0];
        if (!next) break;
        if (++runs > 1000) throw Error("timer flood");
        time = next[1].at;
        jobs.delete(next[0]);
        next[1].fn();
      }
      time = until;
    },
  };
}
export const settle = async () => {
  for (let i = 0; i < 8; i++) await Promise.resolve();
};
