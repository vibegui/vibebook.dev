import { Html, type Link, Logo } from "~/components/ui";

export interface Props {
	/** @title Link do logo */
	homeHref?: string;
	/** @title Nome acessível do logo */
	homeLabel?: string;
	/** @title Nome acessível do menu */
	navLabel?: string;
	/** @title Links do menu */
	nav?: Link[];
	/** @title Outro idioma (texto, ex.: EN) */
	langLabel?: string;
	/** @title Outro idioma (link) */
	langHref?: string;
	/** @title Código do outro idioma (ex.: en, pt-BR) */
	langCode?: string;
	/** @title Botão Entrar */
	signIn?: Link;
	/** @title Título (parte branca) */
	title?: string;
	/** @title Título (parte amarela) */
	titleEm?: string;
	/**
	 * @title Texto de apoio
	 * @format rich-text
	 */
	lede?: string;
	/** @title Botão principal */
	primary?: Link;
	/** @title Botão secundário */
	secondary?: Link;
	/** @title Letra miúda */
	fine?: string;
	/** @title Descrição da ilustração (leitores de tela) */
	sceneLabel?: string;
	/**
	 * @title Ilustração (HTML da sala de exemplo)
	 * @format textarea
	 */
	scene?: string;
}

/** Top of the page: nav, headline, CTAs and the sample room on the right. */
export default function Hero(p: Props) {
	return (
		<header className="hero">
			<div className="wrap">
				<nav aria-label={p.navLabel}>
					<Logo href={p.homeHref ?? "/pt"} label={p.homeLabel ?? "vibebook"} />
					<span className="sp" />
					{(p.nav ?? []).map((l) => (
						<a key={l.href} className="plain" href={l.href}>
							{l.label}
						</a>
					))}
					{p.langHref ? (
						<a className="lang" href={p.langHref} hrefLang={p.langCode} lang={p.langCode}>
							{p.langLabel}
						</a>
					) : null}
					{p.signIn ? (
						<a className="btn btn-line" href={p.signIn.href}>
							{p.signIn.label}
						</a>
					) : null}
				</nav>
				<div className="hero-grid">
					<div>
						<h1>
							{p.title} <em>{p.titleEm}</em>
						</h1>
						<Html as="p" className="lede" html={p.lede} />
						<div className="cta-row">
							{p.primary ? (
								<a className="btn btn-sun" href={p.primary.href}>
									{p.primary.label}
								</a>
							) : null}
							{p.secondary ? (
								<a className="btn btn-line" href={p.secondary.href}>
									{p.secondary.label}
								</a>
							) : null}
						</div>
						{p.fine ? <p className="fine">{p.fine}</p> : null}
					</div>
					{p.scene ? <div className="scene" role="img" aria-label={p.sceneLabel} dangerouslySetInnerHTML={{ __html: p.scene }} /> : null}
				</div>
			</div>
		</header>
	);
}
