import { L as e, S as t, V as n, W as r, Y as i, i as a, j as o, q as s, v as c, x as l, z as u } from "./Button-Cx7HMFHY.js";
import { $ as d, A as f, Et as p, F as m, Tt as h, Yt as g, j as _, lt as v, tt as y, u as b } from "./shared-qe__81Sz.js";
// svelte/lib/ui/Avatar.svelte
var x = n("<img alt=\"\" class=\"tw:size-full tw:object-cover\"/>"), S = n("<span aria-hidden=\"true\"><!></span>");
function C(n, C) {
	p(C, !0);
	let w = y(!1);
	_(() => {
		C.src, d(w, !1);
	});
	let T = v(() => C.name.trim().split(/[\s@._-]+/).filter(Boolean).slice(0, 2).map((e) => Array.from(e)[0]).join("").toLocaleUpperCase());
	var E = S(), D = m(E), O = (e) => {
		var t = x();
		f(() => c(t, "src", C.src)), s("error", t, () => {
			d(w, !0);
		}), i(t), u(e, t);
	}, k = (t) => {
		var n = r();
		f(() => e(n, b(T) || "?")), u(t, n);
	};
	o(D, (e) => {
		C.src && !b(w) ? e(O) : e(k, -1);
	}), g(E), f((e) => l(E, 1, e), [() => t(a("tw:inline-grid tw:size-8 tw:shrink-0 tw:place-items-center tw:overflow-hidden tw:rounded-full tw:border tw:border-border tw:bg-muted tw:font-sans tw:text-xs tw:font-medium tw:text-foreground", C.class))]), u(n, E), h();
}
export { C as t };
