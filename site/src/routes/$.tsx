import { CmsPage, cmsRouteConfig } from "@decocms/tanstack";
import { createFileRoute, notFound } from "@tanstack/react-router";

const config = cmsRouteConfig({ siteName: "vibebook", defaultTitle: "vibebook" });

export const Route = createFileRoute("/$")({
	...config,
	// A thrown notFound() gives a real 404 status instead of a 200 "not found" page.
	loader: async (ctx: Parameters<typeof config.loader>[0]) => {
		const page = await config.loader(ctx);
		if (!page) throw notFound();
		return page;
	},
	component: Page,
	notFoundComponent: () => (
		<section className="final">
			<div className="wrap">
				<h2>Essa página não existe.</h2>
				<div className="cta-row">
					<a className="btn btn-sun" href="/pt">
						Voltar pro início
					</a>
				</div>
			</div>
		</section>
	),
});

function Page() {
	const data = Route.useLoaderData() as Record<string, any>;
	return (
		<CmsPage
			sections={data.resolvedSections ?? []}
			deferredSections={data.deferredSections ?? []}
			pagePath={data.pagePath}
			pageUrl={data.pageUrl}
			device={data.device}
		/>
	);
}
