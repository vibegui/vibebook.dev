import { useState } from "react";
import { Html, type Link } from "~/components/ui";

/** @titleBy title */
export interface Step {
	/** @title Título */
	title: string;
	/** @title Texto */
	text: string;
	/** @title Comando (opcional) */
	code?: string;
}

/** @titleBy text */
export interface Line {
	/**
	 * @title Tipo
	 * @description me = o que você digita; ok = resposta do Claude; bell = aviso da sala; ai = o Claude agindo; sep = separador
	 */
	kind: "me" | "ok" | "bell" | "ai" | "sep";
	/** @title Texto */
	text: string;
}

/** @titleBy text */
export interface RoomMsg {
	/** @title Quem (iniciais no avatar) */
	who: string;
	/** @title Nome */
	name: string;
	/** @title É agent? */
	agent?: boolean;
	/**
	 * @title Texto
	 * @format rich-text
	 */
	text: string;
}

/** @title {{{kicker}}} */
export interface Props {
	/** @title Rótulo */
	kicker?: string;
	/**
	 * @title Título
	 * @format rich-text
	 */
	title?: string;
	/**
	 * @title Texto
	 * @format rich-text
	 */
	lede?: string;
	/** @title Card: rótulo */
	askLabel?: string;
	/** @title Card: a frase pro Claude */
	ask?: string;
	/** @title Card: botão copiar */
	copyLabel?: string;
	/** @title Passos (opcional) */
	steps?: Step[];
	/** @title Botão */
	cta?: Link;
	/** @title Terminal: pasta do projeto */
	cwd?: string;
	/** @title Terminal: linhas */
	lines?: Line[];
	/** @title Sala: nome */
	room?: string;
	/** @title Sala: mensagens */
	messages?: RoomMsg[];
	/** @title Sala: rodapé (lido por…) */
	seen?: string;
}

/** The repo ↔ room loop: install the plugin, ask for a room, listen, and the room reaches your Claude. */
export default function Plugin(p: Props) {
	const [copied, setCopied] = useState(false);
	const copy = () => {
		navigator.clipboard?.writeText(p.ask ?? "");
		setCopied(true);
		setTimeout(() => setCopied(false), 1200);
	};
	return (
		<section className="plug" id="plugin">
			<div className="wrap plug-grid">
				<div className="plug-copy">
					{p.kicker ? <p className="plug-kicker">{p.kicker}</p> : null}
					<Html as="h2" className="h2" html={p.title} />
					<Html as="p" className="sub" html={p.lede} />
					{p.ask ? (
						<div className="plug-ask">
							{p.askLabel ? <span>{p.askLabel}</span> : null}
							<code>{p.ask}</code>
							<button type="button" className="btn btn-sun" onClick={copy}>
								{copied ? "✓" : p.copyLabel || "Copiar"}
							</button>
						</div>
					) : null}
					{p.steps?.length ? <ol className="plug-steps">
						{(p.steps ?? []).map((s, i) => (
							<li key={s.title} style={{ ["--i" as string]: i }}>
								<b>{s.title}</b>
								<span>{s.text}</span>
								{s.code ? <code>{s.code}</code> : null}
							</li>
						))}
					</ol> : null}
					{p.cta ? (
						<p className="plug-cta">
							<a className="plug-link" href={p.cta.href}>
								{p.cta.label}
							</a>
						</p>
					) : null}
				</div>
				<div className="plug-art" aria-hidden="true">
					<div className="plug-term">
						<div className="plug-bar">
							<i />
							<i />
							<i />
							<span>claude · {p.cwd || "~/projeto"}</span>
						</div>
						<div className="plug-lines">
							{(p.lines ?? []).map((l, i) => (
								<div key={i} className={`pl ${l.kind}`} style={{ ["--i" as string]: i }}>
									{l.text}
								</div>
							))}
						</div>
					</div>
					{p.messages?.length ? (
						<div className="plug-room">
							<div className="plug-room-h">
								<span className="ri" style={{ background: "var(--cobalt)" }}>
									#
								</span>
								{p.room}
							</div>
							{p.messages.map((m, i) => (
								<div key={i} className="plug-msg" style={{ ["--i" as string]: i }}>
									<span className={`av ${m.agent ? "agent" : ""}`} style={{ background: m.agent ? "var(--cobalt)" : "var(--coral)" }}>
										{m.who}
									</span>
									<div>
										<div className="n">
											{m.name}
											{m.agent ? <span className="tag">✦ agent</span> : null}
										</div>
										<Html as="div" className="x" html={m.text} />
									</div>
								</div>
							))}
							{p.seen ? <div className="plug-seen">{p.seen}</div> : null}
						</div>
					) : null}
				</div>
			</div>
		</section>
	);
}
