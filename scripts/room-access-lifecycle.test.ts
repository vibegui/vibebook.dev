import { expect, test } from "bun:test";
import { get } from "svelte/store";
import { roomScopeFixture } from "./room-scope-fixtures";

test("canonical removal closes private feature owners before terminal publication", async () => {
  const h = await roomScopeFixture(), view = get(h.owner.state)!;
  h.owner.actions.openFile("abcdef");
  let terminalObserved = false;
  const stop = h.app.services.rootRoom.state.subscribe(snapshot => {
    if (snapshot.phase !== "removed") return;
    terminalObserved = true;
    expect(snapshot.room).toBeNull();
    expect(snapshot.connection).toBeNull();
    expect(get(h.owner.state)).toBeNull();
    expect(get(h.owner.viewer.state).open).toBe(false);
    expect(get(h.owner.viewer.state).room).toBeNull();
  });
  h.publish({ ...h.room, members: [] });
  expect(terminalObserved).toBe(true);
  expect(await view.files.request!({ t: "files.get" })).toMatchObject({ ok: false });
  expect(view.files.send({ t: "files.get" })).toBe(false);
  h.app.services.actions.home();
  h.app.services.actions.navigate({ roomId: h.room.id });
  expect(h.app.services.rootRoom.read().room).toBeNull();
  stop(); h.dispose();
});
