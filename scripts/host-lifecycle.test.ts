import { expect, test } from "bun:test";
import { get } from "svelte/store";
import { roomScopeFixture } from "./room-scope-fixtures";

// Actual typed owners replace source extraction of the retired mount registry.
// Direct Svelte node disposal is covered by RoomShell DOM fixtures.
test("room departure closes viewer and freezes detached Files/Chat actions", async () => {
  const h = await roomScopeFixture(),
    view = get(h.owner.state)!;
  h.owner.actions.openFile("abcdef");
  expect(get(h.owner.viewer.state).open).toBe(true);
  view.files.session.select("txt", "");
  h.app.services.actions.home();
  expect(h.owner.current()).toBe(false);
  expect(get(h.owner.state)).toBeNull();
  expect(get(h.owner.viewer.state).open).toBe(false);
  expect(get(h.owner.viewer.state).room).toBeNull();
  view.files.session.select("img", "");
  expect(get(view.files.session.state).kind).toBe("txt");
  expect(await view.chat!.actions.request({ t: "doc.get" })).toMatchObject({
    ok: false,
  });
  view.chat!.actions.reply(1);
  expect(
    get(
      h.resources.composer.entry({
        account: h.room.me,
        roomId: h.room.id,
        thread: "other",
      }).state,
    ).replyId,
  ).toBeUndefined();
  expect(h.owner.actions.openFile("abcdef")).toBe(false);
  h.owner.dispose();
  h.owner.dispose();
  h.dispose();
});
