import { Html, type Link } from "~/components/ui";

export interface Props {
	/**
	 * @title Título
	 * @format rich-text
	 */
	title?: string;
	/** @title Texto */
	text?: string;
	/** @title Lista */
	bullets?: string[];
	/** @title Botão (star no GitHub) */
	cta?: Link;
	/**
	 * @title Código à direita (HTML dentro do <code>)
	 * @format textarea
	 */
	code?: string;
}

/** Open source block on deep cobalt: pitch, bullets, star button and the deploy snippet. */
export default function OpenSource({ title, text, bullets = [], cta, code }: Props) {
	return (
		<section className="oss">
			<div className="wrap oss-grid">
				<div>
					<Html as="h2" className="h2" html={title} />
					{text ? <p className="sub">{text}</p> : null}
					<ul>
						{bullets.map((b) => (
							<li key={b}>{b}</li>
						))}
					</ul>
					{cta ? (
						<div className="cta-row" style={{ marginTop: 30 }}>
							<a className="btn btn-sun" href={cta.href} rel="noopener">
								<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
									<path d="M12 2.5l2.9 6 6.6.8-4.9 4.6 1.3 6.5L12 17.2l-5.9 3.2 1.3-6.5L2.5 9.3l6.6-.8z" fill="currentColor" />
								</svg>
								{cta.label}
							</a>
						</div>
					) : null}
				</div>
				{code ? (
					<pre>
						<code dangerouslySetInnerHTML={{ __html: code }} />
					</pre>
				) : null}
			</div>
		</section>
	);
}
