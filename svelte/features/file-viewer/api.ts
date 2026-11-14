import * as z from "zod/mini";
import { fileURL, type FileTarget } from "./model";
import type { FetchLike } from "../../transport";
export const FILE_PREVIEW_BYTES = 1_200_000;
export const FILE_PREVIEW_CHARACTERS = 300_000;
const FileResponseMetadata = z.object({
  type: z.string(),
  name: z.optional(z.string()),
  size: z.optional(z.number()),
});
export type FileResponseMetadata = z.infer<typeof FileResponseMetadata>;
export class FileReadFailure extends Error {
  constructor(
    readonly status: number,
    code: string,
  ) {
    super(code);
  }
}
function metadata(response: Response) {
  const disposition = response.headers.get("content-disposition") ?? "",
    encoded = /filename\*=UTF-8''([^;]+)/i.exec(disposition)?.[1];
  let name: string | undefined;
  try {
    if (encoded) name = decodeURIComponent(encoded);
  } catch {
    /* Invalid optional names never determine an executable type. */
  }
  const range = /^bytes \d+-\d+\/(\d+)$/.exec(
      response.headers.get("content-range") ?? "",
    ),
    length = response.headers.get("content-length");
  const size = range
    ? Number(range[1])
    : length && response.status === 200
      ? Number(length)
      : undefined;
  return FileResponseMetadata.parse({
    type: response.headers.get("content-type") ?? "application/octet-stream",
    name,
    size: Number.isSafeInteger(size) && Number(size) >= 0 ? size : undefined,
  });
}
function accepted(response: Response) {
  if (!response.ok)
    throw new FileReadFailure(
      response.status,
      response.status === 401
        ? "signed-out"
        : response.status === 403
          ? "forbidden"
          : response.status === 404
            ? "missing"
            : "read-failed",
    );
}
/** Binary GET is an explicit bounded adapter: raw navigation/media remains on the existing authorized endpoint. */
export function createFileReadApi(fetcher: FetchLike = fetch) {
  return {
    async probe(target: FileTarget, signal: AbortSignal) {
      const response = await fetcher(fileURL(target), {
        headers: { accept: "application/octet-stream", range: "bytes=0-0" },
        credentials: "same-origin",
        cache: "no-store",
        signal,
      });
      try {
        accepted(response);
        if (
          (response.status !== 200 && response.status !== 206) ||
          (response.status === 206 &&
            !/^bytes 0-0\/[1-9]\d*$/.test(
              response.headers.get("content-range") ?? "",
            ))
        )
          throw new FileReadFailure(response.status, "invalid-range");
        return metadata(response);
      } finally {
        await response.body?.cancel().catch(() => {});
      }
    },
    async text(target: FileTarget, signal: AbortSignal) {
      const response = await fetcher(fileURL(target), {
        headers: { accept: "text/plain" },
        credentials: "same-origin",
        cache: "no-store",
        signal,
      });
      try {
        accepted(response);
      } catch (error) {
        await response.body?.cancel().catch(() => {});
        throw error;
      }
      const info = metadata(response);
      if (!response.body) return { metadata: info, text: "", truncated: false };
      const reader = response.body.getReader(),
        decoder = new TextDecoder();
      let text = "",
        bytes = 0,
        truncated = false;
      try {
        for (;;) {
          const next = await reader.read();
          if (next.done) {
            text += decoder.decode();
            break;
          }
          const remaining = FILE_PREVIEW_BYTES - bytes;
          if (next.value.byteLength > remaining) {
            text += decoder.decode(
              next.value.subarray(0, Math.max(0, remaining)),
              { stream: true },
            );
            truncated = true;
            break;
          }
          bytes += next.value.byteLength;
          text += decoder.decode(next.value, { stream: true });
          if (text.length > FILE_PREVIEW_CHARACTERS) {
            truncated = true;
            break;
          }
          if (bytes === FILE_PREVIEW_BYTES) {
            const extra = await reader.read();
            if (!extra.done) truncated = true;
            else text += decoder.decode();
            break;
          }
        }
      } finally {
        await reader.cancel().catch(() => {});
        reader.releaseLock();
      }
      return {
        metadata: info,
        text: text.slice(0, FILE_PREVIEW_CHARACTERS),
        truncated: truncated || text.length > FILE_PREVIEW_CHARACTERS,
      };
    },
  };
}
export type FileReadApi = ReturnType<typeof createFileReadApi>;
