// svelte/features/chat-interactive/eligibility.ts
function e(e) {
	if (!e || e.length > 16384) return null;
	try {
		let t = JSON.parse(e);
		return !t || typeof t != "object" || !("options" in t) || !Array.isArray(t.options) || t.options.length < 2 || t.options.length > 8 || t.options.some((e) => typeof e != "string" || !e.trim() || e.length > 120) ? null : {
			options: t.options,
			multi: "multi" in t && t.multi === !0,
			closed: "closed" in t && !!t.closed
		};
	} catch {
		return null;
	}
}
var t = (e, t) => e.messages.filter((e) => e.reply_to === t.id && e.author === t.author && e.kind !== "agent").sort((e, t) => e.id - t.id)[0], n = (e, n) => e.members.includes(e.me) && n.kind === "agent" && n.author === e.me && !t(e, n);
export { n, e as r, t };
