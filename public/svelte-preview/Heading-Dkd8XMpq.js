import { B as e, E as t, F as n, a as r, g as i, i as a, o, z as s } from "./Button-Cx7HMFHY.js";
import { Et as c, Tt as l, lt as u, u as d, z as f } from "./shared-qe__81Sz.js";
// svelte/lib/ui/Heading.svelte
var p = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"level",
	"children",
	"class"
]);
function m(m, h) {
	c(h, !0);
	let g = r(h, "level", 3, 2), _ = o(h, p), v = u(() => `h${g()}`);
	var y = e(), b = f(y);
	t(b, () => d(v), !1, (t, r) => {
		i(t, (e) => ({
			..._,
			class: e
		}), [() => a("tw:m-0 tw:font-sans tw:text-base tw:font-semibold tw:leading-6 tw:tracking-normal tw:[font-variation-settings:normal]", h.class)]);
		var o = e(), c = f(o);
		n(c, () => h.children), s(r, o);
	}), s(m, y), l();
}
export { m as t };
