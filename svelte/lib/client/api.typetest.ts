// Compile-time contract tests (M2): checked by svelte-check, never run or bundled. Each @ts-expect-error must stay an
// error; if a server change makes it compile, the contract moved and this file fails the check.
import type { InferRequestType, InferResponseType } from "hono/client";
import type { Client } from "./api";

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
const ok = {} as PostOk;
const id: number = ok.id;
const thread: string = ok.thread;
// @ts-expect-error a field the server doesn't send
void ok.messageId;
const bad = {} as PostBad;
const err: string = bad.error;
void [id, thread, err];

type UploadOk = InferResponseType<
  (typeof api.api.books)[":id"]["files"]["$post"],
  200
>;
const f = {} as UploadOk;
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
const key: string | null = ({} as Key).key;
type Sent = InferResponseType<typeof api.api.push.test.$post, 200>;
const sent: number = ({} as Sent).sent;
void [key, sent];
