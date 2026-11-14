// Provider boundary and actual OAuth functions with explicit HTTP/D1 doubles.
// No real provider consent, Worker persistence or production credentials.
import { expect, mock, spyOn, test } from "bun:test";
import { Hono } from "hono";
import type { Env } from "../src/index";
import {
  protectedResourceMetadata, authorizationServerMetadata, clientRegistration,
  providerGrant, providerOAuthError,
} from "../src/mcpOAuthResponses";
mock.module("cloudflare:workers", () => ({ DurableObject: class {}, WorkerEntrypoint: class {}, env: {} }));
const { startAuth, finishAuth } = await import("../src/mcpauth");
const { unseal } = await import("../src/sandbox");

const metadata = { authorization_endpoint: "https://provider.example/authorize", token_endpoint: "https://provider.example/token", registration_endpoint: "https://provider.example/register" };
test("valid OAuth metadata/registration/grants preserve optional fields, extensions and supported numeric expiry strings", () => {
  expect(protectedResourceMetadata({ authorization_servers: ["https://provider.example"], scopes_supported: ["read", "write"], extension: { untouched: true } })).toEqual({ authorization_servers: ["https://provider.example"], scopes_supported: ["read", "write"] });
  expect(protectedResourceMetadata({ authorization_servers: null, scopes_supported: null })).toEqual({ authorization_servers: null, scopes_supported: null });
  expect(authorizationServerMetadata({ ...metadata, extension: "allowed" })).toEqual(metadata);
  expect(authorizationServerMetadata({ ...metadata, registration_endpoint: null })?.registration_endpoint).toBeNull();
  expect(clientRegistration({ client_id: "opaque-id", client_secret: null })).toEqual({ client_id: "opaque-id", client_secret: null });
  for(const expiry of [3600,"3600"," 3600 ",0,-1]) expect(providerGrant({ access_token:"access",refresh_token:"refresh",expires_in:expiry })).toEqual({ access_token:"access",refresh_token:"refresh",expires_in:Number(expiry) });
  expect(providerGrant({ access_token:"access",refresh_token:null,expires_in:null })).toEqual({ access_token:"access" });
  expect(providerOAuthError({ error:"invalid_grant", error_description:"private details" })).toBe("invalid_grant");
});
test("malformed provider JSON cannot become URLs, client identifiers, sealed tokens or expiry arithmetic", () => {
  for(const value of [null, [], true, "bad", 7]) {
    expect(protectedResourceMetadata(value)).toBeNull();
    expect(authorizationServerMetadata(value)).toBeNull();
    expect(clientRegistration(value)).toBeNull();
    expect(providerGrant(value)).toBeNull();
  }
  for(const value of [{ authorization_servers:"https://provider.example" }, {authorization_servers:[{}]}, {scopes_supported:["read",7]}]) expect(protectedResourceMetadata(value)).toBeNull();
  for(const value of [{...metadata,authorization_endpoint:{}},{...metadata,token_endpoint:[]},{...metadata,registration_endpoint:3}, { authorization_endpoint: metadata.authorization_endpoint }]) expect(authorizationServerMetadata(value)).toBeNull();
  for(const value of [{client_id:{}},{client_id:7},{client_id:""},{client_id:"id",client_secret:{}}]) expect(clientRegistration(value)).toBeNull();
  for(const value of [{access_token:{}},{access_token:7},{access_token:""},{access_token:"access",refresh_token:{}},{access_token:"access",expires_in:{}},{access_token:"access",expires_in:"Infinity"},{access_token:"access",expires_in:"NaN"},{access_token:"access",expires_in:Infinity}]) expect(providerGrant(value)).toBeNull();
  expect(providerOAuthError({error:{secret:"must not stringify"}})).toBeNull();
});

function fixture(options: { cached?: boolean; stateEmail?: string; expired?: boolean } = {}) {
  const writes: {sql:string;values:unknown[]}[] = [], requests: {url:string;method:string;body:string}[] = [];
  let consumed=0;
  const state = { email: options.stateEmail ?? "member@example.test", book_id:"abcdef",conn_id:"abc123",resource:"https://resource.example/mcp",issuer:"https://provider.example",verifier:"stored-pkce-verifier",back:"/b/abcdef?ui=svelte",expires_at:options.expired?0:Date.now()+60000 };
  const env = {
    SESSION_SECRET:"synthetic-provider-boundary-fixture",
    DB:{prepare:(sql:string)=>({bind:(...values:unknown[])=>({
      first:async()=>{
        if(sql.startsWith("DELETE FROM mcp_oauth_states")){consumed++;return state;}
        if(sql.startsWith("SELECT client_id")) return options.cached ? {client_id:"cached-client",secret_enc:null,secret_iv:null,token_endpoint:metadata.token_endpoint} : null;
        return null;
      },
      run:async()=>{writes.push({sql,values});},
    })})},
  };
  const app = new Hono<{Bindings:Env}>();
  app.get("/start",async c=>c.json({url:await startAuth(c.env,"https://vibebook.test",{email:"member@example.test",book:"abcdef",cid:"abc123",resource:state.resource,back:state.back})}));
  app.get("/finish",async c=>c.json(await finishAuth(c.env,"https://vibebook.test","member@example.test","exact-state","one-time-code")));
  const fetching = (reply:(url:string,method:string)=>unknown) => spyOn(globalThis,"fetch").mockImplementation(Object.assign(async(input:Parameters<typeof fetch>[0],init?:Parameters<typeof fetch>[1])=>{
    const url=String(input),method=init?.method ?? "GET";
    requests.push({url,method,body:typeof init?.body==="string"?init.body:init?.body instanceof URLSearchParams?init.body.toString():""});
    return Response.json(reply(url,method));
  },{preconnect:fetch.preconnect}));
  return {env,writes,requests,consumed:()=>consumed,fetching,request:(path:string)=>app.request(`https://vibebook.test${path}`,undefined,env)};
}
const normalReply = (url:string) => url.includes("oauth-protected-resource") ? {authorization_servers:["https://provider.example"],scopes_supported:["read","write"]} : url.endsWith("/register") ? {client_id:"registered-client"} : metadata;

