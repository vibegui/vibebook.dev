import { useState } from "react";
import { type PersonaMock, PersonaRoom } from "~/components/mocks";
import { type Lang, type Link, useReveal } from "~/components/ui";

/** @titleBy tab */
export interface Persona {
	/** @title Aba */
	tab: string;
	/** @title Título */
	title: string;
	/** @title Título (parte amarela) */
	highlight?: string;
	/** @title Pontos */
	points?: string[];
	/** @title Link "ver como é" */
	more?: Link;
	/** @title Sala de exemplo */
	mock: PersonaMock;
}

export interface Props {
	/** @title Título */
	title?: string;
	/** @title Abas */
	personas?: Persona[];
	/** @title Idioma das salas de exemplo */
	lang?: Lang;
}

/** "Who it's for": one tab per audience, each with a small sample room. */
export default function Personas(p: Props) {
	const ref = useReveal<HTMLElement>();
	const [cur, setCur] = useState(0);
	const list = p.personas ?? [];
	return (
		<section className="pz-land" ref={ref}>
			<div className="w">
				<div className="lead c rv">
					<h2>{p.title}</h2>
				</div>
				<div className="pz-tabs rv" role="tablist">
					{list.map((x, i) => (
						<button key={i} type="button" role="tab" aria-selected={i === cur} onClick={() => setCur(i)}>
							{x.tab}
						</button>
					))}
				</div>
				{list.map((x, i) => (
					<div key={i} className="pz-panel" hidden={i !== cur}>
						<div>
							<h3>
								{x.title}
								{x.highlight ? (
									<>
										{" "}
										<em>{x.highlight}</em>
									</>
								) : null}
							</h3>
							<ul className="pts">
								{(x.points ?? []).map((t) => (
									<li key={t}>{t}</li>
								))}
							</ul>
							{x.more ? (
								<a className="more" href={x.more.href}>
									{x.more.label}
								</a>
							) : null}
						</div>
						<PersonaRoom lang={p.lang ?? "pt"} mock={x.mock} />
					</div>
				))}
			</div>
		</section>
	);
}

// Bundled with the page (not lazy), so hydration never blanks it.
export const sync = true;
