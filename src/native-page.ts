import type { Env } from "./index";
import { reqLang } from "./lang";
import { NativeAuthMetadata } from "../shared/nativeAuth";
import { UI_VERSION_HEX_LENGTH } from "../shared/uiVersion";

function oneAsset(
  shell: string,
  attribute: "src" | "href",
  name: "app.js" | "ui.css",
) {
  const path = `/svelte-preview/${name}`;
  const matches = [
    ...shell.matchAll(
      new RegExp(
        `\\b${attribute}=["'](${path.replaceAll(".", "\\.")}[^"']*)["']`,
        "g",
      ),
    ),
  ];
  if (matches.length !== 1)
    throw new Error(`Native shell requires exactly one ${name} reference`);
  const value = matches[0]![1]!;
  if (
    !new RegExp(
      `^${path.replaceAll(".", "\\.")}\\?v=[a-f0-9]{${UI_VERSION_HEX_LENGTH}}$`,
    ).test(value)
  )
    throw new Error(`Native shell requires a versioned ${name} reference`);
  return value;
}
/** Reuse only allowlisted generated references, never the hybrid shell's authored styles or executable chrome. */
export function nativeAuthHtml(
  shell: string,
  metadata: NativeAuthMetadata,
  standardURL = "/login",
) {
  const data = NativeAuthMetadata.parse(metadata),
    app = oneAsset(shell, "src", "app.js"),
    css = oneAsset(shell, "href", "ui.css");
  if (app.split("?v=")[1] !== css.split("?v=")[1])
    throw new Error("Native shell assets have mismatched versions");
  const version = app.split("?v=")[1]!;
  if (
    !standardURL.startsWith("/") ||
    standardURL.startsWith("//") ||
    /[\\\u0000-\u0020\u007f]/.test(standardURL)
  )
    throw new Error("Invalid standard page URL");
  const fallback = standardURL.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );
  return `<!doctype html><html lang="${data.lang === "en" ? "en" : "pt-BR"}"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
<meta name="robots" content="noindex" /><meta name="vb-ui" content="svelte" /><meta name="vb-page" content="${data.page}" /><meta name="vb-auto-access" content="${data.autoAccess ? "1" : "0"}" /><meta name="vb-v" content="${version}" />
<title>vibebook</title><link rel="icon" href="/favicon.svg" type="image/svg+xml" /><link rel="stylesheet" href="${css}" /></head>
<body class="tw:m-0 tw:min-h-dvh tw:bg-background tw:font-sans tw:text-foreground"><div id="app"></div><noscript><main><p>${data.lang === "en" ? "This preview requires JavaScript." : "Esta versão requer JavaScript."}</p><a href="${fallback}">${data.lang === "en" ? "Open the standard page" : "Abrir a página padrão"}</a></main></noscript><script type="module" src="${app}"></script></body></html>`;
}
export async function nativeAuthPage(
  env: Env,
  request: Request,
  page: NativeAuthMetadata["page"],
  options: { autoAccess?: boolean; status?: 200 | 400 | 404 } = {},
) {
  const headers = {
    "content-type": "text/html; charset=utf-8",
    "cache-control": "no-store",
    "x-vibebook-ui": "svelte",
    "x-frame-options": "DENY",
    "content-security-policy": "frame-ancestors 'none'",
  };
  try {
    const asset = await env.ASSETS.fetch(
      new Request(new URL("/app-svelte", request.url)),
    );
    if (asset.status !== 200) throw new Error("Native shell missing");
    const standard = new URL(request.url);
    standard.searchParams.delete("ui");
    const html = nativeAuthHtml(
      await asset.text(),
      { page, lang: reqLang(request), autoAccess: !!options.autoAccess },
      standard.pathname + standard.search,
    );
    return new Response(html, { status: options.status ?? 200, headers });
  } catch {
    return new Response(
      "Native application assets are unavailable. Rebuild the Svelte preview and try again.",
      {
        status: 503,
        headers: { ...headers, "content-type": "text/plain; charset=utf-8" },
      },
    );
  }
}
