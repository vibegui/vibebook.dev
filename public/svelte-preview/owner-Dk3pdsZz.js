// svelte/lib/client/clock.ts
var e = {
	schedule: (e, t) => setTimeout(e, t),
	cancel: (e) => clearTimeout(e)
}, t = 2e4, n = e;
function r(e = n) {
	let r = !0, i = 0, a = !1, o = null, s = null, c = () => {
		i++, a = !1, s?.abort(), s = null, o !== null && e.cancel(o), o = null;
	};
	return {
		active: () => r,
		async run(n, l, u) {
			if (!r || a) return !1;
			let d = ++i;
			a = !0, s = new AbortController();
			let f = () => r && d === i;
			o = e.schedule(() => {
				f() && (c(), u(/* @__PURE__ */ Error("timeout")));
			}, t);
			try {
				let e = await n(s.signal);
				if (f()) return c(), l(e), !0;
			} catch (e) {
				f() && (c(), u(e));
			}
			return !1;
		},
		cancel: c,
		dispose() {
			r = !1, c();
		}
	};
}
export { e as i, n, r, t };
