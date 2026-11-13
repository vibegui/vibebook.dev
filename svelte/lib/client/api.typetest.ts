// Compile-time contract tests (M2): checked by svelte-check, never run or bundled. Each @ts-expect-error must stay an
// error; if a server change makes it compile, the contract moved and this file fails the check.
import type { InferRequestType, InferResponseType } from "hono/client";
import type { Client } from "./api";
import type {
  SandboxesResult,
  SandboxTerminalResult,
  AgentsResult,
  ConnectedResult,
  CreateRoomResult,
  RouteResult,
  SetNameResult,
  StartRoomResult,
  AccessRequestResult,
  AccessResult,
  ArchivedResult,
  ClaudeToggleResult,
  LoginsResult,
  OkResult,
  SearchResult,
  PostMessageResult,
  PushKeyResult,
  PushTestResult,
  UploadFileResult,
} from "../../../shared/schemas";

declare const api: Client;
const post = api.api.books[":id"].post.$post;

// A valid request compiles.
void post({ param: { id: "r" }, json: { text: "hi", thread: "main" } });
// @ts-expect-error text is required
void post({ param: { id: "r" }, json: { thread: "main" } });
// @ts-expect-error text is a string
void post({ param: { id: "r" }, json: { text: 1 } });
// @ts-expect-error the room id is a path param
void post({ json: { text: "hi" } });

type PostOk = InferResponseType<typeof post, 200>;
type PostBad = InferResponseType<typeof post, 400>;
declare const ok: PostOk;
const id: number = ok.id;
const thread: string = ok.thread;
// @ts-expect-error a field the server doesn't send
void ok.messageId;
declare const bad: PostBad;
const err: string = bad.error;
void [id, thread, err];

type UploadOk = InferResponseType<
  (typeof api.api.books)[":id"]["files"]["$post"],
  200
>;
declare const f: UploadOk;
const name: string = f.name,
  size: number = f.size;
// @ts-expect-error uploads answer with the stored file, not a message
void f.thread;
type UploadReq = InferRequestType<
  (typeof api.api.books)[":id"]["files"]["$post"]
>;
const req: UploadReq = {
  param: { id: "r" },
  header: { "content-type": "image/png", "x-filename": "a.png" },
};
void [name, size, req];

// Slice 2: account and room mutations.
const subscribe = api.api.push.subscribe.$post;
const archive = api.api.books[":id"].archive.$post;
void subscribe({ json: { endpoint: "https://push", p256dh: "k", auth: "a" } });
const noAuth = { endpoint: "https://push", p256dh: "k" };
// @ts-expect-error auth is required
void subscribe({ json: noAuth });
void api.api.waits.resolve.$post({ json: { book_id: "b", ref: "m1" } });
void api.api.books[":id"].tint.$post({
  param: { id: "r" },
  json: { tint: "blue" },
});
void archive({ param: { id: "r" }, json: { archived: false } });
const notBool = { archived: "no" };
// @ts-expect-error archived is a boolean
void archive({ param: { id: "r" }, json: notBool });
type Key = InferResponseType<typeof api.api.push.key.$get, 200>;
declare const keyRes: Key;
const key: string | null = keyRes.key;
type Sent = InferResponseType<typeof api.api.push.test.$post, 200>;
declare const sentRes: Sent;
const sent: number = sentRes.sent;
void [key, sent];

// What each handler answers is exactly the schema type the client validates with (ok bodies, by status).
type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2
    ? true
    : false;
const sameAs = <T extends true>(t: T) => t;
sameAs<Equal<InferResponseType<typeof post>, PostMessageResult>>(true);
sameAs<Equal<UploadOk, UploadFileResult>>(true);
sameAs<Equal<Key, PushKeyResult>>(true);
sameAs<Equal<Sent, PushTestResult>>(true);
sameAs<Equal<InferResponseType<typeof archive, 200>, OkResult>>(true);

