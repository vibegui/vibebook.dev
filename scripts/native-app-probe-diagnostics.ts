// Artifacts may contain only fixed phases/codes and public source locations.
// Never serialize provider errors, request/response bodies, headers or URLs.
import { ErrorBody } from "../shared/schemas";
export type ProbePhase =
  | "listen"
  | "profile"
  | "identity"
  | "room-create"
  | "review-deny-upload"
  | "app-upload"
  | "marker-post"
  | "room-open"
  | "app-open"
  | "initial-read"
  | "replacement-navigation"
  | "replacement-read";
export function probeHTTP(phase: ProbePhase, status: number, body?: unknown) {
  const parsed = ErrorBody.safeParse(body),
    error = parsed.success ? parsed.data.error : null;
  const code =
    status >= 200 && status < 300
      ? "ok"
      : status === 401
        ? "unauthenticated"
        : status === 403
          ? "forbidden"
          : status === 413
            ? "too-large"
            : status === 415
              ? "unsupported-media"
              : status === 429
                ? "rate-limited"
                : error ===
                    "blocked: couldn't check this HTML right now (the safety check is down); try again in a minute."
                  ? "html-review-unavailable"
                  : error?.startsWith("blocked by @vibe's check:")
                    ? "html-review-refused"
                    : error?.startsWith("Não subi: o arquivo parece ter ") ||
                        error?.startsWith(
                          "blocked: the HTML looks like it has a secret (",
                        )
                      ? "content-safety-refused"
                      : status >= 500
                        ? "server-failure"
                        : "request-refused";
  return { phase, status, code };
}
const allowed = new Set([
  "scripts/native-app-navigation-probe.ts",
  "svelte/transport.ts",
  "svelte/lib/client/api.ts",
]);
export function probeFailure(error: unknown) {
  const sourceFrames: string[] = [];
  // Capture our own classification call site, never an exception stack: an
  // upstream error message can contain newlines and forged stack-looking text.
  for (const line of (new Error().stack ?? "").split("\n")) {
    if (!/^\s*at\s/.test(line)) continue;
    const match = /((?:scripts|svelte)\/[A-Za-z0-9_./-]+\.ts):(\d+):(\d+)/.exec(
      line,
    );
    if (match && allowed.has(match[1]))
      sourceFrames.push(`${match[1]}:${match[2]}:${match[3]}`);
  }
  const names = new Set([
    "Error",
    "TypeError",
    "AssertionError",
    "ZodError",
    "TimeoutError",
    "ProtocolError",
    "AbortError",
  ]);
  return {
    name:
      error instanceof Error && names.has(error.name)
        ? error.name
        : "UnknownError",
    sourceFrames: [...new Set(sourceFrames)].slice(0, 6),
  };
}
