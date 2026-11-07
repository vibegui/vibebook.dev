import { useReveal } from "~/components/ui";

/** @titleBy title */
export interface Item {
	/** @title Título */
	title: string;
	/** @title Complemento (itálico) */
	sub?: string;
	/** @title Texto */
	text: string;
}

export interface Props {
	/** @title Âncora (id) */
	id?: string;
	/** @title Título */
	title?: string;
	/** @title Texto */
	text?: string;
	/** @title Colunas */
	items?: Item[];
}

/** Centered lead, then three columns (chat, tasks, doc). */
export default function Trio(p: Props) {
	const ref = useReveal<HTMLElement>();
	return (
		<section id={p.id} ref={ref}>
			<div className="w">
				<div className="lead c rv">
					<h2>{p.title}</h2>
					{p.text ? <p>{p.text}</p> : null}
				</div>
				<div className="trio rv">
					{(p.items ?? []).map((x, i) => (
						<div key={i}>
							<h3>
								{x.title} {x.sub ? <i>{x.sub}</i> : null}
							</h3>
							<p>{x.text}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// Bundled with the page (not lazy), so hydration never blanks it.
export const sync = true;
