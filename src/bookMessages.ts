// Stored messages stay unknown until projected. Never guess authors or file
// version metadata to make corrupt rows look valid.
import * as z from "zod/mini";
import { AttachmentSchema, MessageSchema, type Attachment, type Message } from "../shared/room";
import { cardOf, type Card } from "../shared/card";
import { record } from "../shared/validation";
import type { StoredIssue } from "./bookStored";
const ignore:StoredIssue=()=>{};
function json(raw:unknown,kind:string,issue:StoredIssue):unknown {
  if(raw==null||raw==="")return null;
  if(typeof raw!=="string"){issue(kind);return null;}
  try{return JSON.parse(raw);}catch{issue(kind);return null;}
}
const Choices=z.looseObject({options:z.array(z.string()),multi:z.optional(z.nullable(z.boolean())),closed:z.optional(z.nullable(z.union([z.boolean(),z.string()]))) });
export function storedChoices(raw:unknown,issue:StoredIssue=ignore){
  const value=json(raw,"choices-json",issue);if(value==null)return null;
  const parsed=Choices.safeParse(value);if(parsed.success)return parsed.data;issue("choices");return null;
}
export function storedCard(raw:unknown,room:string,issue:StoredIssue=ignore):Card|null {
  if(typeof raw==="string"&&raw.length>1_000_000){issue("card-large");return null;}
  const value=json(raw,"card-json",issue);if(value==null)return null;
  try{return cardOf(value,room);}catch{issue("card");return null;}
}
function wire(raw:unknown,valid:unknown):string|null|undefined {
  return raw===undefined?undefined:raw===""?"":typeof raw==="string"&&valid?raw:null;
}
export function storedAttachments(raw:unknown,resolve?:(id:string)=>Attachment|undefined,issue:StoredIssue=ignore):Attachment[]{
  const value=json(raw,"message-files-json",issue);if(value==null)return [];
  if(!Array.isArray(value)){issue("message-files");return [];}
  const values:unknown[]=value;
  return values.flatMap(item=>{
    let parsed=AttachmentSchema.safeParse(item);
    if(!parsed.success&&record(item)&&typeof item.id==="string"){
      const known=resolve?.(item.id), combined:Record<string,unknown>={...known,...item};
      // Only metadata for this exact canonical ID can fill absent old fields.
      for(const key of ["name","type","size","author","ts"] as const) if(combined[key]==null&&known)combined[key]=known[key];
      if(combined.embed===null)delete combined.embed;
      parsed=AttachmentSchema.safeParse(combined);
    }
    if(parsed.success)return [parsed.data];issue("message-file");return [];
  });
}
const Ref=z.pick(AttachmentSchema,{id:true,name:true});
export function storedFileRefs(raw:unknown,issue:StoredIssue=ignore){
  const value=json(raw,"file-refs-json",issue);if(value==null)return [];
  if(!Array.isArray(value)){issue("file-refs");return [];}
  const values:unknown[]=value;
  return values.flatMap(item=>{const parsed=Ref.safeParse(item);if(parsed.success)return [parsed.data];issue("file-ref");return [];});
}
const BaseMessage=z.omit(MessageSchema,{files:true,choices:true,card:true});
export function storedMessageRows(rows:readonly unknown[],room:string,resolve?:(id:string)=>Attachment|undefined,issue:StoredIssue=ignore):Message[]{
  return rows.flatMap(row=>{
    if(!record(row)){issue("message-row");return [];}
    const base=BaseMessage.safeParse({...row,text:row.text??""});
    if(!base.success||!Number.isSafeInteger(base.data.id)||base.data.id<1||Math.abs(base.data.ts)>8.64e15){issue("message-row");return [];}
    const card=storedCard(row.card,room,issue);
    // Native's existing over-budget branch exposes escaped original text.
    // Keep the opaque string without parsing it into agent card logic.
    const cardWire=typeof row.card==="string"&&row.card.length>1_000_000?row.card:wire(row.card,card);
    return [{...base.data,poll:base.data.poll??null,kind:base.data.kind??null,files:storedAttachments(row.files,resolve,issue),choices:wire(row.choices,storedChoices(row.choices,issue)),card:cardWire}];
  });
}
const Quote=z.object({id:z.number(),author:z.string(),text:z.optional(z.nullable(z.string()))});
export function storedQuote(row:unknown,issue:StoredIssue=ignore){
  const parsed=Quote.safeParse(row);
  if(!parsed.success||!Number.isSafeInteger(parsed.data.id)||parsed.data.id<1){issue("quote-row");return null;}
  return {...parsed.data,text:parsed.data.text??"",files:record(row)&&row.files?storedFileRefs(row.files,issue).map(file=>file.name):undefined};
}
export const AccessRequested=z.object({who:z.string().check(z.minLength(1)),name:z.optional(z.nullable(z.string()))});
