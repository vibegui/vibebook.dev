import { L as e, V as t, a as n, g as r, i, o as a, z as o } from "./Button-Cx7HMFHY.js";
import { A as s, Et as c, G as l, Tt as u, lt as d, u as f } from "./shared-qe__81Sz.js";
// svelte/lib/ui/Progress.svelte
var p = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"max",
	"label",
	"class"
]), m = t("<progress> </progress>");
function h(t, h) {
	c(h, !0);
	let g = n(h, "max", 3, 100), _ = a(h, p), v = d(() => Number.isFinite(g()) && g() > 0 ? g() : 100), y = d(() => Number.isFinite(h.value) ? Math.min(f(v), Math.max(0, h.value)) : 0);
	var b = m();
	r(b, (e) => ({
		..._,
		max: f(v),
		value: f(y),
		"aria-label": h.label,
		class: e
	}), [() => i("tw:h-1.5 tw:w-full tw:overflow-hidden tw:rounded-full tw:border-0 tw:bg-muted tw:appearance-none tw:[&::-webkit-progress-bar]:rounded-full tw:[&::-webkit-progress-bar]:bg-muted tw:[&::-webkit-progress-value]:rounded-full tw:[&::-webkit-progress-value]:bg-primary tw:[&::-moz-progress-bar]:rounded-full tw:[&::-moz-progress-bar]:bg-primary", h.class)]);
	var x = l(b);
	s(() => e(x, `${f(y) ?? ""}/${f(v) ?? ""}`)), o(t, b), u();
}
export { h as t };
