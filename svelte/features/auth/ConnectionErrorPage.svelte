<script lang="ts">
  import type { NativeAuthMetadata } from "../../../shared/nativeAuth";
  import AuthFrame from "./AuthFrame.svelte";
  import { buttonVariants } from "../../lib/ui/button";
  let { lang, failure, href }: {
    lang: "en" | "pt";
    failure: NonNullable<NativeAuthMetadata["connectionFailure"]>;
    href: string;
  } = $props();
  const copy = {
    en: {
      title: "Could not sign in to the connection",
      failed: "Sign-in could not be completed. Return to vibebook and try again from Apps.",
      forbidden: "You must be a member of this room to use its connections.",
      missing: "This connection is unavailable or has been removed.",
      rate: "Too many attempts. Wait a minute before trying again.",
      back: "Back to vibebook",
    },
    pt: {
      title: "Não deu pra entrar na conexão",
      failed: "Não foi possível concluir o login. Volte ao vibebook e tente novamente pela aba Apps.",
      forbidden: "Você precisa estar nesta sala para usar as conexões dela.",
      missing: "Esta conexão não está disponível ou foi removida.",
      rate: "Muitas tentativas. Espere um minuto antes de tentar novamente.",
      back: "Voltar ao vibebook",
    },
  } as const;
  const room = $derived(new URL(href).pathname.match(/^\/api\/books\/([a-z0-9]{6,40})\/connections\//)?.[1]);
  const back = $derived(room ? `/b/${room}?ui=svelte` : "/app?ui=svelte");
</script>

<AuthFrame title={copy[lang].title}>
  <p role="alert" class="tw:m-0 tw:text-muted-foreground">{copy[lang][failure]}</p>
  <a class={buttonVariants()} href={back}>{copy[lang].back}</a>
</AuthFrame>
