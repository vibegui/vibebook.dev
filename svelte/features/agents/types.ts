import type { ChatBridge } from "../../chatTypes";
import type { AgentAccountSession } from "./account";
export type AgentFormatting = Pick<ChatBridge, "t" | "ago">;
export type AgentSettingsProps = {
  owner: AgentAccountSession;
  origin: string;
  vb: AgentFormatting;
  lang?: "pt" | "en";
};
