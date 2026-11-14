import "server-only";

// Queued mention text outlives membership. Recheck authorization at delivery,
// for both the on-demand Inbox and the scheduled digest.
const mentions = `SELECT d.book_id, b.title AS room, d.msg_id, d.thread, d.author, u.name AS author_name, d.text, d.ts
  FROM digest_items d
  JOIN members m ON m.book_id = d.book_id AND m.email = d.email
  JOIN books b ON b.id = d.book_id
  LEFT JOIN users u ON u.email = d.author
  WHERE d.email = ?`;

export const INBOX_MENTIONS_SQL = `${mentions} ORDER BY d.ts DESC LIMIT 40`;
export const DIGEST_MENTIONS_SQL = `${mentions} ORDER BY d.ts ASC LIMIT 40`;
