import { type Link, Mark } from "~/components/ui";

export interface Props {
	/** @title Link do logo */
	homeHref?: string;
	/** @title Nome acessível do logo */
	homeLabel?: string;
	/** @title Links do menu */
	links?: Link[];
	/** @title Outro idioma (texto, ex.: EN) */
	langLabel?: string;
	/** @title Outro idioma (link) */
	langHref?: string;
	/** @title Código do outro idioma (ex.: en, pt-BR) */
	langCode?: string;
	/** @title Botão Entrar */
	signIn?: Link;
}

/** Sticky top bar: logo, links, the other language and sign in. */
export default function Nav(p: Props) {
	return (
		<nav>
			<div className="w">
				<a className="logo" href={p.homeHref ?? "/pt"} aria-label={p.homeLabel}>
					<Mark star />
					vibebook
				</a>
				<span className="sp" />
				{(p.links ?? []).map((l) => (
					<a key={l.href} className="l" href={l.href}>
						{l.label}
					</a>
				))}
				{p.langHref ? (
					<a className="l" href={p.langHref} hrefLang={p.langCode} lang={p.langCode}>
						{p.langLabel}
					</a>
				) : null}
				{p.signIn ? (
					<a className="btn sec sm" href={p.signIn.href}>
						{p.signIn.label}
					</a>
				) : null}
			</div>
		</nav>
	);
}

// Bundled with the page (not lazy), so hydration never blanks it.
export const sync = true;
