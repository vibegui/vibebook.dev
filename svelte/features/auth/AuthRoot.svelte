<script lang="ts">
  import type { NativeAuthMetadata } from "../../../shared/nativeAuth";
  import { createAuthApi, type AuthApi } from "./api";
  import { authText } from "./copy";
  import AuthFrame from "./AuthFrame.svelte";
  import LoginPage from "./LoginPage.svelte";
  import AccessPage from "./AccessPage.svelte";
  import ConsentPage from "./ConsentPage.svelte";
  import ConnectionErrorPage from "./ConnectionErrorPage.svelte";
  import { fileTargetFromURL } from "../file-viewer/model";
  let {
    metadata,
    href = location.href,
    api = createAuthApi(),
    navigate = (url: string) => location.assign(url),
  }: {
    metadata: NativeAuthMetadata | null;
    href?: string;
    api?: AuthApi;
    navigate?: (url: string) => void;
  } = $props();
  const url = $derived(new URL(href));
  const fileTarget = $derived(fileTargetFromURL(url, url.origin));
  const roomId = $derived(
    url.pathname.match(/^\/b\/([a-z0-9]{6,40})\/?$/)?.[1],
  );
</script>

{#key metadata ? metadata.page + url.origin + url.pathname + url.search + url.hash + String(metadata.autoAccess) + String(metadata.consentFailure) : "invalid"}
  {#if !metadata}<AuthFrame title="vibebook"
      ><p role="alert">{authText("en", "configError")}</p></AuthFrame
    >
  {:else if metadata.page === "login"}<LoginPage
      {api}
      search={url.search}
      origin={url.origin}
      lang={metadata.lang}
      {navigate}
    />
  {:else if metadata.page === "access"}{#if roomId}<AccessPage
        {api}
        id={roomId}
        fileId={/^#f[0-9a-f]{1,64}$/.test(url.hash)
          ? url.hash.slice(2)
          : undefined}
        auto={metadata.autoAccess}
        origin={url.origin}
        lang={metadata.lang}
        {navigate}
      />{:else}<AuthFrame title={authText(metadata.lang, "missing")}
        ><p>{authText(metadata.lang, "missingBody")}</p></AuthFrame
      >{/if}
  {:else if metadata.page === "file-access"}{#if fileTarget}<AccessPage
        {api}
        id={fileTarget.roomId}
        fileId={fileTarget.id}
        auto={false}
        origin={url.origin}
        lang={metadata.lang}
        {navigate}
      />{:else}<AuthFrame title={authText(metadata.lang, "missing")}
        ><p>{authText(metadata.lang, "missingBody")}</p></AuthFrame
      >{/if}
  {:else if metadata.page === "connection-error"}<ConnectionErrorPage lang={metadata.lang} failure={metadata.connectionFailure ?? "failed"} href={url.href} />
  {:else}<ConsentPage
      {api}
      search={url.search}
      lang={metadata.lang}
      initialFailure={!!metadata.consentFailure}
    />{/if}
{/key}
