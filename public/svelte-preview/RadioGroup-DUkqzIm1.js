import { G as e, K as t, L as n, O as r, S as i, U as a, V as o, _ as s, a as c, i as l, j as u, m as d, v as f, x as p, z as m } from "./Button-Cx7HMFHY.js";
import { A as h, Et as g, F as _, G as v, Tt as y, Yt as b, q as x, u as S } from "./shared-qe__81Sz.js";
// svelte/lib/ui/RadioGroup.svelte
var C = o("<span aria-hidden=\"true\" class=\"tw:pointer-events-none tw:absolute tw:inset-1 tw:rounded-full tw:bg-primary\"></span>"), w = o("<label class=\"tw:flex tw:items-center tw:gap-2\"><span class=\"tw:relative tw:inline-flex tw:size-4 tw:shrink-0\"><input type=\"radio\" class=\"tw:m-0 tw:size-4 tw:appearance-none tw:rounded-full tw:border tw:border-input tw:bg-card tw:p-0 tw:outline-none tw:checked:border-primary tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:opacity-50\"/> <!></span> <span> </span></label>"), T = o("<div role=\"radiogroup\"></div>");
function E(e, o) {
	let E = a();
	g(o, !0);
	let D = [], O = c(o, "value", 15, ""), k = c(o, "name", 3, E), A = c(o, "disabled", 3, !1);
	var j = T();
	r(j, 21, () => o.items, (e) => e.value, (e, r) => {
		var i = w(), a = _(i), c = _(a);
		s(c);
		var l, p = x(c, 2), g = (e) => {
			var t = C();
			m(e, t);
		};
		u(p, (e) => {
			O() === S(r).value && e(g);
		}), b(a);
		var y = x(a, 2), T = v(y, !0);
		b(i), h(() => {
			f(c, "name", k()), c.disabled = A() || S(r).disabled, l !== (l = S(r).value) && (c.value = (c.__value = l) ?? ""), n(T, S(r).label);
		}), t("change", c, (e) => o.onValueChange?.(S(r).value, e)), d(D, [], c, () => (S(r).value, O()), O), m(e, i);
	}), b(j), h((e) => {
		f(j, "aria-label", o.label), p(j, 1, e);
	}, [() => i(l("tw:grid tw:grid-cols-1 tw:gap-2 tw:font-sans tw:text-sm tw:text-foreground", o.class))]), m(e, j), y();
}
e(["change"]);
export { E as t };
