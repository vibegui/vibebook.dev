import { RowVisual, type Visual } from "~/components/mocks";
import { type Lang, type Link, Rich, useReveal } from "~/components/ui";

/** @titleBy title */
export interface Row {
	/** @title Título */
	title: string;
	/** @title Texto (**negrito** e `código` permitidos) */
	text?: string;
	/** @title Pontos (`código` permitido) */
	points?: string[];
	/** @title Link abaixo */
	more?: Link;
	/** @title Ilustração */
	visual: Visual;
	/** @title Ilustração à esquerda */
	flip?: boolean;
}

export interface Props {
	/** @title Linhas (texto + ilustração) */
	rows?: Row[];
	/** @title Idioma das ilustrações */
	lang?: Lang;
}

/** Text on one side, an illustration on the other; one or more rows. */
export default function Rows(p: Props) {
	const ref = useReveal<HTMLElement>();
	return (
		<section ref={ref}>
			<div className="w">
				{(p.rows ?? []).map((r, i) => (
					<div key={i} className={r.flip ? "row flip" : "row"}>
						<div className="rv">
							<h2>{r.title}</h2>
							{r.text ? (
								<p className="b">
									<Rich text={r.text} />
								</p>
							) : null}
							{r.points?.length ? (
								<ul className="pts">
									{r.points.map((t) => (
										<li key={t}>
											<Rich text={t} />
										</li>
									))}
								</ul>
							) : null}
							{r.more ? (
								<a className="more" href={r.more.href}>
									{r.more.label}
								</a>
							) : null}
						</div>
						<RowVisual lang={p.lang ?? "pt"} visual={r.visual} />
					</div>
				))}
			</div>
		</section>
	);
}

// Bundled with the page (not lazy), so hydration never blanks it.
export const sync = true;
