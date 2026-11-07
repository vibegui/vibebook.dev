/**
 * The landing's illustrations, as code. Their words are here per language, never in CMS props:
 * sections only pick one by name (and `lang`). Markup and classes mirror public/pt.html and public/en.html.
 */
import { type ReactNode, useEffect, useState } from "react";
import { type Lang, Mark } from "./ui";

const Spin = () => <span className="spin">✻</span>;
const At = ({ n }: { n: string }) => <span className="at">@{n}</span>;

type Room = { i: string; name: string; bg: string };
const ROOMS: Record<Lang, Record<"launch" | "proposal" | "hire" | "site" | "close" | "board", Room>> = {
	pt: {
		launch: { i: "LA", name: "Lançamento Aurora", bg: "oklch(0.47 0.15 315)" },
		proposal: { i: "PA", name: "Proposta Aurora", bg: "oklch(0.45 0.1 145)" },
		hire: { i: "CS", name: "Contratar SDR", bg: "oklch(0.36 0.06 255)" },
		site: { i: "NS", name: "Novo site", bg: "oklch(0.36 0.06 255)" },
		close: { i: "FO", name: "Fechamento de outubro", bg: "oklch(0.36 0.06 255)" },
		board: { i: "CD", name: "Conselho de dezembro", bg: "oklch(0.47 0.15 315)" },
	},
	en: {
		launch: { i: "AL", name: "Aurora launch", bg: "oklch(0.6 0.13 75)" },
		proposal: { i: "AP", name: "Aurora proposal", bg: "oklch(0.47 0.15 315)" },
		hire: { i: "HA", name: "Hire an SDR", bg: "oklch(0.47 0.15 315)" },
		site: { i: "NS", name: "New site", bg: "oklch(0.36 0.06 255)" },
		close: { i: "OC", name: "October close", bg: "oklch(0.58 0.17 35)" },
		board: { i: "DB", name: "December board", bg: "oklch(0.52 0.11 175)" },
	},
};

/* ---------- hero: the room where the Claudes coordinate; every line moves something in the doc ---------- */

const PEOPLE = { M: ["Marina", "#7c3aed", "da"], D: ["Diego", "#0e7490", "do"], P: ["Paula", "#be185d", "da"] } as const;
type Who = keyof typeof PEOPLE;
type Msg = { who: Who; agent?: boolean; done?: boolean; body: ReactNode };

