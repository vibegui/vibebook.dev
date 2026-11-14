import { getContext, setContext } from "svelte";
import type { RichFileReader } from "./roomFiles";
// The module owns only a public context key. Private state belongs to RoomScope.
const KEY = Symbol("vibebook-room-rich-files");
export const provideRichFileIndex = (index: RichFileReader) =>
  setContext(KEY, index);
export const scopedRichFileIndex = () =>
  getContext<RichFileReader | undefined>(KEY);
