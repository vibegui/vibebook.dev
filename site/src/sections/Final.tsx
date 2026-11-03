import type { Link } from "~/components/ui";

export interface Props {
	/** @title Título (parte branca) */
	title?: string;
	/** @title Título (parte amarela) */
	titleEm?: string;
	/** @title Botão principal */
	primary?: Link;
	/** @title Botão secundário */
	secondary?: Link;
}

/** Closing call to action on cobalt. */
export default function Final({ title, titleEm, primary, secondary }: Props) {
	return (
		<section className="final">
			<div className="wrap">
				<h2>
					{title}
					<br />
					<em>{titleEm}</em>
				</h2>
				<div className="cta-row">
					{primary ? (
						<a className="btn btn-sun" href={primary.href}>
							{primary.label}
						</a>
					) : null}
					{secondary ? (
						<a className="btn btn-line" href={secondary.href}>
							{secondary.label}
						</a>
					) : null}
				</div>
			</div>
		</section>
	);
}
