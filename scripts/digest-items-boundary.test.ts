import { expect, test } from "bun:test";
import { Database } from "bun:sqlite";
import * as z from "zod/mini";
import { DIGEST_MENTIONS_SQL, INBOX_MENTIONS_SQL } from "../src/digestItems";

const messageIds = (rows: unknown) =>
  z
    .array(z.object({ msg_id: z.number() }))
    .parse(rows)
    .map((row) => row.msg_id);

// Run the exact production queries against SQLite, not a SQL-string mock.
// This verifies row authorization/order/limits, not D1 or email delivery.
function fixture() {
  const db = new Database(":memory:");
  db.exec(`
    CREATE TABLE books (id TEXT PRIMARY KEY, title TEXT);
    CREATE TABLE members (book_id TEXT, email TEXT, archived_at INTEGER, PRIMARY KEY(book_id, email));
    CREATE TABLE users (email TEXT PRIMARY KEY, name TEXT);
    CREATE TABLE digest_items (email TEXT, book_id TEXT, msg_id INTEGER, thread TEXT, author TEXT, text TEXT, ts INTEGER);
    INSERT INTO books VALUES ('owned', 'Owned room'), ('removed', 'Former room');
    INSERT INTO members VALUES ('owned', 'reader@example.test', NULL), ('removed', 'other@example.test', NULL);
    INSERT INTO users VALUES ('author@example.test', 'Author');
  `);
  const mention = (email: string, room: string, id: number) =>
    db
      .query(
        "INSERT INTO digest_items VALUES (?, ?, ?, 'main', 'author@example.test', ?, ?)",
      )
      .run(email, room, id, `Synthetic mention ${id}`, id);
  return { db, mention };
}

test("Inbox and digest recheck current membership and recipient without deleting queued rows", () => {
  const { db, mention } = fixture();
  try {
    mention("reader@example.test", "owned", 1);
    mention("reader@example.test", "removed", 2);
    mention("other@example.test", "owned", 3);
    db.query(
      "INSERT INTO members VALUES ('owned', 'other@example.test', NULL)",
    ).run();
    for (const query of [INBOX_MENTIONS_SQL, DIGEST_MENTIONS_SQL]) {
      expect(db.query(query).all("reader@example.test")).toEqual([
        {
          book_id: "owned",
          room: "Owned room",
          msg_id: 1,
          thread: "main",
          author: "author@example.test",
          author_name: "Author",
          text: "Synthetic mention 1",
          ts: 1,
        },
      ]);
      expect(db.query(query).all("other@example.test")).toHaveLength(1);
      expect(db.query(query).all("unknown@example.test")).toEqual([]);
    }
    // Archiving still retains membership; do not silently change its policy.
    db.query(
      "UPDATE members SET archived_at = 1 WHERE book_id = 'owned' AND email = ?",
    ).run("reader@example.test");
    for (const query of [INBOX_MENTIONS_SQL, DIGEST_MENTIONS_SQL])
      expect(db.query(query).all("reader@example.test")).toHaveLength(1);
    db.query("DELETE FROM members WHERE book_id = 'owned' AND email = ?").run(
      "reader@example.test",
    );
    for (const query of [INBOX_MENTIONS_SQL, DIGEST_MENTIONS_SQL])
      expect(db.query(query).all("reader@example.test")).toEqual([]);
    expect(db.query("SELECT count(*) AS n FROM digest_items").get()).toEqual({
      n: 3,
    });
  } finally {
    db.close();
  }
});

test("authorized Inbox and digest keep opposite chronological order and the forty-row limit", () => {
  const { db, mention } = fixture();
  try {
    for (let id = 1; id <= 45; id++)
      mention("reader@example.test", "owned", id);
    expect(
      messageIds(db.query(INBOX_MENTIONS_SQL).all("reader@example.test")),
    ).toEqual(Array.from({ length: 40 }, (_, index) => 45 - index));
    expect(
      messageIds(db.query(DIGEST_MENTIONS_SQL).all("reader@example.test")),
    ).toEqual(Array.from({ length: 40 }, (_, index) => index + 1));
  } finally {
    db.close();
  }
});
