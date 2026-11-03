/** @titleBy label */
export interface Link {
	/** @title Texto */
	label: string;
	/** @title Link */
	href: string;
}

/** Copy that may carry <b>, <em>, <br> or a mention: rendered as HTML (it comes from the CMS, not from visitors). */
export function Html({ as: Tag = "span", html, className }: { as?: "span" | "p" | "h2" | "div"; html?: string; className?: string }) {
	return html ? <Tag className={className} dangerouslySetInnerHTML={{ __html: html }} /> : null;
}

export function Logo({ href, label }: { href: string; label: string }) {
	return (
		<a className="logo" href={href} aria-label={label}>
			<svg viewBox="0 0 32 32" aria-hidden="true">
				<rect x="3" y="4" width="22" height="24" rx="5" fill="#fff" />
				<rect x="7" y="9" width="11" height="3" rx="1.5" fill="#1d5fc4" />
				<rect x="7" y="15" width="8" height="3" rx="1.5" fill="#1d5fc4" />
				<circle cx="24" cy="23" r="7" fill="#f2dc4a" />
				<path d="M24 19.5l1 2.4 2.5 1.1-2.5 1.1-1 2.4-1-2.4-2.5-1.1 2.5-1.1z" fill="#14305e" />
			</svg>
			vibebook
		</a>
	);
}
