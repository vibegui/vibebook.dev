import { Html } from "~/components/ui";

export interface Props {
	/**
	 * @title Esquerda
	 * @format rich-text
	 */
	left?: string;
	/**
	 * @title Direita
	 * @format rich-text
	 */
	right?: string;
}

export default function Footer({ left, right }: Props) {
	return (
		<footer>
			<div className="wrap">
				<Html html={left} />
				<Html html={right} />
			</div>
		</footer>
	);
}
