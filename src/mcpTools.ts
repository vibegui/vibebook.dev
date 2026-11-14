// One runtime contract for both remote tools/list and cached D1 tool metadata.
import * as z from "zod/mini";
export const ToolSchema = z.object({
  name: z.string(),
  title: z.optional(z.string()),
  description: z.optional(z.string()),
  inputSchema: z.optional(z.unknown()),
  annotations: z.optional(
    z.looseObject({
      readOnlyHint: z.optional(z.boolean()),
      title: z.optional(z.string()),
    }),
  ),
  _meta: z.optional(
    z.looseObject({
      ui: z.optional(
        z.looseObject({
          resourceUri: z.optional(z.string()),
          visibility: z.optional(z.array(z.string())),
        }),
      ),
      "ui/resourceUri": z.optional(z.string()),
    }),
  ),
});
export type Tool = z.infer<typeof ToolSchema>;
export const toolList = (value: unknown): Tool[] => {
  if (!Array.isArray(value)) return [];
  const values: unknown[] = value;
  return values.flatMap((item) => {
    const parsed = ToolSchema.safeParse(item);
    return parsed.success ? [parsed.data] : [];
  });
};
export function cachedTools(
  raw: string | null | undefined,
  issue: (kind: string) => void = () => {},
): Tool[] {
  if (!raw) return [];
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    issue("tools-json");
    return [];
  }
  const tools = toolList(value);
  if (!Array.isArray(value) || value.length !== tools.length) issue("tools");
  return tools;
}
