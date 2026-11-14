import { record } from "../shared/validation";

/** OAuth grant metadata is vendor-owned unknown data, including historical grants. */
export function grantMetadata(value: unknown): {
  gid?: string;
  client?: string;
} {
  if (!record(value)) return {};
  return {
    gid: typeof value.gid === "string" && value.gid ? value.gid : undefined,
    client: typeof value.client === "string" ? value.client : undefined,
  };
}
