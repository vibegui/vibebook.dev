import { expect, test } from "bun:test";
import { get } from "svelte/store";
import { roomScopeFixture } from "./room-scope-fixtures";

test("reply waits for pending sheet navigation and then uses the intended thread draft", async () => {
  const h = await roomScopeFixture(),
    view = get(h.owner.state)!;
  h.hold();
  view.chat!.actions.reply(1);
  expect(h.app.services.rootRoom.read().thread).toBe("main");
  expect(
    get(
      h.resources.composer.entry({
        account: h.room.me,
        roomId: h.room.id,
        thread: "main",
      }).state,
    ).replyId,
  ).toBeUndefined();
  h.release();
  expect(h.app.services.rootRoom.read().thread).toBe("other");
  expect(
    get(
      h.resources.composer.entry({
        account: h.room.me,
        roomId: h.room.id,
        thread: "other",
      }).state,
    ).replyId,
  ).toBe(1);
  expect(
    get(
      h.resources.composer.entry({
        account: h.room.me,
        roomId: h.room.id,
        thread: "main",
      }).state,
    ).replyId,
  ).toBeUndefined();
  h.dispose();
});

test("deferred pane and reply intents cannot cross room departure", async () => {
  const h = await roomScopeFixture();
  h.hold();
  h.owner.actions.setPane("files");
  expect(get(h.app.services.state).pane).toBe("doc");
  h.owner.dispose();
  h.app.services.actions.home();
  h.release();
  expect(h.app.services.rootRoom.read().room).toBeNull();
  expect(get(h.owner.state)).toBeNull();
  h.dispose();
});

test("passive canonical frames do not start Apps catalog HTTP reads", async () => {
  const h = await roomScopeFixture();
  h.publish();
  h.publish();
  await settle();
  expect(h.requests).toEqual([]);
  h.dispose();
});

test("old room attachment cleanup cannot detach the replacement even when the actor is reused", async () => {
  const h = await roomScopeFixture(),
    service = h.app.services.agents,
    actor = h.app.services.syncAgents()!;
  const releaseOld = service.claimAttachment(),
    releaseNew = service.claimAttachment();
  releaseOld();
  expect(get(actor.state).room?.id).toBe(h.room.id);
  expect(actor.current()).toBe(true);
  releaseNew();
  expect(get(actor.state).room).toBeNull();
  h.dispose();
});

test("notice deadline is scoped and an uncancelled old deadline cannot clear its replacement", async () => {
  const h = await roomScopeFixture();
  h.ignoreTimerCancellation();
  h.serverEvent({ t: "error", error: "First issue" });
  expect(get(h.owner.state)?.notice).toBe("First issue");
  h.app.timer.advance(1000);
  h.serverEvent({ t: "error", error: "Later issue" });
  h.app.timer.advance(6000);
  expect(get(h.owner.state)?.notice).toBe("Later issue");
  h.app.timer.advance(1000);
  expect(get(h.owner.state)?.notice).toBe("");
  h.dispose();
});

test("partial room metadata retains the signed-in user's own canonical mention name", async () => {
  const h = await roomScopeFixture();
  expect(h.room.names).toBeUndefined();
  expect(get(h.owner.state)?.chat?.vb.knownNames?.[h.room.me]).toBe("Me");
  h.dispose();
});

test("document resize pixels do not rebuild Chat or feature props", async () => {
  const h = await roomScopeFixture(),
    before = get(h.owner.state);
  h.resizeDocument(400);
  h.resizeDocument(410);
  h.resizeDocument(420);
  expect(get(h.owner.state)).toBe(before);
  h.dispose();
});
