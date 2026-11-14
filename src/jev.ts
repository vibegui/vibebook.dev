import type { Env } from "./index";
import * as z from "zod/mini";

/**
 * Jev, TypeSafe's decision model (same setup as decoindex/circulei): typed questions in, typed answers out
 * (`noul` = probability of yes, `score`/`choice` = probabilities over criteria), billed on input only,
 * ~1s and ~US$0.00002 per call. @vibe uses it to grade the room (tasks, epics, who is waiting on whom); it
 * never writes text. Null on any failure: callers keep what they had and try again on the next change.
 */
export type Question =
  | { type: "noul"; instructions: string }
  | { type: "score"; instructions: string; criteria: string[] };
const AnswerSchema = z.object({
  noul: z.optional(z.nullable(z.number())),
  score: z.optional(z.nullable(z.number())),
});
const DecisionResponse = z.object({
  answers: z.optional(z.nullable(z.record(z.string(), AnswerSchema))),
  usage: z.optional(
    z.nullable(z.object({ cost: z.optional(z.nullable(z.number())) })),
  ),
});
export type Answer = z.infer<typeof AnswerSchema>;

export async function decide(
  env: Pick<Env, "MODEL_JUDGE" | "OPENROUTER_API_KEY">,
  state: Record<string, string>,
  questions: Record<string, Question>,
  timeout = 8_000,
) {
  if (!Object.keys(questions).length || env.MODEL_JUDGE === "off") return null;
  try {
    const res = await fetch("https://openrouter.ai/api/alpha/decisions", {
      method: "POST",
      headers: {
        authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
        "content-type": "application/json",
        "x-title": "vibebook",
      },
      body: JSON.stringify({
        model: env.MODEL_JUDGE || "~typesafe/jev-latest",
        state,
        questions,
      }),
      signal: AbortSignal.timeout(timeout),
    });
    if (!res.ok)
      throw new Error(
        `decisions ${res.status}: ${(await res.text()).slice(0, 200)}`,
      );
    const out = DecisionResponse.parse(await res.json());
    return out.answers
      ? { answers: out.answers, cost: out.usage?.cost ?? 0 }
      : null;
  } catch (e) {
    console.error(
      "jev failed",
      String(e instanceof Error ? e.message : e).slice(0, 200),
    );
    return null;
  }
}
