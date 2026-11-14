import { A as e, B as t, F as n, I as r, J as i, R as a, U as o, V as s, a as c, g as l, j as u, o as d, z as f } from "./Button-Cx7HMFHY.js";
import { $ as p, An as m, C as h, Et as g, F as _, M as v, Tt as y, Yt as b, bt as x, h as S, j as C, lt as w, m as T, tt as E, u as D, z as O } from "./shared-qe__81Sz.js";
import { A as ee, C as te, D as k, H as ne, N as re, O as ie, R as A, S as ae, T as j, W as M, a as N, b as oe, c as se, j as P, n as F, r as ce, s as le, t as ue, w as de, y as I } from "./create-id-nQNd5Mh2.js";
// node_modules/svelte-toolbelt/dist/utils/on-destroy-effect.svelte.js
function L(e) {
	C(() => () => {
		e();
	});
}
// node_modules/svelte-toolbelt/dist/utils/after-tick.js
function R(e) {
	T().then(e);
}
// node_modules/svelte-toolbelt/dist/utils/dom.js
var fe = 1, pe = 9, me = 11;
function he(e) {
	return M(e) && e.nodeType === fe && typeof e.nodeName == "string";
}
function ge(e) {
	return M(e) && e.nodeType === pe;
}
function _e(e) {
	return M(e) && e.constructor?.name === "VisualViewport";
}
function ve(e) {
	return M(e) && e.nodeType !== void 0;
}
function ye(e) {
	return ve(e) && e.nodeType === me && "host" in e;
}
function be(e, t) {
	if (!e || !t || !he(e) || !he(t)) return !1;
	let n = t.getRootNode?.();
	if (e === t || e.contains(t)) return !0;
	if (n && ye(n)) {
		let n = t;
		for (; n;) {
			if (e === n) return !0;
			n = n.parentNode || n.host;
		}
	}
	return !1;
}
function xe(e) {
	return ge(e) ? e : _e(e) ? e.document : e?.ownerDocument ?? document;
}
function Se(e) {
	return ye(e) ? Se(e.host) : ge(e) ? e.defaultView ?? window : he(e) ? e.ownerDocument?.defaultView ?? window : window;
}
function z(e) {
	let t = e.activeElement;
	for (; t?.shadowRoot;) {
		let e = t.shadowRoot.activeElement;
		if (e === t) break;
		t = e;
	}
	return t;
}
// node_modules/svelte-toolbelt/dist/utils/dom-context.svelte.js
var Ce = class {
	element;
	#e = w(() => this.element.current ? this.element.current.getRootNode() ?? document : document);
	get root() {
		return D(this.#e);
	}
	set root(e) {
		p(this.#e, e);
	}
	constructor(e) {
		this.element = typeof e == "function" ? A(e) : e;
	}
	getDocument = () => xe(this.root);
	getWindow = () => this.getDocument().defaultView ?? window;
	getActiveElement = () => z(this.root);
	isActiveElement = (e) => e === this.getActiveElement();
	getElementById(e) {
		return this.root.getElementById(e);
	}
	querySelector = (e) => this.root ? this.root.querySelector(e) : null;
	querySelectorAll = (e) => this.root ? this.root.querySelectorAll(e) : [];
	setTimeout = (e, t) => this.getWindow().setTimeout(e, t);
	clearTimeout = (e) => this.getWindow().clearTimeout(e);
}, we = class {
	#e;
	#t = null;
	#n = null;
	#r = 0;
	constructor(e) {
		this.#e = e, L(() => this.#i());
	}
	#i() {
		this.#t !== null && (window.cancelAnimationFrame(this.#t), this.#t = null), this.#n?.disconnect(), this.#n = null, this.#r++;
	}
	run(e) {
		this.#i();
		let t = this.#r, n = () => {
			t === this.#r && this.#a(e);
		}, r = () => {
			if (t !== this.#r) return;
			let i = this.#e.ref.current;
			if (!i) return;
			if (typeof i.getAnimations != "function") {
				this.#a(e);
				return;
			}
			let a = i.getAnimations();
			a.length === 0 ? n() : Promise.all(a.map((e) => e.finished)).then(() => {
				n();
			}).catch(() => {
				t === this.#r && (i.getAnimations().some((e) => e.pending || e.playState !== "finished") ? r() : n());
			});
		}, i = () => {
			this.#t = window.requestAnimationFrame(() => {
				this.#t = null, r();
			});
		};
		this.#e.afterTick.current ? this.#t = window.requestAnimationFrame(() => {
			this.#t = null;
			let e = "data-starting-style", n = this.#e.ref.current;
			n && (n.hasAttribute(e) ? (this.#n = new MutationObserver(() => {
				t === this.#r && (n.hasAttribute(e) || (this.#n?.disconnect(), this.#n = null, i()));
			}), this.#n.observe(n, {
				attributes: !0,
				attributeFilter: [e]
			})) : i());
		}) : i();
	}
	#a(e) {
		let t = this.#r, n = () => {
			t === this.#r && e();
		};
		this.#e.afterTick.current ? R(n) : n();
	}
}, Te = class {
	#e;
	#t;
	#n;
	#r = E(!1);
	#i = E(void 0);
	#a = !1;
	#o = null;
	constructor(e) {
		this.#e = e, p(this.#r, e.open.current, !0), this.#t = e.enabled ?? !0, this.#n = new we({
			ref: this.#e.ref,
			afterTick: this.#e.open
		}), L(() => this.#s()), k(() => this.#e.open.current, (e) => {
			!this.#a && (this.#a = !0, e === D(this.#r)) || (this.#s(), !e && this.#e.shouldSkipExitAnimation?.() ? (p(this.#r, !1), p(this.#i, void 0), this.#e.onComplete?.()) : (e && p(this.#r, !0), p(this.#i, e ? "starting" : "ending", !0), e && (this.#o = window.requestAnimationFrame(() => {
				this.#o = null, this.#e.open.current && p(this.#i, void 0);
			})), this.#t ? this.#n.run(() => {
				e === this.#e.open.current && (this.#e.open.current || p(this.#r, !1), p(this.#i, void 0), this.#e.onComplete?.());
			}) : (e || p(this.#r, !1), p(this.#i, void 0), this.#e.onComplete?.())));
		});
	}
	get shouldRender() {
		return D(this.#r);
	}
	get transitionStatus() {
		return D(this.#i);
	}
	#s() {
		this.#o !== null && (window.cancelAnimationFrame(this.#o), this.#o = null);
	}
}, Ee = ae({
	component: "dialog",
	parts: [
		"content",
		"trigger",
		"overlay",
		"title",
		"description",
		"close",
		"cancel",
		"action"
	]
}), B = new ie("Dialog.Root | AlertDialog.Root"), De = class e {
	static create(t) {
		let n = B.getOr(null);
		return B.set(new e(t, n));
	}
	opts;
	#e = E(null);
	get triggerNode() {
		return D(this.#e);
	}
	set triggerNode(e) {
		p(this.#e, e, !0);
	}
	#t = E(null);
	get contentNode() {
		return D(this.#t);
	}
	set contentNode(e) {
		p(this.#t, e, !0);
	}
	#n = E(null);
	get overlayNode() {
		return D(this.#n);
	}
	set overlayNode(e) {
		p(this.#n, e, !0);
	}
	#r = E(null);
	get descriptionNode() {
		return D(this.#r);
	}
	set descriptionNode(e) {
		p(this.#r, e, !0);
	}
	#i = E(void 0);
	get contentId() {
		return D(this.#i);
	}
	set contentId(e) {
		p(this.#i, e, !0);
	}
	#a = E(void 0);
	get titleId() {
		return D(this.#a);
	}
	set titleId(e) {
		p(this.#a, e, !0);
	}
	#o = E(void 0);
	get triggerId() {
		return D(this.#o);
	}
	set triggerId(e) {
		p(this.#o, e, !0);
	}
	#s = E(void 0);
	get descriptionId() {
		return D(this.#s);
	}
	set descriptionId(e) {
		p(this.#s, e, !0);
	}
	#c = E(null);
	get cancelNode() {
		return D(this.#c);
	}
	set cancelNode(e) {
		p(this.#c, e, !0);
	}
	#l = E(0);
	get nestedOpenCount() {
		return D(this.#l);
	}
	set nestedOpenCount(e) {
		p(this.#l, e, !0);
	}
	depth;
	parent;
	contentPresence;
	overlayPresence;
	constructor(e, t) {
		this.opts = e, this.parent = t, this.depth = t ? t.depth + 1 : 0, this.handleOpen = this.handleOpen.bind(this), this.handleClose = this.handleClose.bind(this), this.contentPresence = new Te({
			ref: A(() => this.contentNode),
			open: this.opts.open,
			enabled: !0,
			onComplete: () => {
				this.opts.onOpenChangeComplete.current(this.opts.open.current);
			}
		}), this.overlayPresence = new Te({
			ref: A(() => this.overlayNode),
			open: this.opts.open,
			enabled: !0
		}), k(() => this.opts.open.current, (e) => {
			this.parent && (e ? this.parent.incrementNested() : this.parent.decrementNested());
		}, { lazy: !0 }), L(() => {
			this.opts.open.current && this.parent?.decrementNested();
		});
	}
	handleOpen() {
		this.opts.open.current || (this.opts.open.current = !0);
	}
	handleClose() {
		this.opts.open.current && (this.opts.open.current = !1);
	}
	getBitsAttr = (e) => Ee.getAttr(e, this.opts.variant.current);
	incrementNested() {
		this.nestedOpenCount++, this.parent?.incrementNested();
	}
	decrementNested() {
		this.nestedOpenCount !== 0 && (this.nestedOpenCount--, this.parent?.decrementNested());
	}
	#u = w(() => ({ "data-state": te(this.opts.open.current) }));
	get sharedProps() {
		return D(this.#u);
	}
	set sharedProps(e) {
		p(this.#u, e);
	}
}, Oe = class e {
	static create(t) {
		return new e(t, B.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = j(this.opts.ref, (e) => {
			this.root.triggerNode = e, this.root.triggerId = e?.id;
		}), this.onclick = this.onclick.bind(this), this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(e) {
		this.opts.disabled.current || e.button > 0 || this.root.handleOpen();
	}
	onkeydown(e) {
		this.opts.disabled.current || (e.key === " " || e.key === "Enter") && (e.preventDefault(), this.root.handleOpen());
	}
	#e = w(() => ({
		id: this.opts.id.current,
		"aria-haspopup": "dialog",
		"aria-expanded": oe(this.root.opts.open.current),
		"aria-controls": this.root.contentId,
		[this.root.getBitsAttr("trigger")]: "",
		onkeydown: this.onkeydown,
		onclick: this.onclick,
		disabled: this.opts.disabled.current ? !0 : void 0,
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return D(this.#e);
	}
	set props(e) {
		p(this.#e, e);
	}
}, ke = class e {
	static create(t) {
		return new e(t, B.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = j(this.opts.ref), this.onclick = this.onclick.bind(this), this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(e) {
		this.opts.disabled.current || e.button > 0 || this.root.handleClose();
	}
	onkeydown(e) {
		this.opts.disabled.current || (e.key === " " || e.key === "Enter") && (e.preventDefault(), this.root.handleClose());
	}
	#e = w(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr(this.opts.variant.current)]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		disabled: this.opts.disabled.current ? !0 : void 0,
		tabindex: 0,
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return D(this.#e);
	}
	set props(e) {
		p(this.#e, e);
	}
}, Ae = class e {
	static create(t) {
		return new e(t, B.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = j(this.opts.ref);
	}
	#e = w(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("action")]: "",
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return D(this.#e);
	}
	set props(e) {
		p(this.#e, e);
	}
}, je = class e {
	static create(t) {
		return new e(t, B.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.root.titleId = this.opts.id.current, this.attachment = j(this.opts.ref), k.pre(() => this.opts.id.current, (e) => {
			this.root.titleId = e;
		});
	}
	#e = w(() => ({
		id: this.opts.id.current,
		role: "heading",
		"aria-level": this.opts.level.current,
		[this.root.getBitsAttr("title")]: "",
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return D(this.#e);
	}
	set props(e) {
		p(this.#e, e);
	}
}, Me = class e {
	static create(t) {
		return new e(t, B.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.root.descriptionId = this.opts.id.current, this.attachment = j(this.opts.ref, (e) => {
			this.root.descriptionNode = e;
		}), k.pre(() => this.opts.id.current, (e) => {
			this.root.descriptionId = e;
		});
	}
	#e = w(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("description")]: "",
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return D(this.#e);
	}
	set props(e) {
		p(this.#e, e);
	}
}, Ne = class e {
	static create(t) {
		return new e(t, B.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = j(this.opts.ref, (e) => {
			this.root.contentNode = e, this.root.contentId = e?.id;
		});
	}
	#e = w(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return D(this.#e);
	}
	set snippetProps(e) {
		p(this.#e, e);
	}
	#t = w(() => ({
		id: this.opts.id.current,
		role: this.root.opts.variant.current === "alert-dialog" ? "alertdialog" : "dialog",
		"aria-modal": "true",
		"aria-describedby": this.root.descriptionId,
		"aria-labelledby": this.root.titleId,
		[this.root.getBitsAttr("content")]: "",
		style: {
			pointerEvents: "auto",
			outline: this.root.opts.variant.current === "alert-dialog" ? "none" : void 0,
			"--bits-dialog-depth": this.root.depth,
			"--bits-dialog-nested-count": this.root.nestedOpenCount,
			contain: "layout style"
		},
		tabindex: this.root.opts.variant.current === "alert-dialog" ? -1 : void 0,
		"data-nested-open": I(this.root.nestedOpenCount > 0),
		"data-nested": I(this.root.parent !== null),
		...de(this.root.contentPresence.transitionStatus),
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return D(this.#t);
	}
	set props(e) {
		p(this.#t, e);
	}
	get shouldRender() {
		return this.root.contentPresence.shouldRender;
	}
}, Pe = class e {
	static create(t) {
		return new e(t, B.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = j(this.opts.ref, (e) => this.root.overlayNode = e);
	}
	#e = w(() => ({ open: this.root.opts.open.current }));
	get snippetProps() {
		return D(this.#e);
	}
	set snippetProps(e) {
		p(this.#e, e);
	}
	#t = w(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("overlay")]: "",
		style: {
			pointerEvents: "auto",
			"--bits-dialog-depth": this.root.depth,
			"--bits-dialog-nested-count": this.root.nestedOpenCount
		},
		"data-nested-open": I(this.root.nestedOpenCount > 0),
		"data-nested": I(this.root.parent !== null),
		...de(this.root.overlayPresence.transitionStatus),
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return D(this.#t);
	}
	set props(e) {
		p(this.#t, e);
	}
	get shouldRender() {
		return this.root.overlayPresence.shouldRender;
	}
}, Fe = class e {
	static create(t) {
		return new e(t, B.get());
	}
	opts;
	root;
	attachment;
	constructor(e, t) {
		this.opts = e, this.root = t, this.attachment = j(this.opts.ref, (e) => this.root.cancelNode = e), this.onclick = this.onclick.bind(this), this.onkeydown = this.onkeydown.bind(this);
	}
	onclick(e) {
		this.opts.disabled.current || e.button > 0 || this.root.handleClose();
	}
	onkeydown(e) {
		this.opts.disabled.current || (e.key === " " || e.key === "Enter") && (e.preventDefault(), this.root.handleClose());
	}
	#e = w(() => ({
		id: this.opts.id.current,
		[this.root.getBitsAttr("cancel")]: "",
		onclick: this.onclick,
		onkeydown: this.onkeydown,
		tabindex: 0,
		disabled: this.opts.disabled.current,
		...this.root.sharedProps,
		...this.attachment
	}));
	get props() {
		return D(this.#e);
	}
	set props(e) {
		p(this.#e, e);
	}
}, Ie = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"ref",
	"child",
	"children",
	"level"
]), Le = s("<div><!></div>");
function Re(e, r) {
	let i = o();
	g(r, !0);
	let a = c(r, "id", 19, () => ue(i)), s = c(r, "ref", 15, null), p = c(r, "level", 3, 2), h = d(r, Ie), v = je.create({
		id: A(() => a()),
		level: A(() => p()),
		ref: A(() => s(), (e) => s(e))
	}), x = w(() => P(h, v.props));
	var S = t(), C = O(S), T = (e) => {
		var i = t(), a = O(i);
		n(a, () => r.child, () => ({ props: D(x) })), f(e, i);
	}, E = (e) => {
		var t = Le();
		l(t, () => ({ ...D(x) }));
		var i = _(t);
		n(i, () => r.children ?? m), b(t), f(e, t);
	};
	u(C, (e) => {
		r.child ? e(T) : e(E, -1);
	}), f(e, S), y();
}
// node_modules/bits-ui/dist/bits/utilities/portal/portal-consumer.svelte
function ze(r, i) {
	var a = t(), o = O(a);
	e(o, () => i.children, (e) => {
		var r = t(), a = O(r);
		n(a, () => i.children ?? m), f(e, r);
	}), f(r, a);
}
// node_modules/bits-ui/dist/bits/utilities/config/bits-config.js
var Be = new ie("BitsConfig");
function Ve() {
	let e = new He(null, {});
	return Be.getOr(e).opts;
}
var He = class {
	opts;
	constructor(e, t) {
		let n = Ue(e, t);
		this.opts = {
			defaultPortalTo: n((e) => e.defaultPortalTo),
			defaultLocale: n((e) => e.defaultLocale)
		};
	}
};
function Ue(e, t) {
	return (n) => A(() => {
		let r = n(t)?.current;
		if (r !== void 0) return r;
		if (e !== null) return n(e.opts)?.current;
	});
}
// node_modules/bits-ui/dist/bits/utilities/config/prop-resolvers.js
function We(e, t) {
	return (n) => {
		let r = Ve();
		return A(() => {
			let i = n();
			if (i !== void 0) return i;
			let a = e(r).current;
			return a === void 0 ? t : a;
		});
	};
}
var Ge = We((e) => e.defaultPortalTo, "body");
// node_modules/bits-ui/dist/bits/utilities/portal/portal.svelte
function Ke(e, i) {
	g(i, !0);
	let o = Ge(() => i.to), s = x(), c = w(l);
	function l() {
		if (!ce || i.disabled) return null;
		let e = null;
		return e = typeof o.current == "string" ? document.querySelector(o.current) : o.current, e;
	}
	let d;
	function p() {
		d &&= (a(d), null);
	}
	k([() => D(c), () => i.disabled], ([e, t]) => {
		if (!e || t) p();
		else return d = r(ze, {
			target: e,
			props: { children: i.children },
			context: s
		}), () => {
			p();
		};
	});
	var h = t(), _ = O(h), v = (e) => {
		var r = t(), a = O(r);
		n(a, () => i.children ?? m), f(e, r);
	};
	u(_, (e) => {
		i.disabled && e(v);
	}), f(e, h), y();
}
// node_modules/bits-ui/dist/internal/events.js
var qe = /* @__PURE__ */ new WeakMap();
function Je(e, t = e.composedPath()) {
	qe.set(e, t);
}
function Ye(e) {
	return qe.get(e) ?? e.composedPath();
}
function Xe(e, t) {
	return t ? N(e.target) && t.contains(e.target) || Ye(e).includes(t) : !1;
}
function Ze(e, t) {
	for (let n of Ye(e)) if (N(n) && n.matches(t)) return n;
	return N(e.target) ? e.target.closest(t) : null;
}
function Qe(e, t) {
	Je(t, Ye(e));
}
// node_modules/bits-ui/dist/internal/debounce.js
function $e(e, t = 500) {
	let n = null, r = null, i = (...e) => {
		i.destroy(), r = e, n = setTimeout(i.flush, t);
	};
	return i.flush = () => {
		if (r === null) return;
		let t = r;
		i.destroy(), e(...t);
	}, i.destroy = () => {
		n !== null && (clearTimeout(n), n = null), r = null;
	}, i;
}
// node_modules/bits-ui/dist/internal/elements.js
function et(e, t) {
	return e === t || e.contains(t);
}
function tt(e) {
	return e?.ownerDocument ?? document;
}
// node_modules/bits-ui/dist/internal/dom.js
function nt(e, t) {
	let { clientX: n, clientY: r } = e, i = t.getBoundingClientRect();
	return n < i.left || n > i.right || r < i.top || r > i.bottom;
}
// node_modules/bits-ui/dist/bits/menu/context-menu-attributes.js
var rt = "data-context-menu-trigger", it = "data-context-menu-content";
// node_modules/bits-ui/dist/bits/utilities/dismissible-layer/use-dismissable-layer.svelte.js
globalThis.bitsDismissableLayers ??= /* @__PURE__ */ new Map();
var at = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	#e = F;
	#t = () => !1;
	#n = null;
	#r = ne("close");
	#i = { pointerdown: !1 };
	#a = !1;
	#o = null;
	#s = !1;
	#c = void 0;
	#l = F;
	#u = F;
	#d = !1;
	constructor(e) {
		this.opts = e, v(() => {
			this.#r.current = e.interactOutsideBehavior.current, this.#e = e.onInteractOutside.current, this.#l = e.onFocusOutside.current, this.#t = e.isValidEvent.current, this.#n = e.ref.current;
		});
		let t = F, n = null, r = () => {
			n = null, this.#x(), globalThis.bitsDismissableLayers.delete(this), this.#g.destroy(), this.#u(), t();
		};
		k([() => this.opts.enabled.current, () => this.opts.ref.current], ([e, i]) => {
			let a = e ? i : null;
			n !== a && (r(), a && (n = a, this.#c = tt(a), globalThis.bitsDismissableLayers.set(this, this.#r), t = this.#p()));
		}), L(() => {
			this.#d = !0, r();
		});
	}
	#f = (e) => {
		e.defaultPrevented || this.#d || !this.#n || R(() => {
			this.#d || this.#n && !this.#b(e.target) && e.target && !this.#s && this.#l?.(e);
		});
	};
	#p() {
		let e = this.#c, t = (e) => {
			S(() => {
				this.#g.flush(), this.#_(e), this.#y(e);
			});
		}, n = (e) => {
			e.cancelBubble || e !== this.#o || (this.#v(e), e.pointerType === "touch" ? (this.#g.destroy(), this.#h(e)) : this.#g(e));
		};
		return e.addEventListener("pointerdown", t, !0), e.addEventListener("pointerdown", n), re(() => e.removeEventListener("pointerdown", t, !0), () => e.removeEventListener("pointerdown", n), i(e, "focusin", this.#f));
	}
	#m = (e) => {
		let t = e;
		t.defaultPrevented && (t = lt(e)), this.#e(e);
	};
	#h = (e) => {
		if (!this.#n) {
			this.#u();
			return;
		}
		let t = this.#t(e, this.#n) || ct(e, this.#n);
		if (!this.#a || this.#S() || !t) {
			this.#u();
			return;
		}
		let n = e;
		if (n.defaultPrevented && (n = lt(n)), this.#r.current !== "close" && this.#r.current !== "defer-otherwise-close") this.#u();
		else if (e.pointerType === "touch") {
			this.#u();
			let e = null, t = F, n = (e) => {
				t(), this.#m(e);
			};
			t = re(i(this.#c, "click", n, { once: !0 }), i(this.#c, "click", (t) => {
				Je(t), e = setTimeout(() => n(t), 0);
			}, {
				once: !0,
				capture: !0
			}), () => {
				e !== null && clearTimeout(e), e = null;
			}), this.#u = t;
		} else this.#e(n);
	};
	#g = $e(this.#h, 10);
	#_ = (e) => {
		this.#i[e.type] = !0;
	};
	#v = (e) => {
		this.#i[e.type] = !1;
	};
	#y = (e) => {
		this.#o = e, Je(e), this.#n && (this.#a = st(this));
	};
	#b = (e) => this.#n ? et(this.#n, e) : !1;
	#x = () => {
		for (let e in this.#i) this.#i[e] = !1;
		this.#a = !1, this.#o = null;
	};
	#S() {
		return Object.values(this.#i).some(Boolean);
	}
	#C = () => {
		this.#s = !0;
	};
	#w = () => {
		this.#s = !1;
	};
	props = {
		onfocuscapture: this.#C,
		onblurcapture: this.#w
	};
};
function ot(e = [...globalThis.bitsDismissableLayers]) {
	return e.findLast(([e, { current: t }]) => t === "close" || t === "ignore");
}
function st(e) {
	let t = [...globalThis.bitsDismissableLayers], n = ot(t);
	if (n) return n[0] === e;
	let [r] = t[0];
	return r === e;
}
function ct(e, t) {
	let n = e.target;
	if (!N(n)) return !1;
	let r = !!Ze(e, `[${rt}]`), i = !!t.closest(`[${it}]`);
	return "button" in e && e.button > 0 && !r ? !1 : "button" in e && e.button === 0 && r && i ? !0 : r && i ? !1 : tt(n).documentElement.contains(n) && !Xe(e, t) && nt(e, t);
}
function lt(e) {
	let t = e.currentTarget, n = e.target, r;
	r = e instanceof PointerEvent ? new PointerEvent(e.type, e) : new PointerEvent("pointerdown", e);
	let i = !1, a = new Proxy(r, { get: (r, a) => {
		if (a === "currentTarget") return t;
		if (a === "target") return n;
		if (a === "preventDefault") return () => {
			i = !0, typeof r.preventDefault == "function" && r.preventDefault();
		};
		if (a === "defaultPrevented") return i;
		if (a in r) {
			let e = r[a];
			return typeof e == "function" ? e.bind(r) : e;
		}
		let o = e[a];
		return typeof o == "function" ? o.bind(e) : o;
	} });
	return Qe(e, a), a;
}
// node_modules/bits-ui/dist/bits/utilities/dismissible-layer/dismissible-layer.svelte
function ut(e, r) {
	g(r, !0);
	let i = c(r, "interactOutsideBehavior", 3, "close"), a = c(r, "onInteractOutside", 3, F), o = c(r, "onFocusOutside", 3, F), s = c(r, "isValidEvent", 3, () => !1), l = at.create({
		id: A(() => r.id),
		interactOutsideBehavior: A(() => i()),
		onInteractOutside: A(() => a()),
		enabled: A(() => r.enabled),
		onFocusOutside: A(() => o()),
		isValidEvent: A(() => s()),
		ref: S(() => r.ref)
	});
	var u = t(), d = O(u);
	n(d, () => r.children ?? m, () => ({ props: l.props })), f(e, u), y();
}
// node_modules/bits-ui/dist/bits/utilities/escape-layer/use-escape-layer.svelte.js
globalThis.bitsEscapeLayers ??= /* @__PURE__ */ new Map();
var dt = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	domContext;
	constructor(e) {
		this.opts = e, this.domContext = new Ce(this.opts.ref);
		let t = F;
		k(() => e.enabled.current, (n) => (n && (globalThis.bitsEscapeLayers.set(this, e.escapeKeydownBehavior), t = this.#e()), () => {
			t(), globalThis.bitsEscapeLayers.delete(this);
		}));
	}
	#e = () => i(this.domContext.getDocument(), "keydown", this.#t, { passive: !1 });
	#t = (e) => {
		if (e.key !== "Escape" || !ft(this)) return;
		let t = new KeyboardEvent(e.type, e);
		e.preventDefault();
		let n = this.opts.escapeKeydownBehavior.current;
		(n === "close" || n === "defer-otherwise-close") && this.opts.onEscapeKeydown.current(t);
	};
};
function ft(e) {
	let t = [...globalThis.bitsEscapeLayers], n = t.findLast(([e, { current: t }]) => t === "close" || t === "ignore");
	if (n) return n[0] === e;
	let [r] = t[0];
	return r === e;
}
// node_modules/bits-ui/dist/bits/utilities/escape-layer/escape-layer.svelte
function pt(e, r) {
	g(r, !0);
	let i = c(r, "escapeKeydownBehavior", 3, "close"), a = c(r, "onEscapeKeydown", 3, F);
	dt.create({
		escapeKeydownBehavior: A(() => i()),
		onEscapeKeydown: A(() => a()),
		enabled: A(() => r.enabled),
		ref: S(() => r.ref)
	});
	var o = t(), s = O(o);
	n(s, () => r.children ?? m), f(e, o), y();
}
// node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope-manager.js
var mt = class e {
	static instance;
	#e = ne([]);
	#t = /* @__PURE__ */ new WeakMap();
	#n = /* @__PURE__ */ new WeakMap();
	static getInstance() {
		return this.instance ||= new e(), this.instance;
	}
	register(e) {
		let t = this.getActive();
		t && t !== e && t.pause();
		let n = z(document);
		n && n !== document.body && this.#n.set(e, n), this.#e.current = this.#e.current.filter((t) => t !== e), this.#e.current.unshift(e), e.resume();
	}
	unregister(e) {
		this.#e.current = this.#e.current.filter((t) => t !== e);
		let t = this.getActive();
		t && t.resume();
	}
	getActive() {
		return this.#e.current[0];
	}
	setFocusMemory(e, t) {
		this.#t.set(e, t);
	}
	getFocusMemory(e) {
		return this.#t.get(e);
	}
	isActiveScope(e) {
		return this.getActive() === e;
	}
	setPreFocusMemory(e, t) {
		this.#n.set(e, t);
	}
	getPreFocusMemory(e) {
		return this.#n.get(e);
	}
	clearPreFocusMemory(e) {
		this.#n.delete(e);
	}
}, ht = [
	"input:not([inert]):not([inert] *)",
	"select:not([inert]):not([inert] *)",
	"textarea:not([inert]):not([inert] *)",
	"a[href]:not([inert]):not([inert] *)",
	"area[href]:not([inert]):not([inert] *)",
	"button:not([inert]):not([inert] *)",
	"[tabindex]:not(slot):not([inert]):not([inert] *)",
	"audio[controls]:not([inert]):not([inert] *)",
	"video[controls]:not([inert]):not([inert] *)",
	"[contenteditable]:not([contenteditable=\"false\"]):not([inert]):not([inert] *)",
	"details>summary:first-of-type:not([inert]):not([inert] *)",
	"details:not([inert]):not([inert] *)"
], gt = /* #__PURE__ */ ht.join(","), _t = typeof Element > "u", V = _t ? function() {} : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector, H = !_t && Element.prototype.getRootNode ? function(e) {
	return e == null || e.getRootNode == null ? void 0 : e.getRootNode();
} : function(e) {
	return e?.ownerDocument;
}, U = function(e, t) {
	t === void 0 && (t = !0);
	var n = e == null || e.getAttribute == null ? void 0 : e.getAttribute("inert");
	return n === "" || n === "true" || t && e && (typeof e.closest == "function" ? e.closest("[inert]") : U(e.parentNode));
}, vt = function(e) {
	var t, n = e == null || e.getAttribute == null || (t = e.getAttribute("contenteditable")) == null ? void 0 : t.toLowerCase();
	return n === "" || n === "true" || n === "plaintext-only";
}, yt = function(e, t, n) {
	if (U(e)) return [];
	var r = Array.prototype.slice.apply(e.querySelectorAll(gt));
	return t && V.call(e, gt) && r.unshift(e), r = r.filter(n), r;
}, W = function(e, t, n) {
	for (var r = [], i = Array.from(e); i.length;) {
		var a = i.shift();
		if (!U(a, !1)) {
			if (a.tagName === "SLOT") {
				var o = a.assignedElements(), s = W(o.length ? o : a.children, !0, n);
				n.flatten ? r.push.apply(r, s) : r.push({
					scopeParent: a,
					candidates: s
				});
			} else {
				V.call(a, gt) && n.filter(a) && (t || !e.includes(a)) && r.push(a);
				var c = a.shadowRoot || typeof n.getShadowRoot == "function" && n.getShadowRoot(a), l = !U(c, !1) && (!n.shadowRootFilter || n.shadowRootFilter(a));
				if (c && l) {
					var u = W(c === !0 ? a.children : c.children, !0, n);
					n.flatten ? r.push.apply(r, u) : r.push({
						scopeParent: a,
						candidates: u
					});
				} else i.unshift.apply(i, a.children);
			}
		}
	}
	return r;
}, bt = function(e) {
	return !isNaN(parseInt(e.getAttribute("tabindex"), 10));
}, xt = function(e) {
	if (!e) throw Error("No node provided");
	return e.tabIndex < 0 && (/^(AUDIO|VIDEO|DETAILS)$/.test(e.tagName) || vt(e)) && !bt(e) ? 0 : e.tabIndex;
}, St = function(e, t) {
	var n = xt(e);
	return n < 0 && t && !bt(e) ? 0 : n;
}, Ct = function(e, t) {
	return e.tabIndex === t.tabIndex ? e.documentOrder - t.documentOrder : e.tabIndex - t.tabIndex;
}, wt = function(e) {
	return e.tagName === "INPUT";
}, Tt = function(e) {
	return wt(e) && e.type === "hidden";
}, Et = function(e) {
	return e.tagName === "DETAILS" && Array.prototype.slice.apply(e.children).some(function(e) {
		return e.tagName === "SUMMARY";
	});
}, Dt = function(e, t) {
	for (var n = 0; n < e.length; n++) if (e[n].checked && e[n].form === t) return e[n];
}, Ot = function(e) {
	if (!e.name) return !0;
	var t = e.form || H(e), n = function(e) {
		return t.querySelectorAll("input[type=\"radio\"][name=\"" + e + "\"]");
	}, r;
	if (typeof window < "u" && window.CSS !== void 0 && typeof window.CSS.escape == "function") r = n(window.CSS.escape(e.name));
	else try {
		r = n(e.name);
	} catch (e) {
		return console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", e.message), !1;
	}
	var i = Dt(r, e.form);
	return !i || i === e;
}, kt = function(e) {
	return wt(e) && e.type === "radio";
}, At = function(e) {
	return kt(e) && !Ot(e);
}, jt = function(e) {
	var t = e && H(e), n = t?.host, r = !1;
	if (t && t !== e) {
		var i, a;
		for (r = !!((i = n) != null && (i = i.ownerDocument) != null && i.contains(n) || e != null && (a = e.ownerDocument) != null && a.contains(e)); !r && n;) {
			var o;
			t = H(n), n = t?.host, r = !!((o = n) != null && (o = o.ownerDocument) != null && o.contains(n));
		}
	}
	return r;
}, Mt = function(e) {
	var t = e.getBoundingClientRect(), n = t.width, r = t.height;
	return n === 0 && r === 0;
}, Nt = function(e, t) {
	var n = t.displayCheck, r = t.getShadowRoot;
	if (n === "full-native" && "checkVisibility" in e) return !e.checkVisibility({
		checkOpacity: !1,
		opacityProperty: !1,
		contentVisibilityAuto: !0,
		visibilityProperty: !0,
		checkVisibilityCSS: !0
	});
	var i = getComputedStyle(e).visibility;
	if (i === "hidden" || i === "collapse") return !0;
	var a = V.call(e, "details>summary:first-of-type") ? e.parentElement : e;
	if (V.call(a, "details:not([open]) *")) return !0;
	if (!n || n === "full" || n === "full-native" || n === "legacy-full") {
		if (typeof r == "function") {
			for (var o = e; e;) {
				var s = e.parentElement, c = H(e);
				if (s && !s.shadowRoot && r(s) === !0) return Mt(e);
				e = e.assignedSlot ? e.assignedSlot : !s && c !== e.ownerDocument ? c.host : s;
			}
			e = o;
		}
		if (jt(e)) return !e.getClientRects().length;
		if (n !== "legacy-full") return !0;
	} else if (n === "non-zero-area") return Mt(e);
	return !1;
}, Pt = function(e) {
	if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(e.tagName)) for (var t = e.parentElement; t;) {
		if (t.tagName === "FIELDSET" && t.disabled) {
			for (var n = 0; n < t.children.length; n++) {
				var r = t.children.item(n);
				if (r.tagName === "LEGEND") return V.call(t, "fieldset[disabled] *") ? !0 : !r.contains(e);
			}
			return !0;
		}
		t = t.parentElement;
	}
	return !1;
}, G = function(e, t) {
	return !(t.disabled || Tt(t) || Nt(t, e) || Et(t) || Pt(t));
}, Ft = function(e, t) {
	return !(At(t) || xt(t) < 0 || !G(e, t));
}, It = function(e) {
	var t = parseInt(e.getAttribute("tabindex"), 10);
	return !!(isNaN(t) || t >= 0);
}, Lt = function(e) {
	var t = [], n = [];
	return e.forEach(function(e, r) {
		var i = !!e.scopeParent, a = i ? e.scopeParent : e, o = St(a, i), s = i ? Lt(e.candidates) : a;
		o === 0 ? i ? t.push.apply(t, s) : t.push(a) : n.push({
			documentOrder: r,
			tabIndex: o,
			item: e,
			isScope: i,
			content: s
		});
	}), n.sort(Ct).reduce(function(e, t) {
		return t.isScope ? e.push.apply(e, t.content) : e.push(t.content), e;
	}, []).concat(t);
}, Rt = function(e, t) {
	return t ||= {}, Lt(t.getShadowRoot ? W([e], t.includeContainer, {
		filter: Ft.bind(null, t),
		flatten: !1,
		getShadowRoot: t.getShadowRoot,
		shadowRootFilter: It
	}) : yt(e, t.includeContainer, Ft.bind(null, t)));
}, zt = function(e, t) {
	return t ||= {}, t.getShadowRoot ? W([e], t.includeContainer, {
		filter: G.bind(null, t),
		flatten: !0,
		getShadowRoot: t.getShadowRoot
	}) : yt(e, t.includeContainer, G.bind(null, t));
}, Bt = /* #__PURE__ */ ht.concat("iframe:not([inert]):not([inert] *)").join(","), Vt = function(e, t) {
	if (t ||= {}, !e) throw Error("No node provided");
	return V.call(e, Bt) !== !1 && G(t, e);
};
// node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope.svelte.js
function Ht(e, t) {
	let n = t.getRootNode();
	for (; e;) {
		let t = e.getRootNode();
		if (t === n) return e;
		e = t !== e && "host" in t ? t.host : null;
	}
	return null;
}
var Ut = class e {
	#e = !1;
	#t = null;
	#n = mt.getInstance();
	#r = [];
	#i;
	constructor(e) {
		this.#i = e;
	}
	get paused() {
		return this.#e;
	}
	pause() {
		this.#e = !0;
	}
	resume() {
		this.#e = !1;
	}
	#a() {
		for (let e of this.#r) e();
		this.#r = [];
	}
	mount(e) {
		this.#t !== e && (this.#t && this.unmount(), this.#t = e, this.#n.register(this), this.#c(), this.#o());
	}
	unmount() {
		this.#t &&= (this.#a(), this.#s(), this.#n.unregister(this), this.#n.clearPreFocusMemory(this), null);
	}
	#o() {
		if (!this.#t) return;
		let e = new CustomEvent("focusScope.onOpenAutoFocus", {
			bubbles: !1,
			cancelable: !0
		});
		this.#i.onOpenAutoFocus.current(e), e.defaultPrevented || requestAnimationFrame(() => {
			if (!this.#t || this.#e || !this.#n.isActiveScope(this) || this.#t.contains(Ht(z(this.#t.ownerDocument), this.#t))) return;
			let e = this.#u();
			e ? (e.focus({ preventScroll: !0 }), this.#n.setFocusMemory(this, e)) : this.#t.focus({ preventScroll: !0 });
		});
	}
	#s() {
		let e = new CustomEvent("focusScope.onCloseAutoFocus", {
			bubbles: !1,
			cancelable: !0
		});
		if (this.#i.onCloseAutoFocus.current?.(e), !e.defaultPrevented) {
			let e = this.#n.getPreFocusMemory(this);
			if (e && e.isConnected) try {
				e.focus({ preventScroll: !0 });
			} catch {
				document.body.focus();
			}
		}
	}
	#c() {
		if (!this.#t || !this.#i.trap.current) return;
		let e = this.#t, t = e.ownerDocument;
		this.#r.push(i(t, "focusin", (t) => {
			if (this.#e || !this.#n.isActiveScope(this)) return;
			let n = Ht(t.composedPath()[0], e);
			if (n !== null && e.contains(n)) this.#n.setFocusMemory(this, n);
			else {
				let n = this.#n.getFocusMemory(this);
				if (n && e.contains(n) && Vt(n)) t.preventDefault(), n.focus({ preventScroll: !0 });
				else {
					let t = this.#u(), n = this.#d()[0];
					(t || n || e).focus({ preventScroll: !0 });
				}
			}
		}, { capture: !0 }), i(e, "keydown", (e) => {
			if (!this.#i.loop || this.#e || e.key !== "Tab" || !this.#n.isActiveScope(this)) return;
			let n = this.#l();
			if (n.length === 0) return;
			let r = n[0], i = n[n.length - 1];
			!e.shiftKey && z(t) === i ? (e.preventDefault(), r.focus()) : e.shiftKey && z(t) === r && (e.preventDefault(), i.focus());
		}));
		let n = new MutationObserver(() => {
			let t = this.#n.getFocusMemory(this);
			if (t && !e.contains(t)) {
				let t = this.#u(), n = this.#d()[0], r = t || n;
				r ? (r.focus({ preventScroll: !0 }), this.#n.setFocusMemory(this, r)) : e.focus({ preventScroll: !0 });
			}
		});
		n.observe(e, {
			childList: !0,
			subtree: !0
		}), this.#r.push(() => n.disconnect());
	}
	#l() {
		return this.#t ? Rt(this.#t, {
			includeContainer: !1,
			getShadowRoot: !0
		}) : [];
	}
	#u() {
		return this.#l()[0] || null;
	}
	#d() {
		return this.#t ? zt(this.#t, {
			includeContainer: !1,
			getShadowRoot: !0
		}) : [];
	}
	static use(t) {
		let n = null;
		return k([() => t.ref.current, () => t.enabled.current], ([r, i]) => {
			r && i ? (n ||= new e(t), n.mount(r)) : n &&= (n.unmount(), null);
		}), L(() => {
			n?.unmount();
		}), { get props() {
			return { tabindex: -1 };
		} };
	}
};
// node_modules/bits-ui/dist/bits/utilities/focus-scope/focus-scope.svelte
function Wt(e, r) {
	g(r, !0);
	let i = c(r, "enabled", 3, !1), a = c(r, "trapFocus", 3, !1), o = c(r, "loop", 3, !1), s = c(r, "onCloseAutoFocus", 3, F), l = c(r, "onOpenAutoFocus", 3, F), u = Ut.use({
		enabled: A(() => i()),
		trap: A(() => a()),
		loop: S(() => o()),
		onCloseAutoFocus: A(() => s()),
		onOpenAutoFocus: A(() => l()),
		ref: S(() => r.ref)
	});
	var d = t(), p = O(d);
	n(p, () => r.focusScope ?? m, () => ({ props: u.props })), f(e, d), y();
}
// node_modules/bits-ui/dist/bits/utilities/text-selection-layer/use-text-selection-layer.svelte.js
var Gt = () => {};
globalThis.bitsTextSelectionLayers ??= /* @__PURE__ */ new Map();
var Kt = class e {
	static create(t) {
		return new e(t);
	}
	opts;
	domContext;
	#e = F;
	#t = !1;
	#n = Gt;
	#r = Gt;
	constructor(e) {
		this.opts = e, this.domContext = new Ce(e.ref);
		let t = F;
		k(() => [
			this.opts.enabled.current,
			this.opts.onPointerDown.current,
			this.opts.onPointerUp.current
		], ([e, n, r]) => (this.#t = e, this.#n = n, this.#r = r, e && (globalThis.bitsTextSelectionLayers.set(this, this.opts.enabled), t(), t = this.#i()), () => {
			this.#t = !1, t(), this.#s(), globalThis.bitsTextSelectionLayers.delete(this);
		}));
	}
	#i() {
		return re(i(this.domContext.getDocument(), "pointerdown", this.#o), i(this.domContext.getDocument(), "pointerup", this.#a));
	}
	#a = (e) => {
		this.#s(), e.defaultPrevented || this.#r(e);
	};
	#o = (e) => {
		if (!this.#t) return;
		this.#s();
		let t = this.opts.ref.current, n = e.target;
		le(t) && le(n) && Yt(this) && be(t, n) && (this.#n(e), e.defaultPrevented || (this.#e = Jt(t, this.domContext.getDocument().body)));
	};
	#s = () => {
		this.#e(), this.#e = F;
	};
}, qt = (e) => e.style.userSelect || e.style.webkitUserSelect;
function Jt(e, t) {
	let n = qt(t), r = qt(e);
	return K(t, "none"), K(e, "text"), () => {
		K(t, n), K(e, r);
	};
}
function K(e, t) {
	e.style.userSelect = t, e.style.webkitUserSelect = t;
}
function Yt(e) {
	let t = [...globalThis.bitsTextSelectionLayers];
	if (!t.length) return !1;
	let n = t.at(-1);
	return n ? n[0] === e : !1;
}
// node_modules/bits-ui/dist/bits/utilities/text-selection-layer/text-selection-layer.svelte
function Xt(e, r) {
	g(r, !0);
	let i = c(r, "preventOverflowTextSelection", 3, !0), a = c(r, "onPointerDown", 3, F), o = c(r, "onPointerUp", 3, F);
	Kt.create({
		id: A(() => r.id),
		onPointerDown: A(() => a()),
		onPointerUp: A(() => o()),
		enabled: A(() => r.enabled && i()),
		ref: S(() => r.ref)
	});
	var s = t(), l = O(s);
	n(l, () => r.children ?? m), f(e, s), y();
}
// node_modules/bits-ui/dist/internal/use-id.js
globalThis.bitsIdCounter ??= { current: 0 };
function Zt(e = "bits") {
	return globalThis.bitsIdCounter.current++, `${e}-${globalThis.bitsIdCounter.current}`;
}
// node_modules/bits-ui/dist/internal/shared-state.svelte.js
var Qt = class {
	#e;
	#t = 0;
	#n = E();
	#r;
	constructor(e) {
		this.#e = e;
	}
	#i() {
		--this.#t, this.#r && this.#t <= 0 && (this.#r(), p(this.#n, void 0), this.#r = void 0);
	}
	get(...e) {
		return this.#t += 1, D(this.#n) === void 0 && (this.#r = h(() => {
			p(this.#n, this.#e(...e), !0);
		})), C(() => () => {
			this.#i();
		}), D(this.#n);
	}
}, q = new ee(), $t = /* @__PURE__ */ new Map(), en = [
	"padding-right",
	"margin-right",
	"overflow",
	"overflow-x",
	"overflow-y",
	"pointer-events",
	"--scrollbar-width"
], J = null, tn = !1, Y = /* @__PURE__ */ new Set(), nn = null, X = null, Z = !1;
function Q(e, t, n) {
	e.setProperty(t, n), Y.add(t), t === "overflow" && (Y.add("overflow-x"), Y.add("overflow-y"));
}
var $ = A(() => {
	for (let e of q.values()) if (e) return !0;
	return !1;
}), rn = A(() => {
	for (let [e, t] of q) if (t && ($t.get(e)?.() ?? !0)) return !0;
	return !1;
}), an = null, on = new Qt(() => {
	function e(e, t) {
		let n = J?.get(t);
		n?.value ? e.body.style.setProperty(t, n.value, n.priority) : e.body.style.removeProperty(t);
	}
	function t(t) {
		for (let n of en) Y.has(n) && e(t, n);
		!tn && t.body.style.length === 0 && t.body.removeAttribute("style"), J = null, Y.clear(), se && nn?.();
	}
	function n(t) {
		Y.delete("pointer-events") && e(t, "pointer-events");
	}
	function r() {
		X !== null && (window.clearTimeout(X), X = null);
	}
	function a(e, t) {
		r(), Z = !0, an = Date.now();
		let n = an, i = () => {
			X = null, an === n && (cn(q) ? Z = !1 : (Z = !1, t()));
		}, a = e === null ? 24 : e;
		X = window.setTimeout(i, a);
	}
	function o() {
		if (J === null && q.size === 0 && !Z) {
			tn = document.body.hasAttribute("style"), J = /* @__PURE__ */ new Map();
			for (let e of en) J.set(e, {
				value: document.body.style.getPropertyValue(e),
				priority: document.body.style.getPropertyPriority(e)
			});
		}
	}
	return k(() => $.current, () => {
		if (!$.current) return;
		o(), Z = !1;
		let e = getComputedStyle(document.documentElement), t = getComputedStyle(document.body), n = e.scrollbarGutter?.includes("stable") || t.scrollbarGutter?.includes("stable"), r = window.innerWidth - document.documentElement.clientWidth, a = {
			padding: Number.parseInt(t.paddingRight ?? "0", 10) + r,
			margin: Number.parseInt(t.marginRight ?? "0", 10)
		};
		r > 0 && !n && (Q(document.body.style, "padding-right", `${a.padding}px`), Q(document.body.style, "margin-right", `${a.margin}px`), Q(document.body.style, "--scrollbar-width", `${r}px`)), Q(document.body.style, "overflow", "hidden"), se && (nn = i(document, "touchmove", (e) => {
			e.target === document.documentElement && (e.touches.length > 1 || e.preventDefault());
		}, { passive: !1 })), R(() => {
			rn.current && Q(document.body.style, "pointer-events", "none"), Q(document.body.style, "overflow", "hidden");
		});
	}), k(() => rn.current, () => {
		$.current && R(() => {
			$.current && (rn.current ? Q(document.body.style, "pointer-events", "none") : n(document));
		});
	}, { lazy: !0 }), L(() => () => {
		nn?.();
	}), {
		get lockMap() {
			return q;
		},
		resetBodyStyle: t,
		restorePointerEvents: n,
		scheduleCleanupIfNoNewLocks: a,
		cancelPendingCleanup: r,
		ensureInitialStyleCaptured: o
	};
}), sn = class {
	#e = Zt();
	#t;
	#n = () => null;
	#r;
	locked;
	constructor(e, t = () => null, n = () => !0) {
		this.#t = e, this.#n = t, this.#r = on.get(), this.#r && (this.#r.cancelPendingCleanup(), this.#r.ensureInitialStyleCaptured(), $t.set(this.#e, n), this.#r.lockMap.set(this.#e, this.#t ?? !1), this.locked = A(() => this.#r.lockMap.get(this.#e) ?? !1, (e) => this.#r.lockMap.set(this.#e, e)), L(() => {
			if (this.#r.lockMap.delete(this.#e), $t.delete(this.#e), cn(this.#r.lockMap)) return;
			let e = this.#n(), t = document;
			this.#r.restorePointerEvents(t), this.#r.scheduleCleanupIfNoNewLocks(e, () => {
				this.#r.resetBodyStyle(t);
			});
		}));
	}
};
function cn(e) {
	for (let [t, n] of e) if (n) return !0;
	return !1;
}
// node_modules/bits-ui/dist/bits/utilities/scroll-lock/scroll-lock.svelte
function ln(e, t) {
	g(t, !0);
	let n = c(t, "preventScroll", 3, !0), r = c(t, "restoreScrollDelay", 3, null), i = c(t, "blockPointer", 3, () => !0);
	S(() => {
		n() && new sn(n(), () => r(), i());
	}), y();
}
// node_modules/bits-ui/dist/bits/dialog/components/dialog-overlay.svelte
var un = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"forceMount",
	"child",
	"children",
	"ref"
]), dn = s("<div><!></div>");
function fn(e, r) {
	let i = o();
	g(r, !0);
	let a = c(r, "id", 19, () => ue(i)), s = c(r, "forceMount", 3, !1), p = c(r, "ref", 15, null), h = d(r, un), v = Pe.create({
		id: A(() => a()),
		ref: A(() => p(), (e) => p(e))
	}), x = w(() => P(h, v.props));
	var S = t(), C = O(S), T = (e) => {
		var i = t(), a = O(i), o = (e) => {
			var i = t(), a = O(i);
			{
				let e = w(() => ({
					props: P(D(x)),
					...v.snippetProps
				}));
				n(a, () => r.child, () => D(e));
			}
			f(e, i);
		}, s = (e) => {
			var t = dn();
			l(t, (e) => ({ ...e }), [() => P(D(x))]);
			var i = _(t);
			n(i, () => r.children ?? m, () => v.snippetProps), b(t), f(e, t);
		};
		u(a, (e) => {
			r.child ? e(o) : e(s, -1);
		}), f(e, i);
	};
	u(C, (e) => {
		(v.shouldRender || s()) && e(T);
	}), f(e, S), y();
}
// node_modules/bits-ui/dist/bits/dialog/components/dialog-description.svelte
var pn = /* @__PURE__ */ new Set([
	"$$slots",
	"$$events",
	"$$legacy",
	"id",
	"children",
	"child",
	"ref"
]), mn = s("<div><!></div>");
function hn(e, r) {
	let i = o();
	g(r, !0);
	let a = c(r, "id", 19, () => ue(i)), s = c(r, "ref", 15, null), p = d(r, pn), h = Me.create({
		id: A(() => a()),
		ref: A(() => s(), (e) => s(e))
	}), v = w(() => P(p, h.props));
	var x = t(), S = O(x), C = (e) => {
		var i = t(), a = O(i);
		n(a, () => r.child, () => ({ props: D(v) })), f(e, i);
	}, T = (e) => {
		var t = mn();
		l(t, () => ({ ...D(v) }));
		var i = _(t);
		n(i, () => r.children ?? m), b(t), f(e, t);
	};
	u(S, (e) => {
		r.child ? e(C) : e(T, -1);
	}), f(e, x), y();
}
// svelte/lib/ui/dialogController.ts
var gn = /* @__PURE__ */ new Set();
function _n(e) {
	return gn.add(e), () => {
		gn.delete(e);
	};
}
export { L as C, Se as S, De as _, Zt as a, Ce as b, pt as c, Ke as d, Re as f, Ne as g, ke as h, ln as i, ut as l, Ae as m, hn as n, Xt as o, Fe as p, fn as r, Wt as s, _n as t, Xe as u, Oe as v, xe as x, Te as y };
