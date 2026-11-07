import { type Link, useReveal } from "~/components/ui";

/** @titleBy title */
export interface Item {
	/** @title Título */
	title: string;
	/** @title Texto */
	text: string;
}

export interface Props {
	/** @title Título */
	title?: string;
	/** @title Colunas */
	items?: Item[];
	/** @title Link abaixo */
	more?: Link;
}

/** "Your Claude stays yours": three short promises and a link to the security page. */
export default function Trust(p: Props) {
	const ref = useReveal<HTMLElement>();
	return (
		<section ref={ref}>
			<div className="w">
				<div className="lead rv">
					<h2>{p.title}</h2>
				</div>
				<div className="three rv">
					{(p.items ?? []).map((x, i) => (
						<div key={i}>
							<h3>{x.title}</h3>
							<p>{x.text}</p>
						</div>
					))}
				</div>
				{p.more ? (
					<a className="more rv" href={p.more.href}>
						{p.more.label}
					</a>
				) : null}
			</div>
		</section>
	);
}

// Bundled with the page (not lazy), so hydration never blanks it.
export const sync = true;
