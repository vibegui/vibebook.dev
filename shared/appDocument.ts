import { parse } from "parse5";
import { z } from "zod";
import { appDocumentBootstrap } from "./generated/appDocumentBootstrap";
import { APP_DOCUMENT_NONCE_PLACEHOLDER } from "./appDocumentProtocol";

export const AppDocumentClaim = z.strictObject({
  nonce: z.string().regex(/^[a-f0-9]{64}$/),
});

/** Preserve the original doctype/quirks mode and URL; insert before any app code. */
export function withAppDocumentBootstrap(html: string, nonce: string): string {
  AppDocumentClaim.parse({ nonce });
  const tree = parse(html, { sourceCodeLocationInfo: true });
  const doctype = tree.childNodes.find(
    (node) => node.nodeName === "#documentType",
  );
  const offset = doctype?.sourceCodeLocation?.endOffset ?? 0;
  const script = appDocumentBootstrap.replace(
    APP_DOCUMENT_NONCE_PLACEHOLDER,
    nonce,
  );
  return `${html.slice(0, offset)}<script>${script}</script>${html.slice(offset)}`;
}
