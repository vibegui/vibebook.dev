/** Small validated browser boundary; no server transcription or vendor global is assumed. */
export interface SpeechRecognizer {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: unknown) => void) | null;
  onerror: ((event: unknown) => void) | null;
  onend: ((event: unknown) => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}
export type SpeechFactory = () => SpeechRecognizer;
export function browserSpeech(scope: object): SpeechFactory | undefined {
  const constructor: unknown =
    Reflect.get(scope, "SpeechRecognition") ||
    Reflect.get(scope, "webkitSpeechRecognition");
  if (typeof constructor !== "function") return undefined;
  return () => {
    const value: unknown = Reflect.construct(constructor, []);
    if (!recognizer(value)) throw new TypeError("Unsupported speech interface");
    return value;
  };
}
function recognizer(value: unknown): value is SpeechRecognizer {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof Reflect.get(value, "start") === "function" &&
    typeof Reflect.get(value, "stop") === "function" &&
    typeof Reflect.get(value, "abort") === "function" &&
    typeof Reflect.get(value, "lang") === "string" &&
    typeof Reflect.get(value, "continuous") === "boolean" &&
    typeof Reflect.get(value, "interimResults") === "boolean" &&
    ["onresult", "onerror", "onend"].every((key) => {
      const handler: unknown = Reflect.get(value, key);
      return handler === null || typeof handler === "function";
    })
  );
}
function transcript(event: unknown): string | undefined {
  if (
    typeof event !== "object" ||
    !event ||
    !("results" in event) ||
    typeof event.results !== "object" ||
    !event.results
  )
    return;
  const length: unknown = Reflect.get(event.results, "length");
  if (
    typeof length !== "number" ||
    !Number.isInteger(length) ||
    length < 0 ||
    length > 512
  )
    return;
  const out: string[] = [];
  let total = 0;
  for (let index = 0; index < length; index++) {
    const result: unknown = Reflect.get(event.results, String(index));
    if (typeof result !== "object" || !result) return;
    const first: unknown = Reflect.get(result, "0");
    if (typeof first !== "object" || !first) return;
    const said: unknown = Reflect.get(first, "transcript");
    if (typeof said !== "string" || (total += said.length) > 65536) return;
    out.push(said);
  }
  return out.join("").trim();
}
export type SpeechClock = {
  schedule(fn: () => void, ms: number): unknown;
  cancel(handle: unknown): void;
};
const browserClock: SpeechClock = {
  schedule: (fn, ms) => setTimeout(fn, ms),
  cancel: (handle) => clearTimeout(handle as ReturnType<typeof setTimeout>),
};
export type SpeechKey = {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
  isComposing?: boolean;
  repeat?: boolean;
  preventDefault: () => void;
};
export const SPEECH_HOLD_MS = 350;
export function createSpeechController(options: {
  factory?: SpeechFactory;
  locale: string;
  read: () => { text: string; start: number; end: number; revision: number };
  write: (text: string, caret?: number) => void;
  canStart: () => boolean;
  recording: (value: boolean) => void;
  error: (error: string) => void;
  ended: () => void;
  clock?: SpeechClock;
}) {
  const clock = options.clock || browserClock;
  let active = true,
    generation = 0,
    recording: SpeechRecognizer | undefined,
    hold: unknown | undefined,
    pending = false,
    held = false,
    stopping = false;
  function clearHold() {
    if (hold !== undefined) clock.cancel(hold);
    hold = undefined;
  }
  function space() {
    pending = false;
    clearHold();
    if (!active || !options.canStart()) return;
    const draft = options.read();
    options.write(
      draft.text.slice(0, draft.start) + " " + draft.text.slice(draft.end),
      draft.start + 1,
    );
  }
  function cancel() {
    generation++;
    clearHold();
    pending = false;
    held = false;
    stopping = false;
    const current = recording;
    recording = undefined;
    if (current) {
      current.onresult = current.onerror = current.onend = null;
      try {
        current.abort();
      } catch {}
    }
    options.recording(false);
  }
  function start() {
    if (!active || recording || !options.factory || !options.canStart()) return;
    const base = options.read(),
      token = ++generation;
    let current: SpeechRecognizer;
    try {
      current = options.factory();
    } catch {
      options.error("failed");
      return;
    }
    recording = current;
    stopping = false;
    let revision = base.revision;
    const owns = () => active && recording === current && generation === token;
    current.lang = options.locale;
    current.continuous = true;
    current.interimResults = true;
    current.onresult = (event) => {
      if (!owns()) return;
      if (!options.canStart() || options.read().revision !== revision) {
        cancel();
        return;
      }
      const said = transcript(event);
      if (said === undefined) {
        options.error("invalid-result");
        cancel();
        return;
      }
      const text =
        base.text +
        (base.text && said && !/\s$/.test(base.text) ? " " : "") +
        said;
      if (options.read().text !== text) options.write(text, text.length);
      revision = options.read().revision;
    };
    current.onerror = (event) => {
      if (!owns()) return;
      const error =
        typeof event === "object" &&
        event &&
        "error" in event &&
        typeof event.error === "string"
          ? event.error
          : "failed";
      if (error === "not-allowed" || error === "service-not-allowed")
        options.error("not-allowed");
      else if (error !== "aborted" && error !== "no-speech")
        options.error("failed");
      cancel();
    };
    current.onend = () => {
      if (!owns()) return;
      current.onresult = current.onerror = current.onend = null;
      recording = undefined;
      stopping = false;
      options.recording(false);
      if (options.canStart()) options.ended();
    };
    options.error("");
    options.recording(true);
    try {
      current.start();
    } catch {
      if (owns()) {
        current.onresult = current.onerror = current.onend = null;
        recording = undefined;
        try {
          current.abort();
        } catch {}
        options.recording(false);
        options.error("failed");
      }
    }
  }
  function stop() {
    held = false;
    if (!recording || stopping) return;
    stopping = true;
    try {
      recording.stop();
    } catch {
      cancel();
    }
  }
  return {
    supported: !!options.factory,
    start,
    stop,
    cancel,
    keydown(event: SpeechKey) {
      if (!active || !options.factory || !options.canStart()) return false;
      if (event.key !== " ") {
        if (pending) space();
        return false;
      }
      if (event.ctrlKey || event.metaKey || event.altKey || event.isComposing)
        return false;
      event.preventDefault();
      if (event.repeat) return true;
      held = false;
      pending = true;
      clearHold();
      hold = clock.schedule(() => {
        hold = undefined;
        pending = false;
        held = true;
        start();
      }, SPEECH_HOLD_MS);
      return true;
    },
    keyup(event: Pick<SpeechKey, "key">) {
      if (event.key !== " ") return;
      if (held) {
        held = false;
        stop();
      } else if (pending) space();
    },
    dispose() {
      active = false;
      cancel();
    },
  };
}