test("actual startAuth falls back past malformed metadata, then keeps PKCE/fixed redirect/exact native state", async()=>{
  const h=fixture(), fetching=h.fetching((url)=>url.includes("oauth-authorization-server")?{authorization_endpoint:{bad:true}}:normalReply(url));
  try {
    const response=await h.request("/start"); expect(response.status).toBe(200);
    const value:unknown=await response.json();
    if(!value || typeof value!=="object" || !("url" in value) || typeof value.url!=="string") throw Error("Missing authorize URL");
    const target=new URL(value.url), stored=h.writes.find(row=>row.sql.startsWith("INSERT INTO mcp_oauth_states"));
    expect(target.searchParams.get("redirect_uri")).toBe("https://vibebook.test/api/mcp-oauth/callback");
    expect(target.searchParams.get("code_challenge_method")).toBe("S256");
    expect(target.searchParams.get("state")).toEqual(stored?.values[0]);
    expect(target.searchParams.get("state")?.startsWith("svelte.")).toBe(true);
    expect(target.searchParams.get("scope")).toBe("read write");
    expect(h.requests.some(row=>row.url.includes("openid-configuration"))).toBe(true);
  } finally {fetching.mockRestore();}
});
test("malformed DCR identifiers or secrets never create a client or pending authorization state",async()=>{
  for(const registration of [{client_id:{}},{client_id:"client",client_secret:{}}]) {
    const h=fixture(),fetching=h.fetching(url=>url.endsWith("/register")?registration:normalReply(url));
    const logging=spyOn(console,"error").mockImplementation(()=>{});
    try {expect((await h.request("/start")).status).toBe(500);expect(h.writes).toHaveLength(0);} finally {fetching.mockRestore();logging.mockRestore();}
  }
});
test("malformed token responses consume exact state but never seal/persist a grant",async()=>{
  for(const token of [{access_token:{}},{access_token:"valid",refresh_token:{}},{access_token:"valid",expires_in:"Infinity"}]) {
    const h=fixture({cached:true}),fetching=h.fetching(()=>token),logging=spyOn(console,"error").mockImplementation(()=>{});
    try {expect((await h.request("/finish")).status).toBe(500);expect(h.consumed()).toBe(1);expect(h.writes).toHaveLength(0);expect(h.requests).toHaveLength(1);} finally {fetching.mockRestore();logging.mockRestore();}
  }
});
test("valid token grants retain encrypted storage, numeric expiry compatibility and exact code/verifier/resource binding",async()=>{
  const h=fixture({cached:true}),fetching=h.fetching(()=>({access_token:"synthetic-access",refresh_token:"synthetic-refresh",expires_in:"3600"}));
  try {
    const before=Date.now(),response=await h.request("/finish");expect(response.status).toBe(200);expect(h.consumed()).toBe(1);
    const form=new URLSearchParams(h.requests[0]?.body);expect(form.get("code")).toBe("one-time-code");expect(form.get("code_verifier")).toBe("stored-pkce-verifier");expect(form.get("resource")).toBe("https://resource.example/mcp");
    const saved=h.writes.find(row=>row.sql.startsWith("INSERT OR REPLACE INTO mcp_grants"));
    if(!saved)throw Error("Missing validated grant");
    const [,,,access,iv,refresh,refreshIV,expires]=saved.values;
    if(typeof access!=="string"||typeof iv!=="string"||typeof refresh!=="string"||typeof refreshIV!=="string"||typeof expires!=="number")throw Error("Invalid stored grant binding");
    expect(await unseal(h.env,access,iv)).toBe("synthetic-access");expect(await unseal(h.env,refresh,refreshIV)).toBe("synthetic-refresh");expect(expires).toBeGreaterThanOrEqual(before+3600000);expect(expires).toBeLessThanOrEqual(Date.now()+3600000);
  } finally {fetching.mockRestore();}
});
test("wrong-account and expired states still stop before every provider token request",async()=>{
  for(const options of [{stateEmail:"other@example.test"},{expired:true}]) {
    const h=fixture({...options,cached:true}),fetching=h.fetching(()=>({access_token:"must-not-be-read"})),logging=spyOn(console,"error").mockImplementation(()=>{});
    try {expect((await h.request("/finish")).status).toBe(500);expect(h.consumed()).toBe(1);expect(h.requests).toHaveLength(0);expect(h.writes).toHaveLength(0);} finally {fetching.mockRestore();logging.mockRestore();}
  }
});
