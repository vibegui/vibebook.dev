// "Novo vibebook" in one step: the person says what it is and with whom. One cheap model call (MODEL_ROUTE, reasoning
// off) turns that into a short title and the people it names; names are matched against the person's friends here
// (never by the model), emails are taken as written. Then: the room, its first message, the invites, and the
// person's Claude switched on for it (vibebook herdr opens it where it runs).
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText, Output } from "ai";
import { z } from "zod";
import type { Env } from "./index";
import { bookStub, createBook, inviteMember } from "./rooms";
import type { Lang } from "./lang";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

/** A short title that never ends mid-word: at most `max` chars, cut at the last whole word. */
export function shortTitle(s: string, max = 40) {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max + 1);
  return (cut.slice(0, cut.lastIndexOf(" ")) || t.slice(0, max)).replace(/[\s,.;:–—-]+$/, "");
}

/** A name or email from the text → one friend's email, if exactly one matches (first name, full name or email). */
export function matchFriend(who: string, friends: { email: string; name: string | null }[]) {
  const w = fold(who).replace(/^@/, "");
  if (EMAIL.test(w)) return w;
  const hits = friends.filter((f) => {
    const n = fold(f.name ?? ""), local = f.email.split("@")[0].toLowerCase();
    return n === w || n.split(" ")[0] === w || local === w || local.split(/[._-]/)[0] === w;
  });
  return hits.length === 1 ? hits[0].email : null;
}

export async function startRoom(env: Env, ctx: { waitUntil(p: Promise<unknown>): void }, origin: string, email: string, text: string, lang: Lang) {
  let title = "", people: string[] = [], cost = 0;
  try {
    const { output, usage } = await generateText({
      model: createOpenRouter({ apiKey: env.OPENROUTER_API_KEY })(env.MODEL_ROUTE, { reasoning: { enabled: false, effort: "none" } }),
      temperature: 0,
      output: Output.object({
        schema: z.object({
          title: z.string().describe("2 to 5 words, at most 40 characters, in the message's language; the subject, not a sentence"),
          people: z.array(z.string()).max(10).describe("people the author wants in the room, as written (first name or email); never the author"),
        }),
      }),
      prompt: `Someone is creating a shared room for a project and described it below. Give the room a short title and list the people they want in it with them ("eu e a Alexia" → ["Alexia"]; pets, companies and places are not people).\n\n"""\n${text.slice(0, 2000)}\n"""`,
    });
    title = output.title;
    people = output.people;
    cost = Number((usage as { raw?: { cost?: number } }).raw?.cost) || 0;
  } catch {
    // Model down: the room still opens, titled from the text.
  }
  const friends = (
    await env.DB.prepare(`SELECT f.b AS email, u.name FROM friends f LEFT JOIN users u ON u.email = f.b WHERE f.a = ?`).bind(email).all<{ email: string; name: string | null }>()
  ).results;
  const invited: string[] = [], unknown: string[] = [];
  for (const p of people) {
    const who = matchFriend(p, friends);
    if (who && who !== email && !invited.includes(who)) invited.push(who);
    else if (!who) unknown.push(p.slice(0, 60));
  }
  const id = await createBook(env, email, shortTitle(title || text.replace(/^novo vibebook\s*[-–:]?\s*/i, "")) || undefined);
  await env.DB.prepare(`UPDATE members SET claude_on = 1 WHERE book_id = ? AND email = ?`).bind(id, email).run();
  await bookStub(env, id).humanPost(id, email, text, "main");
  for (const who of invited.slice(0, 5)) await inviteMember(env, ctx, origin, email, id, who, lang);
  return { id, invited, unknown, cost };
}
