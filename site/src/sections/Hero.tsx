import { HeroRoom } from "~/components/mocks";
import { type Lang, type Link, Rich, useReveal } from "~/components/ui";

export interface Props {
	/** @title Título (linha branca) */
	title?: string;
	/** @title Título (linha amarela) */
	highlight?: string;
	/** @title Texto de apoio (**negrito** permitido) */
	lede?: string;
	/** @title Botão principal */
	primary?: Link;
	/** @title Botão secundário */
	secondary?: Link;
	/** @title Letra miúda */
	fine?: string;
	/** @title Idioma da sala de exemplo */
	lang?: Lang;
}

/** Centered headline, then the animated sample room. */
export default function Hero(p: Props) {
	const ref = useReveal<HTMLElement>();
	return (
		<header className="hero" ref={ref}>
			<div className="w">
				<h1 className="rv">
					{p.title}
					<br />
					<em>{p.highlight}</em>
				</h1>
				<p className="lede rv">
					<Rich text={p.lede} />
				</p>
				<div className="ctas rv">
					{p.primary ? (
						<a className="btn pri" href={p.primary.href}>
							{p.primary.label}
						</a>
					) : null}
					{p.secondary ? (
						<a className="btn sec" href={p.secondary.href}>
							{p.secondary.label}
						</a>
					) : null}
				</div>
				{p.fine ? <small className="under rv">{p.fine}</small> : null}
			</div>
			<div className="shotw rv" aria-hidden="true">
				<HeroRoom lang={p.lang ?? "pt"} />
			</div>
		</header>
	);
}

// Bundled with the page (not lazy), so hydration never blanks it.
export const sync = true;
