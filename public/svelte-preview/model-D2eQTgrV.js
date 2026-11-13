// svelte/features/documents/model.ts
var e = (e) => JSON.stringify([
	e.account,
	e.roomId,
	e.epicId
]);
function t(e, t, n) {
	return {
		account: e.me,
		roomId: e.id,
		epicId: !n && e.epics.some((e) => e.id === t) ? t : null
	};
}
function n(e, t) {
	if (!t.epicId) return e.doc ?? "";
	if (Object.hasOwn(e.docs ?? {}, t.epicId)) return e.docs?.[t.epicId] ?? "";
	let n = e.epics.find((e) => e.id === t.epicId);
	return n ? `# ${n.title}\n\n**Objetivo:** o que este épico entrega e por quê (edite aqui ou peça pro seu Claude).\n\n## Contexto\n\n- \n\n## Decisões\n\n- \n` : "";
}
var r = (e) => typeof e == "object" && !!e && !Array.isArray(e);
function i(e) {
	if (!r(e)) return null;
	let t = (e) => r(e) && Number.isSafeInteger(e.client) && Number(e.client) >= 0 && Number.isSafeInteger(e.clock) && Number(e.clock) >= 0 ? {
		client: Number(e.client),
		clock: Number(e.clock)
	} : void 0, n = t(e.type), i = t(e.item), a = typeof e.tname == "string" && e.tname.length <= 100 ? e.tname : void 0;
	if (!n && !a || e.item !== void 0 && e.item !== null && !i) return null;
	let o = Number.isSafeInteger(e.assoc) && Math.abs(Number(e.assoc)) <= 1 ? Number(e.assoc) : 0;
	return {
		...n ? { type: n } : {},
		...a ? { tname: a } : {},
		...i ? { item: i } : {},
		assoc: o
	};
}
function a(e) {
	if (!r(e)) return {};
	let t = r(e.user) ? e.user : {}, n = typeof t.name == "string" ? t.name.replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 80) : "Anonymous", a = typeof t.color == "string" && /^#[0-9a-f]{6}$/i.test(t.color) ? t.color : "#30bced", o = r(e.cursor) ? e.cursor : null, s = o && i(o.anchor), c = o && i(o.head);
	return {
		user: {
			name: n || "Anonymous",
			color: a,
			colorLight: `${a}33`
		},
		...s && c ? { cursor: {
			anchor: s,
			head: c
		} } : {}
	};
}
export { e as i, n, a as r, t };
