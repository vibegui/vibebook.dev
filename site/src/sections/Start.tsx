import { useState } from "react";
import { type Link, useReveal } from "~/components/ui";

export interface Props {
	/** @title Título */
	title?: string;
	/** @title Texto */
	text?: string;
	/** @title Frase pra copiar */
	command?: string;
	/** @title Botão copiar */
	copy?: string;
	/** @title Botão depois de copiar */
	copied?: string;
	/** @title Botão quando não deu pra copiar */
	failed?: string;
	/** @title Texto antes do link alternativo */
	altText?: string;
	/** @title Link alternativo */
	alt?: Link;
}

/** The one sentence to paste into Claude Code, with a copy button. */
export default function Start(p: Props) {
	const ref = useReveal<HTMLElement>();
	const [label, setLabel] = useState<string | undefined>();
	const onCopy = async () => {
		try {
			await navigator.clipboard.writeText(p.command ?? "");
			setLabel(p.copied);
		} catch {
			setLabel(p.failed);
		}
		setTimeout(() => setLabel(undefined), 2200);
	};
	return (
		<section style={{ paddingTop: 40 }} ref={ref}>
			<div className="w">
				<div className="start rv">
					<h2>{p.title}</h2>
					{p.text ? <p>{p.text}</p> : null}
					<div className="cmd">
						<code>{p.command}</code>
						<button className="btn pri sm" type="button" onClick={onCopy}>
							{label ?? p.copy}
						</button>
					</div>
					{p.alt ? (
						<span className="alt">
							{p.altText} <a href={p.alt.href}>{p.alt.label}</a>
						</span>
					) : null}
				</div>
			</div>
		</section>
	);
}

// Bundled with the page (not lazy), so hydration never blanks it.
export const sync = true;
