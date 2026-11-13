import {
  AppBridge,
  type McpUiHostContext,
} from "@modelcontextprotocol/ext-apps/app-bridge";
import {
  CallToolResultSchema,
  ToolSchema,
  ListToolsRequestSchema,
  type Tool,
  type CallToolResult,
} from "@modelcontextprotocol/sdk/types.js";
import { OpaqueAppTransport } from "./transport";
import { safeOpenLink } from "./model";
import { toolError, type AppAsk } from "./tools";
export type NativeAppBridgeOptions = {
  frame: HTMLIFrameElement;
  current(): boolean;
  context(): McpUiHostContext;
  tools: Tool[];
  call(name: string, args: Record<string, unknown>): Promise<CallToolResult>;
  message(text: string): Promise<CallToolResult>;
  ask: AppAsk;
  open(url: string): void;
  first?: Promise<CallToolResult>;
  contextText?: (text: string) => Promise<void>;
  resize?: (height: number) => void;
  embed?: boolean;
  t(text: string, vars?: Record<string, string | number>): string;
};
/** The installed SDK owns negotiation, request schemas and protocol lifecycle. Host policy owns capabilities and scope. */
export function createNativeAppBridge(options: NativeAppBridgeOptions) {
  let active = true,
    initialized = false,
    inflight = 0,
    pendingAsks = 0;
  const current = () =>
    active && options.current() && options.frame.isConnected;
  const ask: AppAsk = async (what, detail) => {
    if (!current() || pendingAsks >= 16) return false;
    pendingAsks++;
    try {
      return (await options.ask(what, detail)) && current();
    } finally {
      pendingAsks--;
    }
  };
  const message = async (text: string) => {
    if (!current()) return toolError("App is no longer active");
    if (inflight >= 16)
      return toolError("This app already has too many pending requests");
    inflight++;
    try {
      const result = await options.message(text.trim().slice(0, 4000));
      return current() ? result : toolError("App is no longer active");
    } finally {
      inflight--;
    }
  };
  const bridge = new AppBridge(
    null,
    { name: "vibebook", version: "1" },
    {
      openLinks: {},
      serverTools: {},
      logging: {},
      message: { text: {} },
      updateModelContext: { text: {}, structuredContent: {} },
    },
    { hostContext: options.context() },
  );
  const transport = new OpaqueAppTransport(options.frame, current, (value) => {
    if ("height" in value) {
      if (Number.isFinite(value.height)) options.resize?.(value.height);
    } else void message(value.text).catch(() => {});
  });
  bridge.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: current() ? options.tools : [],
  }));
  bridge.oncalltool = async (params) => {
    if (!current()) return toolError("App is no longer active");
    if (inflight >= 16)
      return toolError("This app already has too many pending requests");
    inflight++;
    try {
      const result = await options.call(params.name, params.arguments || {});
      return current()
        ? CallToolResultSchema.parse(result)
        : toolError("App is no longer active");
    } finally {
      inflight--;
    }
  };
  bridge.onmessage = async (params) => {
    const text = params.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n");
    if (!text.trim()) return {};
    const result = await message(text);
    return result.isError ? { isError: true } : {};
  };
  bridge.onopenlink = async ({ url }) => {
    const safe = safeOpenLink(url);
    if (!safe || !(await ask(options.t("abrir um link"), safe)))
      return { isError: true };
    options.open(safe);
    return {};
  };
  bridge.onupdatemodelcontext = async (params) => {
    if (!current()) return {};
    const text =
      params.content
        ?.filter((block) => block.type === "text")
        .map((block) => block.text)
        .join("\n") ||
      (params.structuredContent
        ? JSON.stringify(params.structuredContent)
        : "");
    if (text && options.contextText) {
      if (inflight >= 16)
        throw Error("This app already has too many pending requests");
      inflight++;
      try {
        await options.contextText(text.slice(0, 4000));
        if (!current()) return {};
      } finally {
        inflight--;
      }
    }
    return {};
  };
  bridge.onrequestdisplaymode = async () => ({
    mode: options.embed ? "inline" : "fullscreen",
  });
  bridge.onsizechange = ({ height }) => {
    if (current() && typeof height === "number" && Number.isFinite(height))
      options.resize?.(height);
  };
  bridge.oninitialized = () => {
    if (initialized || !current()) return;
    initialized = true;
    if (!options.first) return;
    void (async () => {
      await bridge.sendToolInput({ arguments: {} });
      const result = await options.first;
      if (current()) await bridge.sendToolResult(result);
    })().catch(() => {});
  };
  // Prevent a rejected initial tool operation becoming unhandled before the view initializes.
  void options.first?.catch(() => {});
  const ready = bridge.connect(transport);
  return {
    ready,
    update() {
      if (current()) bridge.setHostContext(options.context());
    },
    dispose() {
      if (!active) return;
      active = false;
      void bridge.close().catch(() => {});
    },
  };
}
export type NativeAppBridge = ReturnType<typeof createNativeAppBridge>;

export const remoteToolResult = (value: unknown) =>
  CallToolResultSchema.parse(value);
export function appToolInfo(raw: unknown, fallback: Tool): Tool {
  const parsed = ToolSchema.safeParse(raw);
  return parsed.success ? parsed.data : fallback;
}
