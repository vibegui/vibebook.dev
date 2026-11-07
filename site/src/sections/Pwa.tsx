import { PhoneStage } from "~/components/mocks";
import { type Lang, Rich, useReveal } from "~/components/ui";

export interface Props {
	/** @title Título */
	title?: string;
	/** @title Texto */
	text?: string;
	/** @title Passos (**negrito** permitido) */
	steps?: string[];
	/** @title Idioma do celular */
	lang?: Lang;
}

/** The app on the phone's home screen: steps on the left, the tilted phone on the right. */
export default function Pwa(p: Props) {
	const ref = useReveal<HTMLElement>();
	return (
		<section ref={ref}>
			<div className="w pwa">
				<div className="rv">
					<h2>{p.title}</h2>
					{p.text ? <p className="b">{p.text}</p> : null}
					<ol className="steps">
						{(p.steps ?? []).map((s) => (
							<li key={s}>
								<span>
									<Rich text={s} />
								</span>
							</li>
						))}
					</ol>
				</div>
				<PhoneStage lang={p.lang ?? "pt"} />
			</div>
		</section>
	);
}

// Bundled with the page (not lazy), so hydration never blanks it.
export const sync = true;
