import type { Link } from "~/components/ui";

export interface Props {
	/** @title Assinatura (antes do link) */
	credit?: string;
	/** @title Link da assinatura */
	creditLink?: Link;
	/** @title Links */
	links?: Link[];
}

export default function Footer(p: Props) {
	return (
		<footer>
			<div className="w">
				<span>
					{p.credit}{" "}
					{p.creditLink ? (
						<a href={p.creditLink.href} rel="noopener">
							{p.creditLink.label}
						</a>
					) : null}
				</span>
				<span className="sp" />
				{(p.links ?? []).map((l) => (
					<a key={l.href} href={l.href}>
						{l.label}
					</a>
				))}
			</div>
		</footer>
	);
}

// Bundled with the page (not lazy), so hydration never blanks it.
export const sync = true;
