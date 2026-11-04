import { YDurableObjects } from "y-durableobjects";
import type { Env } from "./index";
import { bookStub } from "./rooms";

/**
 * One live co-editing relay per doc (the room's, or an epic's): a Yjs CRDT on a Durable Object, speaking the
 * y-websocket protocol (y-durableobjects owns the protocol, hibernation and update storage). Same pattern as
 * decocms/rituals. The doc is markdown in a Y.Text ("md").
 *
 * Authority: the Y.Doc is live truth while people edit; the Book keeps the markdown mirror (doc / doc:<epic>)
 * that @vibe, agents, read_room and the preview use. Edits here flow to the Book (debounced alarm);
 * @vibe/agent writes flow back in through setText.
 */
export class DocRoom extends YDurableObjects<{ Bindings: Env }> {
  protected async onStart() {
    await super.onStart();
    this.watch();
  }

  private ytext() {
    return this.doc.getText("md");
  }

  /** Called by the Worker before each upgrade: remember which doc this is and seed it once, server-side. */
  async prepare(bookId: string, epic: string, markdown: string) {
    await this.state.storage.put("bind", { bookId, epic });
    if (!(await this.state.storage.get("seeded"))) {
      if (!this.ytext().length && markdown) this.ytext().insert(0, markdown);
      await this.state.storage.put("seeded", 1);
    }
  }

  /** Replace the text from outside (@vibe / agents): apply only the changed middle so live cursors survive. */
  async setText(markdown: string) {
    const t = this.ytext();
    const cur = t.toString();
    if (cur === markdown) return;
    let a = 0;
    while (a < cur.length && a < markdown.length && cur[a] === markdown[a]) a++;
    await this.state.storage.put("seeded", 1);
    let b = 0;
    while (b < cur.length - a && b < markdown.length - a && cur[cur.length - 1 - b] === markdown[markdown.length - 1 - b]) b++;
    this.doc.transact(() => {
      t.delete(a, cur.length - a - b);
      t.insert(a, markdown.slice(a, markdown.length - b));
    }, "server");
  }

  private watching = false;
  private watch() {
    if (this.watching) return;
    this.watching = true;
    // People's edits reach the Book's markdown mirror 1.5s after the last keystroke (one write per pause).
    this.doc.on("update", (_u: Uint8Array, origin: unknown) => {
      if (origin !== "server") void this.state.storage.setAlarm(Date.now() + 1500);
    });
  }

  async alarm() {
    const bind = await this.state.storage.get<{ bookId: string; epic: string }>("bind");
    if (!bind) return;
    await bookStub(this.env, bind.bookId).docFromYjs(bind.bookId, this.ytext().toString(), bind.epic || undefined);
  }
}
