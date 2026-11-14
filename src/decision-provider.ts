import * as z from "zod/mini";
export const PRODUCTION_DECISION_API="https://openrouter.ai/api/alpha/decisions";
const Config=z.object({DEV_EMAIL:z.optional(z.string()),DECISION_API:z.optional(z.string())});
/** Trusted server configuration only. Invalid overrides never fall back to a
 * real provider, and local fixture requests must never carry a real API key. */
export function decisionProvider(input:unknown):{url:string;kind:"production"|"local-fixture"}{
  const parsed=Config.safeParse(input);
  if(!parsed.success)throw Error("Invalid decision provider configuration");
  const {DEV_EMAIL,DECISION_API}=parsed.data;
  if(DECISION_API===undefined)return {url:PRODUCTION_DECISION_API,kind:"production"};
  const port=/^http:\/\/127\.0\.0\.1:([1-9]\d{0,4})\/api\/alpha\/decisions$/.exec(DECISION_API)?.[1];
  if(!DEV_EMAIL?.trim()||!port||Number(port)>65535)throw Error("Invalid decision provider configuration");
  return {url:DECISION_API,kind:"local-fixture"};
}
