import { V as e, a as t, d as n, g as r, i, j as a, o, p as s, z as c } from "./Button-Cx7HMFHY.js";
import { Et as l, F as u, Tt as d, Yt as f, q as p } from "./shared-qe__81Sz.js";
import { t as m } from "./Icon-Ch3wLUmI.js";
// svelte/lib/ui/Checkbox.svelte
var h = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"checked",
	"indeterminate",
	"class",
	"onchange",
	"onCheckedChange"
]), g = e("<span class=\"tw:h-0.5 tw:w-2 tw:bg-current\"></span>"), _ = e("<span aria-hidden=\"true\" class=\"tw:pointer-events-none tw:absolute tw:inset-0 tw:grid tw:place-items-center tw:text-primary-foreground\"><!></span>"), v = e("<span class=\"tw:relative tw:inline-flex tw:shrink-0 tw:align-middle\"><input/> <!></span>");
function y(e, y) {
	l(y, !0);
	let b = t(y, "checked", 15, !1), x = t(y, "indeterminate", 15, !1), S = o(y, h);
	var C = v(), w = u(C), T = (e) => {
		y.onchange?.(e), y.onCheckedChange?.(e.currentTarget.checked);
	};
	r(w, (e) => ({
		type: "checkbox",
		...S,
		onchange: T,
		class: e
	}), [() => i("tw:m-0 tw:size-4 tw:shrink-0 tw:appearance-none tw:rounded-sm tw:border tw:border-input tw:bg-card tw:p-0 tw:outline-none tw:checked:border-primary tw:checked:bg-primary tw:indeterminate:border-primary tw:indeterminate:bg-primary tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive", y.class)], void 0, void 0, void 0, !0);
	var E = p(w, 2), D = (e) => {
		var t = _(), n = u(t), r = (e) => {
			var t = g();
			c(e, t);
		}, i = (e) => {
			m(e, {
				name: "check",
				class: "tw:size-3"
			});
		};
		a(n, (e) => {
			x() ? e(r) : e(i, -1);
		}), f(t), c(e, t);
	};
	a(E, (e) => {
		(b() || x()) && e(D);
	}), f(C), s(w, b), n("indeterminate", "change", w, x, x), c(e, C), d();
}
export { y as t };