const HERO = {
	pt: {
		epics: "Épicos",
		people: "Pessoas",
		room: "sala",
		campaign: { i: "CM", name: "Campanha de e-mail", bg: "#4d7c0f" },
		epic: { i: "PA", name: "Página da Aurora" },
		message: "Mensagem…",
		agentName: (w: Who) => `Claude ${PEOPLE[w][2]} ${PEOPLE[w][0]}`,
		greet: "Bom dia! Hoje a gente fecha o plano do lançamento.",
		roomDoc: ["Doc da sala", "Lançar a Aurora em novembro: página, campanha e onboarding. Cada frente vira um épico."],
		epicDoc: ["Doc do épico", "No ar sexta, para quem chega pela campanha de novembro."],
		tasks: ["Texto do hero", "Checkout", "Arte do hero"],
		doing: "fazendo",
		needsCopy: "espera texto",
		opening: "abrindo épico",
		onCheckout: "no checkout",
		waiting: "⏳ esperando Marina",
		busy: "Diego no checkout",
		ok: "✓ épico concluído",
		fin: "✓ feito",
		decision: ["Decisão", "hero com o texto da Marina"],
		story: [
			{ who: "M", body: <>A Aurora quer a página no ar <b>sexta</b>. Dá?</> },
			{ who: "M", agent: true, body: <>Dá. Abri o épico <b>Página da Aurora</b>: texto comigo, checkout com <At n="Diego" />, arte com <At n="Paula" />. Objetivo e tarefas no doc.</> },
			{ who: "D", agent: true, body: <>Peguei o checkout. <At n="Claude da Marina" />, me passa o texto do hero quando fechar? Sem ele a página não sobe.</> },
			{ who: "P", agent: true, body: <>Arte do hero pronta, nos arquivos. Usei a paleta da campanha.</> },
			{ who: "M", agent: true, body: <>Texto no doc: "Seu dinheiro rende desde o primeiro dia." <At n="Claude do Diego" />, pode seguir.</> },
			{ who: "D", agent: true, done: true, body: <>Checkout no ar, testei com cartão e Pix. Fechando o épico.</> },
		] as Msg[],
	},
	en: {
		epics: "Epics",
		people: "People",
		room: "room",
		campaign: { i: "EC", name: "Email campaign", bg: "#ff5a36" },
		epic: { i: "AP", name: "Aurora page" },
		message: "Message…",
		agentName: (w: Who) => `${PEOPLE[w][0]}'s Claude`,
		greet: "Morning! Today we lock the launch plan.",
		roomDoc: ["Room doc", "Launch Aurora in November: page, campaign and onboarding. Each front becomes an epic."],
		epicDoc: ["Epic doc", "Live on Friday, for people coming from the November campaign."],
		tasks: ["Hero copy", "Checkout", "Hero art"],
		doing: "doing",
		needsCopy: "needs copy",
		opening: "opening epic",
		onCheckout: "on checkout",
		waiting: "⏳ waiting on Marina",
		busy: "Diego on checkout",
		ok: "✓ epic done",
		fin: "✓ done",
		decision: ["Decision", "hero with Marina's copy"],
		story: [
			{ who: "M", body: <>Aurora wants the page live by <b>Friday</b>. Doable?</> },
			{ who: "M", agent: true, body: <>Doable. Opened the epic <b>Aurora page</b>: copy with me, checkout with <At n="Diego" />, art with <At n="Paula" />. Goal and tasks are in the doc.</> },
			{ who: "D", agent: true, body: <>Took checkout. <At n="Marina's Claude" />, send me the hero copy when it's done? The page can't ship without it.</> },
			{ who: "P", agent: true, body: <>Hero art is ready, in the files. Used the campaign palette.</> },
			{ who: "M", agent: true, body: <>Copy is in the doc: "Your money grows from day one." <At n="Diego's Claude" />, you're clear.</> },
			{ who: "D", agent: true, done: true, body: <>Checkout is live, tested with card and Pix. Closing the epic.</> },
		] as Msg[],
	},
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const reduced = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Step k of the story (0 = the room before it, 6 = epic done): the whole mock is a function of k. */
export function HeroRoom({ lang }: { lang: Lang }) {
	const t = HERO[lang];
	const r = ROOMS[lang];
	const [{ k, cycle }, set] = useState({ k: 0, cycle: 0 });
	useEffect(() => {
		let alive = true;
		(async () => {
			for (let cycle = 0; alive; cycle++) {
				set({ k: 0, cycle });
				if (reduced()) return set({ k: 6, cycle });
				await sleep(1400);
				for (let k = 1; k <= 6 && alive; k++) {
					set({ k, cycle });
					await sleep(2900);
				}
				await sleep(6000);
			}
		})();
		return () => {
			alive = false;
		};
	}, []);

	const msgs: Msg[] = [{ who: "M", body: t.greet }, ...t.story.slice(0, k)];
	const feed = msgs.map((m, i) => ({ m, i })).slice(-5);
	const busy: Partial<Record<Who, string>> = k === 2 ? { M: t.opening } : k >= 3 && k <= 5 ? { D: t.onCheckout } : {};
	// task states: [txt, chk, art]
	const done = [k >= 5, k >= 6, k >= 4];
	const n = done.filter(Boolean).length;
	const chk = k === 3 || k === 4 ? t.needsCopy : k === 5 ? t.doing : "";
	const epic = k >= 2;

	return (
		<div className="shot">
			<div className="rail">
				<div className="tile home">
					<Mark />
				</div>
				{(["launch", "proposal", "hire", "site", "close", "board"] as const).map((id, i) => (
					<div key={id} className={i === 0 ? "tile cur" : "tile"} style={{ background: r[id].bg }}>
						{r[id].i}
						{id === "launch" || id === "site" ? <span className="w spin">✻</span> : null}
						{id === "proposal" ? <span className="b">2</span> : id === "board" ? <span className="b">1</span> : null}
					</div>
				))}
				<div className="tile add">+</div>
			</div>
			<div className="side">
				<h4>{t.epics}</h4>
				<div className="ep">
					<span className="ri" style={{ background: r.launch.bg }}>
						{r.launch.i}
					</span>
					<span className="nm">{r.launch.name}</span>
					<small>{t.room}</small>
				</div>
				<div>
					{epic ? (
						<div key={cycle} className={`ep cur new ${k === 6 ? "fin" : "busy"}`}>
							<span className="ri" style={{ background: "#4d7c0f" }}>
								{t.epic.i}
							</span>
							<span className="nm">{t.epic.name}</span>
							<small>{n === 3 ? t.fin : `${n}/3`}</small>
						</div>
					) : null}
				</div>
				<div className="ep">
					<span className="ri" style={{ background: t.campaign.bg }}>
						{t.campaign.i}
					</span>
					<span className="nm">{t.campaign.name}</span>
					<small>1/3</small>
				</div>
				<h4>{t.people}</h4>
				{(Object.keys(PEOPLE) as Who[]).map((w) => (
					<div key={w} className="who2">
						<span className="av" style={{ background: PEOPLE[w][1] }}>
							{w}
						</span>
						{PEOPLE[w][0]}
						<small>
							{busy[w] ? (
								<>
									<Spin /> {busy[w]}
								</>
							) : null}
						</small>
					</div>
				))}
			</div>
			<div className="chat">
				<div className="top">
					<b>{epic ? t.epic.name : r.launch.name}</b>
					<div className="pills">
						{k === 3 || k === 4 ? (
							<span key="w" className="pill wait">
								{t.waiting}
							</span>
						) : k === 5 ? (
							<span key="b" className="pill busy">
								<Spin /> {t.busy}
							</span>
						) : k === 6 ? (
							<span key="o" className="pill ok">
								{t.ok}
							</span>
						) : null}
					</div>
				</div>
				<div className="feed">
					{feed.map(({ m, i }) => (
						<div key={`${cycle}:${i}`} className={m.agent ? `m agent ${m.done ? "done" : ""}` : "m"}>
							<span className={m.agent ? "av ag" : "av"} style={m.agent ? undefined : { background: PEOPLE[m.who][1] }}>
								{m.agent ? (
									<>
										✻<sup style={{ background: PEOPLE[m.who][1] }}>{m.who}</sup>
									</>
								) : (
									m.who
								)}
							</span>
							<div>
								<div className="nm2">{m.agent ? t.agentName(m.who) : PEOPLE[m.who][0]}</div>
								<div className="tx">{m.body}</div>
							</div>
						</div>
					))}
				</div>
				<div className="comp">{t.message}</div>
			</div>
			<div className="doc" key={`${cycle}:${epic}`}>
				<h4>{epic ? t.epicDoc[0] : t.roomDoc[0]}</h4>
				<div className="dt">{epic ? t.epic.name : r.launch.name}</div>
				<p>{epic ? t.epicDoc[1] : t.roomDoc[1]}</p>
				{epic ? (
					<>
						<div className={n === 3 ? "prog full" : "prog"}>
							<i style={{ width: `${(100 * n) / 3}%` }} />
						</div>
						<div>
							{t.tasks.map((title, i) => (
								<div key={title} className={done[i] ? "task done" : "task"}>
									<span className="bx" />
									<span className="tt">{title}</span>
									{i === 1 && chk ? <span className={chk === t.needsCopy ? "st w" : "st "}>{chk}</span> : null}
									<span className="ow">{["Marina", "Diego", "Paula"][i]}</span>
								</div>
							))}
						</div>
						<div>
							{k >= 5 ? (
								<div className="dec">
									<b>{t.decision[0]}</b> · {t.decision[1]}
								</div>
							) : null}
						</div>
					</>
				) : null}
			</div>
		</div>
	);
}

/* ---------- persona tabs: one small room per audience ---------- */

type MkLine = {
	kind?: "agent" | "vibe";
	done?: boolean;
	av: string;
	bg: string;
	name: string;
	body: ReactNode;
	choices?: [string, string];
	dec?: [string, string];
};
type Mk = { ri: string; bg: string; title: string; lines: MkLine[] };

export type PersonaMock = "clients" | "teams" | "founders";
const G = "#1d5fc4";
const PERSONA: Record<Lang, Record<PersonaMock, Mk>> = {
	pt: {
		clients: {
			ri: "LA",
			bg: "#be185d",
			title: "Loja Aurora",
			lines: [
				{ av: "A", bg: "#be185d", name: "Ana · cliente", body: "Dá pra colocar Pix no checkout até sexta?" },
				{ kind: "agent", av: "G", bg: G, name: "Claude do Gui", body: <>Dá. Abri o épico <b>Pix no checkout</b> com 3 tarefas. Fora do escopo de agora: o cupom. Aprova?</>, choices: ["✓ Aprovo", "Quero o cupom junto"], dec: ["Decisão", "Ana aprovou o Pix até sexta"] },
				{ kind: "agent", done: true, av: "G", bg: G, name: "Claude do Gui", body: "Pix no ar. PR #128, com preview pra você testar." },
			],
		},
		teams: {
			ri: "SC",
			bg: "#0e7490",
			title: "Squad Checkout",
			lines: [
				{ kind: "agent", av: "D", bg: "#0e7490", name: "Claude do Diego", body: <>Peguei <b>retry no webhook</b>. <span className="at">@Marina</span>, preciso da chave do sandbox: tá no 1Password?</> },
				{ kind: "vibe", av: "✦", bg: "", name: "@vibe", body: <><b>Cache do frete</b> está em fazendo há 2 dias. <span className="at">@Bruno</span>, segue?</> },
				{ kind: "agent", done: true, av: "M", bg: "#7c3aed", name: "Claude da Marina", body: "Fechei o handover: o sandbox está no 1Password, e o teste de carga passou. Épico concluído." },
			],
		},
		founders: {
			ri: "FO",
			bg: "#15803d",
			title: "Fechamento de outubro",
			lines: [
				{ av: "G", bg: G, name: "Gui", body: "⏰ Lembrete: todo dia 1, fechar o mês." },
				{ kind: "agent", av: "G", bg: G, name: "Claude do Gui", body: <>Puxei o resultado: margem de <b>27%</b>, 3 pontos abaixo da meta. A conta está no doc. <span className="at">@Carla</span>, levo pro conselho assim?</> },
				{ av: "C", bg: "#15803d", name: "Carla · CFO", body: "Leva. E corta 10% em ferramentas.", dec: ["Decisão", "corte de 10% em ferramentas"] },
			],
		},
	},
	en: {
		clients: {
			ri: "AS",
			bg: "#be185d",
			title: "Aurora Store",
			lines: [
				{ av: "A", bg: "#be185d", name: "Ana · client", body: "Can we add Pix to the checkout by Friday?" },
				{ kind: "agent", av: "G", bg: G, name: "Gui's Claude", body: <>Yes. Opened the epic <b>Pix at checkout</b> with 3 tasks. Out of scope for now: the coupon. Approve?</>, choices: ["✓ Approve", "I want the coupon too"], dec: ["Decision", "Ana approved Pix by Friday"] },
				{ kind: "agent", done: true, av: "G", bg: G, name: "Gui's Claude", body: "Pix is live. PR #128, with a preview for you to try." },
			],
		},
		teams: {
			ri: "CS",
			bg: "#0e7490",
			title: "Checkout squad",
			lines: [
				{ kind: "agent", av: "D", bg: "#0e7490", name: "Diego's Claude", body: <>Took <b>webhook retry</b>. <span className="at">@Marina</span>, I need the sandbox key: is it in 1Password?</> },
				{ kind: "vibe", av: "✦", bg: "", name: "@vibe", body: <><b>Shipping cache</b> has been in doing for 2 days. <span className="at">@Bruno</span>, still on it?</> },
				{ kind: "agent", done: true, av: "M", bg: "#7c3aed", name: "Marina's Claude", body: "Handover done: the sandbox key is in 1Password and the load test passed. Epic closed." },
			],
		},
		founders: {
			ri: "OC",
			bg: "#15803d",
			title: "October close",
			lines: [
				{ av: "G", bg: G, name: "Gui", body: "⏰ Reminder: on the 1st of every month, close the month." },
				{ kind: "agent", av: "G", bg: G, name: "Gui's Claude", body: <>Pulled the numbers: <b>27%</b> margin, 3 points under target. The math is in the doc. <span className="at">@Carla</span>, shall I take it to the board like this?</> },
				{ av: "C", bg: "#15803d", name: "Carla · CFO", body: "Take it. And cut tools spend by 10%.", dec: ["Decision", "cut tools spend by 10%"] },
			],
		},
	},
};

export function PersonaRoom({ lang, mock }: { lang: Lang; mock: PersonaMock }) {
	const m = PERSONA[lang][mock] ?? PERSONA[lang].clients;
	return (
		<div className="mk" aria-hidden="true">
			<div className="mk-top">
				<span className="mk-ri" style={{ background: m.bg }}>
					{m.ri}
				</span>
				<b>{m.title}</b>
			</div>
			<div className="mk-feed">
				{m.lines.map((l, i) => (
					<div key={i} className={["mk-m", l.kind, l.done && "done"].filter(Boolean).join(" ")}>
						{l.kind === "agent" ? (
							<span className="av ag">
								✻<sup style={{ background: l.bg }}>{l.av}</sup>
							</span>
						) : l.kind === "vibe" ? (
							<span className="av vibe">✦</span>
						) : (
							<span className="av" style={{ background: l.bg }}>
								{l.av}
							</span>
						)}
						<div>
							<div className="mk-n">{l.name}</div>
							<div className="mk-x">{l.body}</div>
							{l.choices ? (
								<div className="mk-ch">
									<span className="on">{l.choices[0]}</span>
									<span>{l.choices[1]}</span>
								</div>
							) : null}
							{l.dec ? (
								<div className="mk-dec">
									<b>{l.dec[0]}</b> · {l.dec[1]}
								</div>
							) : null}
						</div>
					</div>
				))}
			</div>
			<div className="mk-comp">{HERO[lang].message}</div>
		</div>
	);
}

/* ---------- the rows' visuals ---------- */

export type Visual = "crew" | "waits" | "doc" | "herdr" | "agents";

const CREW = {
	pt: [
		["M", "#7c3aed", "Marina", "produto", "escrevendo o doc"],
		["D", "#0e7490", "Diego", "engenharia", "no checkout"],
		["P", "#be185d", "Paula", "design", "✓ entregou a arte", 1],
		["R", "#15803d", "Rafael", "comercial", "sem Claude, tudo bem", 1],
	],
	en: [
		["M", "#7c3aed", "Marina", "product", "writing the doc"],
		["D", "#0e7490", "Diego", "engineering", "on checkout"],
		["P", "#be185d", "Paula", "design", "✓ shipped the art", 1],
		["R", "#15803d", "Rafael", "sales", "no Claude, that's fine", 1],
	],
} as const;

const WAITS = {
	pt: {
		title: "Esperando você",
		items: [
			["launch", "Diego passou o cupom de desconto pra você", "Lançamento Aurora · ontem, 18:42"],
			["proposal", "Marina pediu seu OK no desconto de 12%", "Proposta Aurora · há 2 h"],
			["hire", "Revisar os 3 candidatos finalistas", "Contratar SDR · tarefa em revisão"],
		],
	},
	en: {
		title: "Waiting on you",
		items: [
			["launch", "Diego handed you the discount coupon", "Aurora launch · yesterday, 6:42 pm"],
			["proposal", "Marina asked for your OK on the 12% discount", "Aurora proposal · 2 h ago"],
			["hire", "Review the 3 final candidates", "Hire an SDR · task in review"],
		],
	},
} as const;

const PAPER = {
	pt: {
		flag: "⚠ sem critério de sucesso",
		title: "Página da Aurora",
		by: "doc do épico · editado por Marina e pelo Claude do Diego",
		h: ["Objetivo", "Sucesso", "Decisões"],
		goal: "Página de lançamento no ar sexta, para quem chega pela campanha de novembro.",
		success: "200 cadastros na primeira semana.",
		decisions: ["Hero com o texto da Marina", "Cupom só na primeira semana"],
		read: ["✻ lido pelo Claude da Marina", "✻ lido pelo Claude do Diego"],
	},
	en: {
		flag: "⚠ no success criterion",
		title: "Aurora page",
		by: "epic doc · edited by Marina and Diego's Claude",
		h: ["Goal", "Success", "Decisions"],
		goal: "Launch page live on Friday, for people coming from the November campaign.",
		success: "200 sign-ups in the first week.",
		decisions: ["Hero with Marina's copy", "Coupon only in the first week"],
		read: ["✻ read by Marina's Claude", "✻ read by Diego's Claude"],
	},
};

const HERDR = {
	pt: { listening: "● ouvindo “Lançamento Aurora”", ai: "A Paula pediu o horário de corte no checkout. Faço e te mostro o diff antes de subir?", go: "faz" },
	en: { listening: "● listening to “Aurora launch”", ai: "Paula asked for the checkout cutoff time. Shall I do it and show you the diff before shipping?", go: "go" },
};

const AGENTS = {
	pt: { title: "Seus agents nesta sala", local: "Claude Code no seu computador", on: "ligado · ouvindo", cloud: "Na nuvem", run: "rodando · US$0,13/h", cost: "US$0,42", add: "+ Criar sandbox" },
	en: { title: "Your agents in this room", local: "Claude Code on your computer", on: "on · listening", cloud: "In the cloud", run: "running · US$0.13/h", cost: "US$0.42", add: "+ Create sandbox" },
};

/** @vibe flags a gap in the doc, someone fills it. */
function Paper({ lang }: { lang: Lang }) {
	const t = PAPER[lang];
	const [filled, setFilled] = useState(false);
	useEffect(() => {
		let alive = true;
		(async () => {
			while (alive) {
				setFilled(false);
				await sleep(reduced() ? 0 : 3000);
				setFilled(true);
				if (reduced()) return;
				await sleep(5000);
			}
		})();
		return () => {
			alive = false;
		};
	}, []);
	return (
		<div className="paper">
			<span className={filled ? "flag gone" : "flag"}>{t.flag}</span>
			<h3>{t.title}</h3>
			<div className="by">{t.by}</div>
			<h6>{t.h[0]}</h6>
			<p>{t.goal}</p>
			<h6>{t.h[1]}</h6>
			<p className={filled ? "new" : undefined}>{filled ? t.success : "…"}</p>
			<h6>{t.h[2]}</h6>
			<ul>
				{t.decisions.map((d) => (
					<li key={d}>{d}</li>
				))}
			</ul>
			<div className="rd">
				{t.read.map((d) => (
					<span key={d}>{d}</span>
				))}
			</div>
		</div>
	);
}

/** The visual column of a row, wrapper classes included (the static page's `.vis …`). */
export function RowVisual({ lang, visual }: { lang: Lang; visual: Visual }) {
	const r = ROOMS[lang];
	switch (visual) {
		case "crew":
			return (
				<div className="vis crew rv">
					{CREW[lang].map(([av, bg, name, role, status, idle]) => (
						<div key={av} className="mate">
							<span className="av" style={{ background: bg }}>
								{av}
							</span>
							<div>
								<b>{name}</b>
								<span>{role}</span>
							</div>
							{idle ? (
								<span className="cl idle">{status}</span>
							) : (
								<span className="cl">
									<Spin /> {status}
								</span>
							)}
						</div>
					))}
				</div>
			);
		case "waits":
			return (
				<div className="vis card rv">
					<h5>{WAITS[lang].title}</h5>
					{WAITS[lang].items.map(([room, what, where]) => (
						<div key={room} className="wl">
							<span className="ri" style={{ background: r[room].bg }}>
								{r[room].i}
							</span>
							<div>
								<b>{what}</b>
								<span>{where}</span>
							</div>
							<span className="ck">✓</span>
						</div>
					))}
				</div>
			);
		case "doc":
			return (
				<div className="vis rv">
					<Paper lang={lang} />
				</div>
			);
		case "herdr": {
			const tabs = (["launch", "proposal", "hire", "close"] as const).map((id) => ({ ...r[id], off: id === "close" }));
			const t = HERDR[lang];
			return (
				<div className="vis rv" aria-hidden="true">
					<div className="hx">
						<div className="vrail">
							<span className="t home">
								<Mark />
							</span>
							{tabs.map((x) => (
								<span key={x.i} className={x.off ? "t off" : "t "} style={{ background: x.bg }}>
									{x.i}
									{x.off ? null : <b>✻</b>}
								</span>
							))}
						</div>
						<div className="lines">
							{tabs.map((x, i) => (
								<i key={x.i} className={x.off ? "off" : ""} style={{ top: 83 + 52 * i, animationDelay: `${(0.5 * i).toFixed(1)}s` }} />
							))}
						</div>
						<div className="win" style={{ marginTop: 23 }}>
							<div className="bar">
								<i />
								<i />
								<i />
								<span>herdr</span>
							</div>
							<div className="body">
								<div className="tabs">
									{tabs.map((x, i) => (
										<div key={x.i} className={`tab ${i === 0 ? "cur" : ""} ${x.off ? "off" : ""}`}>
											<span className="d" style={{ background: x.bg }} />
											<span>{x.name}</span>
											{x.off ? null : <em>✻</em>}
										</div>
									))}
								</div>
								<div className="pane">
									<div className="cwd">~/Projects/aurora</div>
									<div className="me">/vibebook:listen</div>
									<div className="ok">{t.listening}</div>
									<div className="ai">{t.ai}</div>
									<div className="me">{t.go}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
		case "agents": {
			const t = AGENTS[lang];
			return (
				<div className="vis rv" aria-hidden="true">
					<div className="agm2">
						<h4>{t.title}</h4>
						<div className="c">
							<span className="ic">✻</span>
							<div>
								<b>{t.local}</b>
								<small>{t.on}</small>
							</div>
							<span className="sw" />
						</div>
						<h4>{t.cloud}</h4>
						<div className="c">
							<span className="ic">☁</span>
							<div>
								<b>deploy</b>
								<small>{t.run}</small>
							</div>
							<span className="money">{t.cost}</span>
						</div>
						<div className="new">{t.add}</div>
					</div>
				</div>
			);
		}
		default:
			return null;
	}
}

/* ---------- rooms grid ---------- */

const GRID = {
	pt: [
		["launch", "var(--green)", "o", "2 Claudes trabalhando"],
		["proposal", "", "y", "⏳ esperando você"],
		["hire", "var(--sun)", "", "3 finalistas no doc"],
		["close", "", "g", "✓ tudo em dia"],
		["site", "var(--green)", "o", "Claude trabalhando"],
		["board", "", "y", "⏳ Paula espera você"],
	],
	en: [
		["launch", "var(--green)", "o", "2 Claudes working"],
		["proposal", "", "y", "⏳ waiting on you"],
		["hire", "var(--sun)", "", "3 finalists in the doc"],
		["close", "", "g", "✓ all caught up"],
		["site", "var(--green)", "o", "Claude working"],
		["board", "", "y", "⏳ Paula is waiting on you"],
	],
} as const;

export function RoomsGrid({ lang }: { lang: Lang }) {
	const r = ROOMS[lang];
	return (
		<div className="rooms rv">
			{GRID[lang].map(([id, dot, tone, status]) => (
				<div key={id} className="rt">
					<span className="ri" style={{ background: r[id].bg }}>
						{r[id].i}
						{dot ? <i className="dot" style={{ background: dot }} /> : null}
					</span>
					<div>
						<b>{r[id].name}</b>
						<small className={tone || undefined}>
							{tone === "o" ? (
								<>
									<Spin /> {status}
								</>
							) : (
								status
							)}
						</small>
					</div>
				</div>
			))}
		</div>
	);
}

/* ---------- PWA: an iOS home screen behind, the vibebook app in front ---------- */

const IOS = {
	pt: ["Notas", "Mensagens", "Agenda", "", "E-mail", "Música", "Câmera", "Podcasts", "Mapas", "Livros", "Clima", "Ajustes"],
	en: ["Notes", "Messages", "Calendar", "", "E-mail", "Music", "Camera", "Podcasts", "Maps", "Books", "Weather", "Settings"],
};
const IOS_BG = [
	"#ffd43b,#fab005",
	"#69db7c,#2f9e44",
	"#f8f9fa,#ced4da",
	"",
	"#4dabf7,#1971c2",
	"#ff8787,#e03131",
	"#495057,#212529",
	"#b197fc,#7048e8",
	"#63e6be,#0ca678",
	"#ffa94d,#e8590c",
	"#74c0fc,#1c7ed6",
	"#dee2e6,#868e96",
];

export function PhoneStage({ lang }: { lang: Lang }) {
	return (
		<div className="stage rv" aria-hidden="true">
			<div className="tilt">
				<div className="ios">
					<div className="sb">
						<span>9:41</span>
						<span>●●● ▮</span>
					</div>
					<div className="grid">
						{IOS[lang].map((name, i) =>
							IOS_BG[i] ? (
								<div key={i} className="ic">
									<i style={{ background: `linear-gradient(${IOS_BG[i]})` }} />
									{name}
								</div>
							) : (
								<div key={i} className="ic me">
									<img src="/apple-touch-icon.png" alt="" />
									vibebook
								</div>
							),
						)}
					</div>
				</div>
				<div className="phone">
					<img src={`/img/pwa-home-${lang}.webp`} alt="" width={720} height={1502} loading="lazy" />
				</div>
			</div>
		</div>
	);
}
