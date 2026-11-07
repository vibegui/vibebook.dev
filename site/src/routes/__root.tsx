import { DecoRootLayout } from "@decocms/tanstack";
import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, useRouterState } from "@tanstack/react-router";
// Inlined: no render-blocking stylesheet request (the old landing loaded /landing.css).
import appCss from "../styles/app.css?inline";

// Head tags per locale, the same the static landing had. Page copy lives in .deco/blocks.
const HEAD = {
	pt: {
		title: "vibebook · colabore na velocidade do Claude",
		description:
			"Um vibebook por projeto ou conversa importante: chat, tarefas e doc integrados. Cada pessoa traz o seu Claude, e eles tocam o trabalho juntos a partir do mesmo contexto.",
		image: "https://vibebook.dev/og.png?v=2",
		alt: "vibebook: uma sala onde pessoas e os agents delas trabalham juntas",
		locale: "pt_BR",
	},
	en: {
		title: "vibebook · collaborate at Claude speed",
		description:
			"One vibebook per project or important conversation: chat, tasks and doc in one place. Everyone brings their own Claude, and they move the work together from the same context.",
		image: "https://vibebook.dev/og-en.png?v=2",
		alt: "vibebook: a room where people and their agents work together",
		locale: "en_US",
	},
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
	head: ({ matches }) => {
		const lang = matches.some((m) => m.pathname.startsWith("/en")) ? "en" : "pt";
		const h = HEAD[lang];
		const url = `https://vibebook.dev/${lang}`;
		return {
			meta: [
				{ charSet: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
				{ title: h.title },
				{ name: "description", content: h.description },
				// iOS paints its bars from this and from html/body (--bg, see app.css).
				{ name: "theme-color", content: "#0a0d13" },
				{ property: "og:type", content: "website" },
				{ property: "og:site_name", content: "vibebook" },
				{ property: "og:url", content: url },
				{ property: "og:title", content: h.title },
				{ property: "og:description", content: h.description },
				{ property: "og:image", content: h.image },
				{ property: "og:image:width", content: "1200" },
				{ property: "og:image:height", content: "630" },
				{ property: "og:image:alt", content: h.alt },
				{ property: "og:locale", content: h.locale },
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:title", content: h.title },
				{ name: "twitter:description", content: h.description },
				{ name: "twitter:image", content: h.image },
			],
			links: [
				{ rel: "canonical", href: url },
				{ rel: "alternate", hrefLang: "pt-BR", href: "https://vibebook.dev/pt" },
				{ rel: "alternate", hrefLang: "en", href: "https://vibebook.dev/en" },
				{ rel: "alternate", hrefLang: "x-default", href: "https://vibebook.dev/" },
				{ rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
				{ rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
				{ rel: "preconnect", href: "https://fonts.googleapis.com" },
				{ rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Caprasimo&family=Fraunces:ital,opsz,wght,SOFT,WONK@0,9..144,400..700,0..100,0..1;1,9..144,400..700,0..100,0..1&family=Schibsted+Grotesk:wght@400;500;600;700&display=swap",
				},
			],
			styles: [{ children: appCss }],
		};
	},
	component: Root,
});

function Root() {
	const path = useRouterState({ select: (s) => s.location.pathname });
	return <DecoRootLayout siteName="vibebook" lang={path.startsWith("/en") ? "en" : "pt-BR"} />;
}
