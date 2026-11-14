// svelte/features/chat/privacy.ts
var e = (e) => e.kind === "agent" && /^\u23f8/.test(e.text || "") && /"options":\["Aprovar","Negar"\]/.test(e.choices || ""), t = (e, t) => e.messages.find((e) => e.id === t) || e.origins?.find((e) => e.id === t), n = (e, t) => t?.kind === "agent" && t.author !== e.me && /^(⏸ Seu Claude|❓ Seu Claude)/.test(t.text || "");
function r(n, r) {
	if (!r.reply_to || r.kind === "agent") return !1;
	let i = t(n, r.reply_to);
	return !!i && e(i) && i.author === r.author;
}
function i(e, i) {
	let a = i.reply_to == null ? void 0 : t(e, i.reply_to);
	return !n(e, i) && !n(e, a) && !r(e, i);
}
var a = (e, t) => e.messages.filter((n) => n.thread === t && i(e, n));
// svelte/features/apps/model.ts
function o(e) {
	let t = /* @__PURE__ */ new Set();
	return (e.files || []).filter((e) => e.type === "text/html" && /^apps\/[\w.-]+\.html$/i.test(e.name) && !t.has(e.name) && !!t.add(e.name)).map((e) => ({
		tool: e.name.slice(5, -5),
		title: e.name.slice(5, -5),
		file: e
	}));
}
function s(e, t, n) {
	if (n.connection === "room") {
		let t = o(e).find((e) => e.tool === n.tool);
		return t ? JSON.stringify([
			e.id,
			e.me,
			"room",
			t.tool,
			t.file.id,
			t.file.ts
		]) : null;
	}
	let r = t.find((e) => e.id === n.connection), i = r?.apps.find((e) => e.tool === n.tool);
	return i && r ? JSON.stringify([
		e.id,
		e.me,
		r.id,
		i.tool,
		r.auth,
		r.signed_in
	]) : null;
}
function c(e, t) {
	return `/api/books/${encodeURIComponent(e)}/connections/${encodeURIComponent(t)}/signin?ui=svelte`;
}
function l(e) {
	try {
		let t = new URL(e);
		return ["http:", "https:"].includes(t.protocol) && !t.username && !t.password ? t.href : null;
	} catch {
		return null;
	}
}
function u(e) {
	let t = /* @__PURE__ */ new Set();
	return e.apps.filter((e) => !t.has(e.tool) && !!t.add(e.tool));
}
// svelte/features/apps/tools.ts
var d = [
	{
		name: "vibebook_read",
		description: "The room: title, doc, epics with tasks, members and the newest messages of a thread (default main).",
		inputSchema: {
			type: "object",
			properties: {
				thread: { type: "string" },
				limit: { type: "number" }
			}
		},
		annotations: { readOnlyHint: !0 }
	},
	{
		name: "vibebook_post",
		description: "Post a message as the person looking at the app (they confirm first).",
		inputSchema: {
			type: "object",
			properties: {
				text: { type: "string" },
				thread: { type: "string" }
			},
			required: ["text"]
		}
	},
	{
		name: "vibebook_add_task",
		description: "Add a task to an epic (epic_id) or to the room (main); the person confirms.",
		inputSchema: {
			type: "object",
			properties: {
				title: { type: "string" },
				epic_id: { type: "string" }
			},
			required: ["title"]
		}
	},
	{
		name: "vibebook_task_status",
		description: "Move a task: todo | doing | review | done; the person confirms.",
		inputSchema: {
			type: "object",
			properties: {
				task_id: { type: "string" },
				status: {
					type: "string",
					enum: [
						"todo",
						"doing",
						"review",
						"done"
					]
				}
			},
			required: ["task_id", "status"]
		}
	},
	{
		name: "vibebook_connections",
		description: "The room's MCP connections this person can use, with their tools.",
		inputSchema: { type: "object" },
		annotations: { readOnlyHint: !0 }
	},
	{
		name: "vibebook_call_connection",
		description: "Call a tool of one of the room's MCP connections; tools that aren't read-only ask the person first.",
		inputSchema: {
			type: "object",
			properties: {
				connection_id: { type: "string" },
				tool: { type: "string" },
				arguments: { type: "object" }
			},
			required: ["connection_id", "tool"]
		}
	},
	{
		name: "vibebook_ai_spend",
		description: "vibebook's model spend: Jev and the LLMs by event and model, the hub router, the last 30 days and OpenRouter's total for the key. Only in vibebook's report rooms.",
		inputSchema: {
			type: "object",
			properties: {}
		},
		annotations: { readOnlyHint: !0 }
	},
	{
		name: "vibebook_router_stats",
		description: "The hub router A/B (Jev vs Haiku): per arm how many messages were ignored, answered or woke a Claude, latency p50/p95, cost, and the last 40 decisions (who = whose router). room: true = this room, every member's router; false = the person's own router in all rooms.",
		inputSchema: {
			type: "object",
			properties: { room: { type: "boolean" } }
		},
		annotations: { readOnlyHint: !0 }
	}
];
function f(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function p(e) {
	return {
		content: [{
			type: "text",
			text: typeof e == "string" ? e : JSON.stringify(e) ?? ""
		}],
		...f(e) ? { structuredContent: e } : {}
	};
}
var m = (e) => ({
	isError: !0,
	content: [{
		type: "text",
		text: e
	}]
});
function h(e, t, n) {
	let r = typeof t.thread == "string" ? t.thread : "main", i = Math.min(Math.max(Number(t.limit) || 50, 1), 100);
	return {
		room: {
			id: e.id,
			title: e.book.title
		},
		me: {
			email: e.me,
			name: n(e.me)
		},
		members: e.members.map((e) => ({
			email: e,
			name: n(e)
		})),
		doc: e.doc || "",
		epics: e.epics.filter((e) => !e.archived).map((e) => ({
			id: e.id,
			title: e.title,
			tasks: e.tasks.map((e) => ({
				id: e.id,
				title: e.title,
				status: e.status,
				owner: e.owner || null
			}))
		})),
		room_tasks: (e.roomTasks || []).map((e) => ({
			id: e.id,
			title: e.title,
			status: e.status
		})),
		messages: a(e, r).slice(-i).map((e) => ({
			id: e.id,
			from: e.author === "ai" ? "@vibe" : n(e.author),
			agent: e.kind === "agent",
			text: e.text,
			at: new Date(e.ts).toISOString()
		}))
	};
}
function g(e) {
	let t = e.t, n = () => {
		let t = e.room();
		return e.current() && !!t?.members.includes(t.me);
	}, r = async (t, r) => n() && await e.ask(t, r) && n();
	return async (i, a) => {
		if (!n()) return m("App is no longer active");
		let o = e.room();
		if (!o) return m("Room unavailable");
		let s = f(a) ? a : {}, c = (e) => typeof e == "string" && e !== "main" ? o.epics.some((t) => t.id === e) ? e : null : "main";
		switch (i) {
			case "vibebook_read": return p(h(o, s, e.name));
			case "vibebook_ai_spend":
			case "vibebook_router_stats": {
				let t = await e.metric(i === "vibebook_ai_spend" ? "spend" : "router", !!s.room);
				return n() ? p(t) : m("App is no longer active");
			}
			case "vibebook_connections": {
				let t = await e.connections();
				return n() ? p(t.map((e) => ({
					id: e.id,
					title: e.title,
					scope: e.scope,
					tools: e.tools
				}))) : m("App is no longer active");
			}
			case "vibebook_post": {
				let i = c(s.thread), a = String(s.text || "").trim().slice(0, 4e3);
				if (!i || !a) return m("text and a valid thread (main or an epic id) needed");
				if (!await r(t("postar"), a)) return m("the person cancelled");
				if (i !== "main" && !e.room()?.epics.some((e) => e.id === i)) return m("no such epic");
				let o = await e.request({
					t: "msg",
					thread: i,
					text: a,
					files: []
				});
				return n() && o.ok ? p("posted") : m(o.ok ? "App is no longer active" : o.error || "Post unconfirmed");
			}
			case "vibebook_add_task": {
				let i = c(s.epic_id), a = o.epics.find((e) => e.id === i), l = String(s.title || "").trim().slice(0, 200);
				if (!i) return m("no such epic");
				if (!l || !await r(t("criar uma tarefa"), `${a ? a.title : t("sala principal")}: ${l}`)) return m("cancelled");
				if (i !== "main" && !e.room()?.epics.some((e) => e.id === i)) return m("no such epic");
				let u = new Set([...e.room()?.epics.flatMap((e) => e.tasks) || [], ...e.room()?.roomTasks || []].map((e) => e.id)), d = await e.request({
					t: "task.add",
					epic: i,
					title: l
				});
				if (!n() || !d.ok) return m(d.ok ? "App is no longer active" : d.error || "Task unconfirmed");
				let f = e.room();
				return (i === "main" ? f?.roomTasks : f?.epics.find((e) => e.id === i)?.tasks)?.some((e) => !u.has(e.id) && e.title === l) ? p("added") : m("Task creation unconfirmed. Check the room before trying again.");
			}
			case "vibebook_task_status": {
				let i = [...o.epics.flatMap((e) => e.tasks), ...o.roomTasks || []].find((e) => e.id === s.task_id), a = s.status;
				if (!i || a !== "todo" && a !== "doing" && a !== "review" && a !== "done") return m("no such task or bad status");
				if (!await r(t("mover uma tarefa"), `${i.title} → ${a}`)) return m("cancelled");
				if (!e.room()?.epics.flatMap((e) => e.tasks).concat(e.room()?.roomTasks || []).some((e) => e.id === i.id)) return m("no such task");
				let c = await e.request({
					t: "task.status",
					id: i.id,
					status: a
				});
				if (!n() || !c.ok) return m(c.ok ? "App is no longer active" : c.error || "Task change unconfirmed");
				let l = e.room();
				return [...l?.epics.flatMap((e) => e.tasks) || [], ...l?.roomTasks || []].find((e) => e.id === i.id)?.status === a ? p("moved") : m("Task change unconfirmed. Check the room before trying again.");
			}
			case "vibebook_call_connection": {
				let i = await e.connections();
				if (!n()) return m("App is no longer active");
				let a = i.find((e) => e.id === s.connection_id), o = a?.tools.find((e) => e.name === s.tool);
				if (!a || !o) return m("no such connection/tool for this person");
				if (!await r(t("usar {tool} em {conn}", {
					tool: o.name,
					conn: a.title
				}), JSON.stringify(s.arguments || {}))) return m("cancelled");
				let c = await e.connections();
				if (!n() || !c.some((e) => e.id === a.id && e.tools.some((e) => e.name === o.name))) return m("connection/tool unavailable");
				let l = await e.call(a.id, o.name, s.arguments || {});
				return n() ? l : m("App is no longer active");
			}
			default: return m(`unknown tool ${i}`);
		}
	};
}
export { p as a, o as c, t as d, e as f, m as i, l, i as m, h as n, s as o, a as p, d as r, u as s, g as t, c as u };
