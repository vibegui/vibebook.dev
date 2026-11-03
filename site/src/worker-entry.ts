/**
 * Cloudflare Worker entry: the deco/TanStack pages (/pt, /en) plus the Studio admin endpoints. Nothing else.
 * In production it sits behind the main vibebook Worker, which handles "/" (locale redirect) and forwards
 * /pt, /en, /_site/* and /deco/* here.
 */
import "./setup";
import "./server/admin-setup";
import {
	corsHeaders,
	handleDecofileRead,
	handleDecofileReload,
	handleMeta,
	handleRender,
} from "@decocms/blocks-admin";
import { createDecoWorkerEntry } from "@decocms/tanstack";
import handler, { createServerEntry } from "@tanstack/react-start/server-entry";

const deco = createDecoWorkerEntry(createServerEntry({ fetch: handler.fetch }), {
	admin: { handleMeta, handleDecofileRead, handleDecofileReload, handleRender, corsHeaders },
	securityHeaders: {
		"Content-Security-Policy": [
			"default-src 'self' https: data: blob:",
			"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.cloudflareinsights.com",
			"img-src 'self' https: data: blob:",
			"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
			"font-src 'self' data: https://fonts.gstatic.com",
			"object-src 'none'",
			"base-uri 'self'",
		].join("; "),
	},
});

export default {
	fetch(request: Request, env: Parameters<typeof deco.fetch>[1], ctx: Parameters<typeof deco.fetch>[2]) {
		// Standalone (Studio sandbox, workers.dev): "/" has no page of its own, send it to Portuguese.
		if (new URL(request.url).pathname === "/") return Response.redirect(new URL("/pt", request.url), 302);
		return deco.fetch(request, env, ctx);
	},
};
