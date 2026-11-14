// External decision-provider protocol fixture. It never mocks the canonical
// API, Book/R2, SDK bridge or checkEmbed; unknown requests fail closed.
import { createServer } from "node:http";
import * as z from "zod/mini";
import { EMBED_QUESTIONS } from "../src/embed-review-contract";
import {
  appProbeDocument,
  REVIEW_DENY_DOCUMENT,
} from "./native-app-probe-documents";
export const REVIEW_FIXTURE_MODEL = "fixture/embed-review";
const question = <T extends string>(instructions: T) =>
  z.strictObject({
    type: z.literal("noul"),
    instructions: z.literal(instructions),
  });
const Request = z.strictObject({
  model: z.literal(REVIEW_FIXTURE_MODEL),
  state: z.strictObject({
    html: z.string().check(z.minLength(1), z.maxLength(24_000)),
  }),
  questions: z.strictObject({
    credentials: question(EMBED_QUESTIONS.credentials),
    impersonation: question(EMBED_QUESTIONS.impersonation),
    manipulation: question(EMBED_QUESTIONS.manipulation),
  }),
});
export function reviewModelAnswer(input: unknown, base: string) {
  if (!/^http:\/\/127\.0\.0\.1:\d+$/.test(base)) return null;
  const parsed = Request.safeParse(input);
  if (!parsed.success) return null;
  const html = parsed.data.state.html;
  let verdict: "allow" | "deny";
  if (html === REVIEW_DENY_DOCUMENT) verdict = "deny";
  else {
    const destination =
      /location\.href="(http:\/\/127\.0\.0\.1:[1-9]\d{0,4}\/replacement)"/.exec(
        html,
      )?.[1];
    if (
      !destination ||
      Number(new URL(destination).port) > 65535 ||
      html !== appProbeDocument("initial", base, destination)
    )
      return null;
    verdict = "allow";
  }
  return {
    verdict,
    response: {
      answers: {
        credentials: { noul: 0 },
        impersonation: { noul: 0 },
        manipulation: { noul: verdict === "deny" ? 1 : 0 },
      },
      usage: { cost: 0 },
    },
  };
}
export async function startReviewModelFixture(base: string) {
  const evidence = {
    scope:
      "Simulated external model judgments; actual checkEmbed/HTTP/Book/R2/SDK remain real; no real-provider intelligence acceptance",
    allowed: 0,
    denied: 0,
    invalid: 0,
    authorizationRejected: 0,
  };
  const server = createServer(async (request, response) => {
    request.setTimeout(10_000, () => request.destroy());
    if (request.method !== "POST" || request.url !== "/api/alpha/decisions") {
      evidence.invalid++;
      response.writeHead(404).end();
      return;
    }
    if (request.headers.authorization !== undefined) {
      evidence.authorizationRejected++;
      response.writeHead(400).end();
      return;
    }
    const type = request.headers["content-type"];
    if (
      typeof type !== "string" ||
      type.split(";")[0].trim().toLowerCase() !== "application/json"
    ) {
      evidence.invalid++;
      response.writeHead(400).end();
      return;
    }
    try {
      const chunks: Buffer[] = [];
      let bytes = 0;
      for await (const chunk of request) {
        const raw: unknown = chunk;
        if (!Buffer.isBuffer(raw) && typeof raw !== "string")
          throw Error("Invalid fixture body");
        const body = Buffer.isBuffer(raw) ? raw : Buffer.from(raw);
        bytes += body.byteLength;
        if (bytes > 64_000) throw Error("Fixture body too large");
        chunks.push(body);
      }
      const raw: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      const answer = reviewModelAnswer(raw, base);
      if (!answer) {
        evidence.invalid++;
        response
          .writeHead(400, { "content-type": "application/json" })
          .end('{"error":"unknown fixture judgment"}');
        return;
      }
      if (answer.verdict === "allow") evidence.allowed++;
      else evidence.denied++;
      response
        .writeHead(200, {
          "content-type": "application/json",
          "cache-control": "no-store",
        })
        .end(JSON.stringify(answer.response));
    } catch {
      evidence.invalid++;
      if (!response.destroyed) response.writeHead(400).end();
    }
  });
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string")
    throw Error("Missing local model fixture address");
  return {
    url: `http://127.0.0.1:${address.port}/api/alpha/decisions`,
    evidence,
    async close() {
      server.closeAllConnections();
      if (server.listening)
        await new Promise<void>((resolve, reject) =>
          server.close((error) => (error ? reject(error) : resolve())),
        );
    },
  };
}
