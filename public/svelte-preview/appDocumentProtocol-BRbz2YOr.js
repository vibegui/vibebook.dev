import { r as e } from "./privacy-DXCRlVGH.js";
// svelte/features/apps/tools.ts
var t = [
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
function n(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function r(e) {
	return {
		content: [{
			type: "text",
			text: typeof e == "string" ? e : JSON.stringify(e) ?? ""
		}],
		...n(e) ? { structuredContent: e } : {}
	};
}
var i = (e) => ({
	isError: !0,
	content: [{
		type: "text",
		text: e
	}]
});
function a(t, n, r) {
	let i = typeof n.thread == "string" ? n.thread : "main", a = Math.min(Math.max(Number(n.limit) || 50, 1), 100);
	return {
		room: {
			id: t.id,
			title: t.book.title
		},
		me: {
			email: t.me,
			name: r(t.me)
		},
		members: t.members.map((e) => ({
			email: e,
			name: r(e)
		})),
		doc: t.doc || "",
		epics: t.epics.filter((e) => !e.archived).map((e) => ({
			id: e.id,
			title: e.title,
			tasks: e.tasks.map((e) => ({
				id: e.id,
				title: e.title,
				status: e.status,
				owner: e.owner || null
			}))
		})),
		room_tasks: (t.roomTasks || []).map((e) => ({
			id: e.id,
			title: e.title,
			status: e.status
		})),
		messages: e(t, i).slice(-a).map((e) => ({
			id: e.id,
			from: e.author === "ai" ? "@vibe" : r(e.author),
			agent: e.kind === "agent",
			text: e.text,
			at: new Date(e.ts).toISOString()
		}))
	};
}
function o(e) {
	let t = e.t, o = () => {
		let t = e.room();
		return e.current() && !!t?.members.includes(t.me);
	}, s = async (t, n) => o() && await e.ask(t, n) && o();
	return async (c, l) => {
		if (!o()) return i("App is no longer active");
		let u = e.room();
		if (!u) return i("Room unavailable");
		let d = n(l) ? l : {}, f = (e) => typeof e == "string" && e !== "main" ? u.epics.some((t) => t.id === e) ? e : null : "main";
		switch (c) {
			case "vibebook_read": return r(a(u, d, e.name));
			case "vibebook_ai_spend":
			case "vibebook_router_stats": {
				let t = await e.metric(c === "vibebook_ai_spend" ? "spend" : "router", !!d.room);
				return o() ? r(t) : i("App is no longer active");
			}
			case "vibebook_connections": {
				let t = await e.connections();
				return o() ? r(t.map((e) => ({
					id: e.id,
					title: e.title,
					scope: e.scope,
					tools: e.tools
				}))) : i("App is no longer active");
			}
			case "vibebook_post": {
				let n = f(d.thread), a = String(d.text || "").trim().slice(0, 4e3);
				if (!n || !a) return i("text and a valid thread (main or an epic id) needed");
				if (!await s(t("postar"), a)) return i("the person cancelled");
				if (n !== "main" && !e.room()?.epics.some((e) => e.id === n)) return i("no such epic");
				let c = await e.request({
					t: "msg",
					thread: n,
					text: a,
					files: []
				});
				return o() && c.ok ? r("posted") : i(c.ok ? "App is no longer active" : c.error || "Post unconfirmed");
			}
			case "vibebook_add_task": {
				let n = f(d.epic_id), a = u.epics.find((e) => e.id === n), c = String(d.title || "").trim().slice(0, 200);
				if (!n) return i("no such epic");
				if (!c || !await s(t("criar uma tarefa"), `${a ? a.title : t("sala principal")}: ${c}`)) return i("cancelled");
				if (n !== "main" && !e.room()?.epics.some((e) => e.id === n)) return i("no such epic");
				let l = new Set([...e.room()?.epics.flatMap((e) => e.tasks) || [], ...e.room()?.roomTasks || []].map((e) => e.id)), p = await e.request({
					t: "task.add",
					epic: n,
					title: c
				});
				if (!o() || !p.ok) return i(p.ok ? "App is no longer active" : p.error || "Task unconfirmed");
				let m = e.room();
				return (n === "main" ? m?.roomTasks : m?.epics.find((e) => e.id === n)?.tasks)?.some((e) => !l.has(e.id) && e.title === c) ? r("added") : i("Task creation unconfirmed. Check the room before trying again.");
			}
			case "vibebook_task_status": {
				let n = [...u.epics.flatMap((e) => e.tasks), ...u.roomTasks || []].find((e) => e.id === d.task_id), a = d.status;
				if (!n || a !== "todo" && a !== "doing" && a !== "review" && a !== "done") return i("no such task or bad status");
				if (!await s(t("mover uma tarefa"), `${n.title} → ${a}`)) return i("cancelled");
				if (!e.room()?.epics.flatMap((e) => e.tasks).concat(e.room()?.roomTasks || []).some((e) => e.id === n.id)) return i("no such task");
				let c = await e.request({
					t: "task.status",
					id: n.id,
					status: a
				});
				if (!o() || !c.ok) return i(c.ok ? "App is no longer active" : c.error || "Task change unconfirmed");
				let l = e.room();
				return [...l?.epics.flatMap((e) => e.tasks) || [], ...l?.roomTasks || []].find((e) => e.id === n.id)?.status === a ? r("moved") : i("Task change unconfirmed. Check the room before trying again.");
			}
			case "vibebook_call_connection": {
				let n = await e.connections();
				if (!o()) return i("App is no longer active");
				let r = n.find((e) => e.id === d.connection_id), a = r?.tools.find((e) => e.name === d.tool);
				if (!r || !a) return i("no such connection/tool for this person");
				if (!await s(t("usar {tool} em {conn}", {
					tool: a.name,
					conn: r.title
				}), JSON.stringify(d.arguments || {}))) return i("cancelled");
				let c = await e.connections();
				if (!o() || !c.some((e) => e.id === r.id && e.tools.some((e) => e.name === a.name))) return i("connection/tool unavailable");
				let l = await e.call(r.id, a.name, d.arguments || {});
				return o() ? l : i("App is no longer active");
			}
			default: return i(`unknown tool ${c}`);
		}
	};
}
// shared/appDocumentProtocol.ts
var s = "vibebook.app-document.v1", c = "__VIBEBOOK_APP_DOCUMENT_NONCE__", l = () => `app-document-${crypto.randomUUID()}`, u = (e) => typeof e == "object" && !!e && !Array.isArray(e), d = (e) => typeof e == "string" && /^[a-f0-9]{64}$/.test(e);
export { d as a, t as c, u as i, i as l, c as n, o, l as r, a as s, s as t, r as u };
