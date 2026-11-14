import { V as e, a as t, f as n, g as r, h as i, i as a, o, z as s } from "./Button-Cx7HMFHY.js";
import { Et as c, Tt as l, ht as u } from "./shared-qe__81Sz.js";
// svelte/lib/ui/Textarea.svelte
var d = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"value",
	"class",
	"ref"
]), f = e("<textarea></textarea>");
function p(e, p) {
	c(p, !0);
	let m = t(p, "value", 15, ""), h = t(p, "ref", 15, null), g = o(p, d);
	var _ = f();
	u(_), r(_, (e) => ({
		class: e,
		...g
	}), [() => a("tw:block tw:min-h-24 tw:w-full tw:min-w-0 tw:rounded-control tw:border tw:border-input tw:bg-studio-input-background tw:px-3 tw:py-2 tw:font-sans tw:text-sm tw:font-normal tw:leading-5 tw:tracking-normal tw:text-foreground tw:outline-none tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-2 tw:focus-visible:ring-ring/30 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/30", p.class)]), n(_, (e) => h(e), () => h()), i(_, m), s(e, _), l();
}
export { p as t };
