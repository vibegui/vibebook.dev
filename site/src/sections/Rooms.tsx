import { RoomsGrid } from "~/components/mocks";
import { type Lang, useReveal } from "~/components/ui";

/** @titleBy title */
export interface Compare {
	/** @title Título */
	title: string;
	/** @title Texto */
	text: string;
	/** @title Destaque (a coluna do vibebook) */
	highlight?: boolean;
}

export interface Props {
	/** @title Título */
	title?: string;
	/** @title Texto */
	text?: string;
	/** @title Comparação */
	compare?: Compare[];
	/** @title Idioma da grade de salas */
	lang?: Lang;
}

/** A vibebook per conversation: the grid of rooms, then Slack / Linear / vibebook. */
export default function Rooms(p: Props) {
	const ref = useReveal<HTMLElement>();
	return (
		<section ref={ref}>
			<div className="w">
				<div className="lead c rv">
					<h2>{p.title}</h2>
					{p.text ? <p>{p.text}</p> : null}
				</div>
				<RoomsGrid lang={p.lang ?? "pt"} />
				<div className="vs rv">
					{(p.compare ?? []).map((c, i) => (
						<div key={i} className={c.highlight ? "us" : undefined}>
							<h3>{c.title}</h3>
							<p>{c.text}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// Bundled with the page (not lazy), so hydration never blanks it.
export const sync = true;
