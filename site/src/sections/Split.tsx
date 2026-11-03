import { Html, type Link } from "~/components/ui";

/** @titleBy title */
export interface Rail {
	/** @title Ícone (um caractere) */
	icon: string;
	/** @title Título */
	title: string;
	/** @title Texto */
	text: string;
}

/** @titleBy name */
export interface Props {
	/** @title Nome no editor (só pra você achar a seção) */
	name?: string;
	/** @title Estilo (classe: shape-sec, epics, access, lead, trust ou vazio) */
	variant?: string;
	/** @title Âncora (id) */
	id?: string;
	/**
	 * @title Título
	 * @format rich-text
	 */
	title?: string;
	/**
	 * @title Parágrafos
	 * @format rich-text
	 */
	paragraphs?: string[];
	/** @title Selos (pílulas) */
	chips?: string[];
	/** @title Lista com ícones */
	rails?: Rail[];
	/** @title Botão */
	cta?: Link;
	/**
	 * @title Ilustração à direita (HTML)
	 * @format textarea
	 */
	art?: string;
	/**
	 * @title Faixa abaixo (HTML, opcional)
	 * @format textarea
	 */
	after?: string;
}

/** Text on the left, an illustration (or a list) on the right. Most of the page is this. */
export default function Split(p: Props) {
	return (
		<section className={p.variant || undefined} id={p.id}>
			<div className="wrap epic-grid">
				<div>
					<Html as="h2" className="h2" html={p.title} />
					{(p.paragraphs ?? []).map((t, i) => (
						<Html key={i} as="p" className="sub" html={t} />
					))}
					{p.chips?.length ? (
						<ul className="chips">
							{p.chips.map((c) => (
								<li key={c}>{c}</li>
							))}
						</ul>
					) : null}
					{p.rails?.length ? (
						<ul className="rails">
							{p.rails.map((r) => (
								<li key={r.title} data-i={r.icon}>
									<b>{r.title}</b>
									<span>{r.text}</span>
								</li>
							))}
						</ul>
					) : null}
					{p.cta ? (
						<p style={{ marginTop: 28 }}>
							<a className="btn btn-sun" href={p.cta.href} style={{ color: "var(--cobalt-ink)" }}>
								{p.cta.label}
							</a>
						</p>
					) : null}
				</div>
				{/* display: contents keeps the illustration a direct child of the grid, as in the static page. */}
				{p.art ? <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: p.art }} /> : null}
			</div>
			{p.after ? <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: p.after }} /> : null}
		</section>
	);
}
