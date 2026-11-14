import { expect, test } from "bun:test";
import { get } from "svelte/store";
import { createApplicationServices } from "../svelte/features/application/services";
import { createApplicationInbox } from "../svelte/features/application/inbox";
import { HomeFailure } from "../svelte/features/home/api";
import type { HomeApi } from "../svelte/features/home/api";
import { homeApi, me, manualClock, deferred, settle } from "./native-home-fixtures";
const wait = { book_id: "aaaaaa", room: "Room", ref: "m1", thread: "main", topic: null, author: "friend@test", author_name: "Friend", text: "Question", ts: 1 };
async function fixture(resolve: HomeApi["resolve"] = async () => ({ ok: true })) {
  const timer = manualClock(), documents: string[] = []; let href = "https://vb.test/app?ui=svelte", canonical = me({ waits: [wait] }), reads = 0;
  const services = createApplicationServices({
    browser: { origin: "https://vb.test", href: () => href, history: { pushState(_data, _title, value) { href = new URL(String(value), href).href; }, replaceState(_data, _title, value) { href = new URL(String(value), href).href; } }, socketUrl: path => `wss://vb.test${path}`, visible: () => true, listenVisibility: () => () => {}, listenPop: () => () => {}, enqueue: queueMicrotask, navigateDocument: value => documents.push(value), reload() {}, logoutPost: async () => ({ ok: true }), logoutWarning() {}, logoutFailure() {}, shellVersion: "development", clock: { ...timer.clock, now: () => 0 } },
    homeApi: homeApi({ me: async () => { reads++; return canonical; }, resolve }), pwa: () => ({ account() {}, beforeLogout: async () => ({ local: true, settled: true, confirmed: true }), dispose() {} }),
    personalConnection: () => ({ start() {}, restart() {}, dispose() {} }), roomConnection: () => ({ start() {}, dispose() {}, resync() {}, send: () => true, request: async () => ({ ok: true }) }),
  });
  const inbox = createApplicationInbox(services, timer.clock); services.start(); await settle();
  return { services, inbox, timer, reads: () => reads, documents, href: () => href, canonical(value: typeof canonical) { canonical = value; }, dispose() { inbox.dispose(); services.dispose(); } };
}
test("Inbox callbacks own an exact account/opening and reject stale or absent canonical targets", async () => {
  let writes = 0; const h = await fixture(async () => { writes++; return { ok: true }; });
  h.inbox.open(); const a = get(h.inbox.state).binding!;
  h.inbox.close(a); h.inbox.open(); const b = get(h.inbox.state).binding!;
  await h.inbox.resolve(a, wait); h.inbox.close(a);
  expect(get(h.inbox.state).binding === b).toBe(true); expect(writes).toBe(0);
  h.canonical(me({ waits: [] })); await h.services.personal.refresh();
  await h.inbox.resolve(b, wait); expect(writes).toBe(0); h.dispose();
});
test("late resolve completion cannot refresh another identity or opening", async () => {
  const late = deferred<{ ok: true }>(), h = await fixture(() => late.promise);
  h.inbox.open(); const binding = get(h.inbox.state).binding!;
  const operation = h.inbox.resolve(binding, wait); await settle(); h.inbox.close(binding);
  const before = h.reads(); late.resolve({ ok: true }); await operation; await settle();
  expect(h.reads()).toBe(before); expect(get(h.inbox.state).binding).toBe(null); h.dispose();
});
test("known global401 revokes the document; identity changes synchronously fence old Inbox callbacks", async () => {
  const h = await fixture(async () => { throw new HomeFailure("unauthenticated", 401); });
  h.inbox.open(); await h.inbox.resolve(get(h.inbox.state).binding!, wait);
  expect(h.services.active()).toBe(false); expect(get(h.services.state).sessionDenied).toBe(true);
  expect(h.services.personal.peek()).toBe(null); expect(h.documents[0]).toContain("/login?"); h.dispose();
  let writes = 0; const other = await fixture(async () => { writes++; return { ok: true }; });
  other.inbox.open(); const old = get(other.inbox.state).binding!;
  other.canonical(me({ email: "other@test", waits: [wait] })); await other.services.personal.refresh();
  await other.inbox.resolve(old, wait); expect(writes).toBe(0); expect(get(other.inbox.state).binding).toBe(null); other.dispose();
});
test("Inbox deadline settles an ignored-abort write without refreshing after its late ACK", async () => {
  const late = deferred<{ ok: true }>(), h = await fixture(() => late.promise);
  h.inbox.open();
  const operation = h.inbox.resolve(get(h.inbox.state).binding!, wait);
  const failure = operation.catch(error => error instanceof Error ? error.message : "unexpected");
  await settle(); const before = h.reads(); h.timer.advance(20_000);
  expect(await failure).toBe("timeout");
  late.resolve({ ok: true }); await settle(); expect(h.reads()).toBe(before); h.dispose();
});
