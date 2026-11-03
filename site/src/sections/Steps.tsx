import { Html } from "~/components/ui";

/** @titleBy title */
export interface Step {
	/** @title Título */
	title: string;
	/** @title Texto */
	text: string;
}

export interface Props {
	/** @title Âncora (id) */
	id?: string;
	/**
	 * @title Título
	 * @format rich-text
	 */
	title?: string;
	/** @title Passos */
	steps?: Step[];
}

/** "You talk to yours": three steps in a row. */
export default function Steps({ id, title, steps = [] }: Props) {
	return (
		<section id={id}>
			<div className="wrap">
				<Html as="h2" className="h2" html={title} />
				<div className="steps">
					{steps.map((s) => (
						<div key={s.title} className="step">
							<h3>{s.title}</h3>
							<p>{s.text}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