// Slice 3: account and room lists.
const friends = api.api.friends.$post;
void friends({ json: { email: "a@b.co" } });
const noEmail = {};
// @ts-expect-error email is required
void friends({ json: noEmail });
type Archived = InferResponseType<typeof api.api.archived.$get, 200>;
type Search = InferResponseType<typeof api.api.search.$get, 200>;
type Logins = InferResponseType<typeof api.api.me.logins.$get, 200>;
sameAs<Equal<Archived, ArchivedResult>>(true);
sameAs<Equal<Search, SearchResult>>(true);
sameAs<Equal<Logins, LoginsResult>>(true);
declare const found: Search;
const snippet: string = found.messages[0].snippet;
// @ts-expect-error search hits carry a snippet, not the full text
void found.messages[0].text;
void snippet;
void api.api.search.$get({ query: { q: "hi" } });

// Slice 4: "Ligar Claude" and access requests.
const room4 = api.api.books[":id"];
void room4.claude.$post({ param: { id: "r" }, json: { on: true } });
void room4.requests.$post({
  param: { id: "r" },
  json: { email: "a@b.co", ok: true },
});
const noDecision = { email: "a@b.co" };
// @ts-expect-error approving or denying is required
void room4.requests.$post({ param: { id: "r" }, json: noDecision });
sameAs<
  Equal<InferResponseType<typeof room4.claude.$post, 200>, ClaudeToggleResult>
>(true);
sameAs<
  Equal<InferResponseType<typeof room4.request.$post, 200>, AccessRequestResult>
>(true);
sameAs<Equal<InferResponseType<typeof room4.access.$get, 200>, AccessResult>>(
  true,
);

// Slice 5: your name, new rooms and the home's router.
void api.api.me.$post({ json: { name: "Gui" } });
void api.api.books.$post({ json: { title: "x" } });
void api.api.books.start.$post({ json: { text: "viagem com a Ana" } });
void api.api.route.$post({ json: { text: "onde fica isso?" } });
const notText = { text: 5 };
// @ts-expect-error text is a string
void api.api.route.$post({ json: notText });
sameAs<Equal<InferResponseType<typeof api.api.me.$post, 200>, SetNameResult>>(
  true,
);
sameAs<
  Equal<InferResponseType<typeof api.api.books.$post, 200>, CreateRoomResult>
>(true);
sameAs<
  Equal<
    InferResponseType<typeof api.api.books.start.$post, 200>,
    StartRoomResult
  >
>(true);
sameAs<Equal<InferResponseType<typeof api.api.route.$post, 200>, RouteResult>>(
  true,
);

// Slice 6: freestyle key and Claude token.
void api.api.freestyle.$post({ json: { key: "fs-key" } });
void api.api["claude-token"].$post({ json: { token: "sk-ant-x" } });
// @ts-expect-error key is a string
void api.api.freestyle.$post({ json: { key: 5 } });
sameAs<
  Equal<InferResponseType<typeof api.api.freestyle.$get, 200>, ConnectedResult>
>(true);
sameAs<
  Equal<InferResponseType<typeof api.api.freestyle.$delete, 200>, OkResult>
>(true);

// Slice 7: a room's Claudes and sandboxes.
void api.api.books[":id"].agents.$get({ param: { id: "r" } });
// @ts-expect-error the room id is required
void api.api.books[":id"].agents.$get({ param: {} });
sameAs<
  Equal<
    InferResponseType<(typeof api.api.books)[":id"]["agents"]["$get"], 200>,
    AgentsResult
  >
>(true);

// Slice 8: sandboxes.
void api.api.books[":id"].sandboxes.$post({
  param: { id: "r" },
  json: { name: "box" },
});
const sbxPost = api.api.books[":id"].sandboxes.$post;
const notName = { name: 3 };
// @ts-expect-error name is a string
void sbxPost({ param: { id: "r" }, json: notName });
sameAs<
  Equal<
    InferResponseType<(typeof api.api.books)[":id"]["sandboxes"]["$get"], 200>,
    SandboxesResult
  >
>(true);
sameAs<
  Equal<
    InferResponseType<
      (typeof api.api.sandboxes)[":sid"]["terminal"]["$post"],
      200
    >,
    SandboxTerminalResult
  >
>(true);
void api.api.sandboxes[":sid"].pause.$post({ param: { sid: "s" } });
