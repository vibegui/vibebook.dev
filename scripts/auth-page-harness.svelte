<script lang="ts">
  import type { Readable } from "svelte/store";
  import type { AuthApi } from "../svelte/features/auth/api";
  import type { NativeAuthMetadata } from "../shared/nativeAuth";
  import AuthRoot from "../svelte/features/auth/AuthRoot.svelte";
  let {
    href,
    page,
    api,
    navigate,
  }: {
    href: Readable<string>;
    page: NativeAuthMetadata["page"];
    api: AuthApi;
    navigate: (url: string) => void;
  } = $props();
</script>

<AuthRoot
  metadata={{ page, lang: "en", autoAccess: false }}
  href={$href}
  {api}
  {navigate}
/>
