import { F as e, L as t, V as n, a as r, j as i, z as a } from "./Button-Cx7HMFHY.js";
import { A as o, An as s, F as c, G as l, Yt as u, q as d } from "./shared-qe__81Sz.js";
import { t as f } from "./Icon-Ch3wLUmI.js";
// svelte/lib/components/EmptyState.svelte
var p = n("<p class=\"tw:m-0 tw:max-w-sm tw:leading-5 tw:text-muted-foreground\"> </p>"), m = n("<div class=\"tw:flex tw:flex-col tw:items-center tw:gap-3 tw:px-6 tw:py-10 tw:text-center tw:font-sans tw:text-sm tw:text-foreground\"><span class=\"tw:grid tw:size-10 tw:place-items-center tw:rounded-surface tw:border tw:border-border tw:bg-muted\"><!></span> <div class=\"tw:space-y-1\"><p class=\"tw:m-0 tw:font-medium\"> </p> <!></div> <!></div>");
function h(n, h) {
	let g = r(h, "icon", 3, "inbox");
	var _ = m(), v = c(_), y = c(v);
	f(y, {
		get name() {
			return g();
		},
		class: "tw:size-5"
	}), u(v);
	var b = d(v, 2), x = c(b), S = l(x, !0), C = d(x, 2), w = (e) => {
		var n = p(), r = l(n, !0);
		o(() => t(r, h.description)), a(e, n);
	};
	i(C, (e) => {
		h.description && e(w);
	}), u(b);
	var T = d(b, 2);
	e(T, () => h.children ?? s), u(_), o(() => t(S, h.title)), a(n, _);
}
export { h as t };
