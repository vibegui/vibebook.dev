// Provider JSON stays unknown until the queried fields are validated. Extra
// fields are ignored; malformed numbers/containers are not analytics zeros.
import * as z from "zod/mini";

const number = z.number().check(z.nonnegative());
const optionalNumber = z.optional(z.nullable(number));
const message = z.object({ message: z.string() });
const envelope = z.object({
  data: z.optional(z.unknown()),
  errors: z.optional(z.array(message)),
});
export const WorkerAnalytics = z.object({
  viewer: z.object({
    accounts: z.array(
      z.object({
        workersInvocationsAdaptive: z.array(
          z.object({
            dimensions: z.optional(
              z.nullable(
                z.object({ status: z.optional(z.nullable(z.string())) }),
              ),
            ),
            sum: z.object({
              requests: optionalNumber,
              errors: optionalNumber,
              subrequests: optionalNumber,
              responseBodySize: optionalNumber,
            }),
            quantiles: z.optional(
              z.nullable(
                z.object({
                  cpuTimeP50: optionalNumber,
                  cpuTimeP99: optionalNumber,
                  wallTimeP50: optionalNumber,
                  wallTimeP99: optionalNumber,
                }),
              ),
            ),
          }),
        ),
      }),
    ),
  }),
});
export const ZoneAnalytics = z.object({
  viewer: z.object({
    zones: z.array(
      z.object({
        httpRequests1dGroups: z.array(
          z.object({
            dimensions: z.object({ date: z.string() }),
            sum: z.object({
              requests: number,
              bytes: number,
              cachedBytes: number,
              threats: number,
            }),
            uniq: z.object({ uniques: number }),
          }),
        ),
      }),
    ),
  }),
});
const counts = z.array(z.object({ count: number }));
export const KindAnalytics = z.object({
  viewer: z.object({
    zones: z.array(
      z.object({ all: counts, mcp: counts, api: counts, ws: counts }),
    ),
  }),
});
export const BytesAnalytics = z.object({
  viewer: z.object({
    zones: z.array(
      z.object({
        paths: z.array(
          z.object({
            count: number,
            sum: z.object({ edgeResponseBytes: number }),
            dimensions: z.object({ clientRequestPath: z.string() }),
          }),
        ),
        types: z.array(
          z.object({
            count: number,
            sum: z.object({ edgeResponseBytes: number }),
            dimensions: z.object({ edgeResponseContentTypeName: z.string() }),
          }),
        ),
        errs: z.array(
          z.object({
            count: number,
            dimensions: z.object({
              clientRequestPath: z.string(),
              edgeResponseStatus: number,
            }),
          }),
        ),
      }),
    ),
  }),
});

async function responseJSON(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    throw new Error(
      `Cloudflare returned invalid JSON (HTTP ${response.status})`,
    );
  }
}
export async function readAnalyticsResponse<S extends z.ZodMiniType>(
  response: Response,
  schema: S,
): Promise<z.output<S>> {
  const parsed = envelope.safeParse(await responseJSON(response));
  if (!parsed.success)
    throw new Error(
      `Cloudflare returned an invalid analytics envelope (HTTP ${response.status})`,
    );
  if (!response.ok || parsed.data.errors?.length)
    throw new Error(
      parsed.data.errors?.map((error) => error.message).join("; ") ||
        `HTTP ${response.status}`,
    );
  const data = schema.safeParse(parsed.data.data);
  if (!data.success)
    throw new Error("Cloudflare returned invalid analytics data");
  return data.data;
}
const zones = z.object({
  success: z.optional(z.boolean()),
  errors: z.optional(z.array(message)),
  result: z.optional(z.array(z.object({ id: z.string() }))),
});
export async function readZoneResponse(response: Response) {
  const parsed = zones.safeParse(await responseJSON(response));
  if (!parsed.success)
    throw new Error("Cloudflare returned an invalid zone response");
  if (
    !response.ok ||
    parsed.data.success === false ||
    parsed.data.errors?.length
  )
    throw new Error(
      parsed.data.errors?.map((error) => error.message).join("; ") ||
        `HTTP ${response.status}`,
    );
  if (!parsed.data.result)
    throw new Error("Cloudflare returned no zone result");
  return parsed.data.result[0]?.id ?? null;
}
const key = z.object({
  data: z.object({
    usage: optionalNumber,
    limit: optionalNumber,
    usage_daily: optionalNumber,
    usage_weekly: optionalNumber,
    usage_monthly: optionalNumber,
  }),
});
export function parseSpendKey(input: unknown) {
  const parsed = key.safeParse(input);
  if (!parsed.success) return null;
  const data = parsed.data.data;
  return {
    usage: data.usage ?? 0,
    limit: data.limit ?? null,
    daily: data.usage_daily ?? null,
    weekly: data.usage_weekly ?? null,
    monthly: data.usage_monthly ?? null,
  };
}
const issue = z.object({
  kind: z.catch(z.optional(z.string()), undefined),
  model: z.catch(z.optional(z.string()), undefined),
  what: z.catch(z.optional(z.string()), undefined),
});
export function parseIssueDimensions(source: string): z.output<typeof issue> {
  let input: unknown;
  try {
    input = JSON.parse(source);
  } catch {
    // Historical rows cut at 512 chars: retain the partial-text recovery.
    const field = (key: string) =>
      new RegExp(`"${key}":"((?:[^"\\\\]|\\\\.)*)`)
        .exec(source)?.[1]
        ?.replace(/\\(.)/g, "$1");
    const what = field("what");
    return {
      kind: field("kind"),
      model: field("model"),
      what: what ? `${what}…` : undefined,
    };
  }
  const parsed = issue.safeParse(input);
  return parsed.success ? parsed.data : {};
}
export const reportError = (error: unknown) =>
  error instanceof Error ? error.message : String(error);
