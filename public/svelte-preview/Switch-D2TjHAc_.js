import { S as e, V as t, a as n, g as r, i, o as a, p as o, x as s, z as c } from "./Button-Cx7HMFHY.js";
import { A as l, Et as u, F as d, Tt as f, Yt as p, q as m } from "./shared-qe__81Sz.js";
// svelte/lib/ui/Switch.svelte
var h = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"checked",
	"controlled",
	"class",
	"onchange",
	"onCheckedChange"
]), g = t("<span class=\"tw:relative tw:inline-flex tw:shrink-0 tw:align-middle\"><input/> <span aria-hidden=\"true\"></span></span>");
function _(t, _) {
	u(_, !0);
	let v = n(_, "checked", 15, !1), y = n(_, "controlled", 3, !1), b = a(_, h);
	var x = g(), S = d(x), C = (e) => {
		let t = e.currentTarget.checked;
		y() && (e.currentTarget.checked = v()), _.onchange?.(e), _.onCheckedChange?.(t);
	};
	r(S, (e) => ({
		type: "checkbox",
		role: "switch",
		"aria-checked": v(),
		...b,
		onchange: C,
		class: e
	}), [() => i("tw:m-0 tw:h-5 tw:w-9 tw:appearance-none tw:rounded-full tw:border tw:border-transparent tw:bg-input tw:p-0 tw:outline-none tw:transition-colors tw:checked:bg-primary tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:motion-reduce:transition-none", _.class)], void 0, void 0, void 0, !0);
	var w = m(S, 2);
	p(x), l((e) => s(w, 1, e), [() => e(i("tw:pointer-events-none tw:absolute tw:left-0.5 tw:top-0.5 tw:size-4 tw:rounded-full tw:bg-card tw:shadow-xs tw:transition-transform tw:motion-reduce:transition-none", v() ? "tw:translate-x-4" : "tw:translate-x-0"))]), o(S, () => v(), (e) => {
		y() || v(e);
	}), c(t, x), f();
}
export { _ as t };
