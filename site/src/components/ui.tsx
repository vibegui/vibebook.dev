import { type ReactNode, useEffect, useRef } from "react";

/** @titleBy label */
export interface Link {
	/** @title Texto */
	label: string;
	/** @title Link */
	href: string;
}

/** Language of the illustrations (the mocks are code, their words live in components/mocks.tsx). */
export type Lang = "pt" | "en";

/**
 * Plain text from the CMS with two marks: **bold** and `code`. Everything is rendered as React text (escaped):
 * props never become HTML, because /deco/render previews sections with props taken from the URL.
 */
export function Rich({ text }: { text?: string }): ReactNode {
	if (!text) return null;
	return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/).map((s, i) =>
		s.length > 4 && s.startsWith("**") && s.endsWith("**") ? (
			<b key={i}>{s.slice(2, -2)}</b>
		) : s.length > 2 && s.startsWith("`") && s.endsWith("`") ? (
			<code key={i}>{s.slice(1, -1)}</code>
		) : (
			s
		),
	);
}

/** Fades `.rv` children in as they scroll into view (same observer as the static page). */
export function useReveal<T extends HTMLElement>() {
	const ref = useRef<T>(null);
	// No deps: a block added in Studio gets observed on the next render.
	useEffect(() => {
		const root = ref.current;
		if (!root) return;
		const io = new IntersectionObserver(
			(es) =>
				es.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("in");
						io.unobserve(e.target);
					}
				}),
			{ rootMargin: "0px 0px -8% 0px" },
		);
		root.querySelectorAll(".rv:not(.in)").forEach((el) => io.observe(el));
		return () => io.disconnect();
	});
	return ref;
}

export function Mark({ star = false }: { star?: boolean }) {
	return (
		<svg viewBox="0 0 32 32" aria-hidden="true">
			<rect x="3" y="4" width="22" height="24" rx="5" fill="#fff" />
			<rect x="7" y="9" width="11" height="3" rx="1.5" fill="#1d5fc4" />
			<rect x="7" y="15" width="8" height="3" rx="1.5" fill="#1d5fc4" />
			<circle cx="24" cy="23" r="7" fill="#f2dc4a" />
			{star ? <path d="M24 19.5l1 2.4 2.5 1.1-2.5 1.1-1 2.4-1-2.4-2.5-1.1 2.5-1.1z" fill="#14305e" /> : null}
		</svg>
	);
}
