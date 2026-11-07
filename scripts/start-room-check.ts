// bun scripts/start-room-check.ts: title cutting and friend matching for "Novo vibebook" (src/start-room.ts).
import { matchFriend, shortTitle } from "../src/start-room";
const assert = (ok: boolean, m: string) => { if (!ok) throw new Error(m); };
assert(shortTitle("Viagem de avião para SP com os dogs beto e cado") === "Viagem de avião para SP com os dogs beto", "cuts at a word");
assert(shortTitle("Curto") === "Curto", "short stays");
const fr = [{ email: "alexia.s@gmail.com", name: "Alexia Souza" }, { email: "leca.schatz@gmail.com", name: "Leca" }, { email: "ana@x.com", name: "Ana B" }, { email: "ana.c@y.com", name: "Ana C" }];
assert(matchFriend("Alexia", fr) === "alexia.s@gmail.com", "first name");
assert(matchFriend("@leca", fr) === "leca.schatz@gmail.com", "handle");
assert(matchFriend("Ana", fr) === null, "ambiguous = none");
assert(matchFriend("bob@z.com", fr) === "bob@z.com", "email as written");
assert(matchFriend("Zé", fr) === null, "unknown");
console.log("ok");
