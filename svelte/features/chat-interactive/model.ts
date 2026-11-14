import { cardOf, type Card } from "../../../shared/card";
import type { Message, Poll, Room } from "../../../shared/room";
export { choicesOf, answerOf, canAnswer, type Choices } from "./eligibility";
export function cardView(raw: Message["card"], roomId: string): Card | null {
  if (!raw || raw.length > 1_000_000) return null;
  try {
    return cardOf(raw, roomId);
  } catch {
    return null;
  }
}
export { permissionAsk } from "../chat/privacy";
export function pollView(poll: Poll, me: string) {
  const counts = poll.options.map((_, index) => poll.votes[index]?.length || 0),
    sum = counts.reduce((a, b) => a + b, 0),
    max = Math.max(...counts, 0);
  return {
    voters: new Set(poll.votes.flat()).size,
    rows: poll.options.map((label, index) => ({
      label,
      index,
      count: counts[index],
      percent: sum ? Math.round((100 * counts[index]) / sum) : 0,
      mine: !!poll.votes[index]?.includes(me),
      winner: poll.closed && counts[index] > 0 && counts[index] === max,
      voters: (poll.votes[index] || []).slice(0, 4),
    })),
  };
}
export const canClosePoll = (room: Room, poll: Poll) =>
  room.members.includes(room.me) &&
  !poll.closed &&
  (poll.author === room.me || poll.author === "ai");
export function chartView(data: readonly { label: string; value: number }[]) {
  // Normalize before subtraction so opposing finite extremes cannot overflow SVG coordinates.
  const scale = Math.max(...data.map((point) => Math.abs(point.value)), 1),
    values = data.map((point) => point.value / scale),
    min = Math.min(...values, 0),
    max = 1,
    span = max - min || 1;
  return {
    bars: data.map((point) =>
      Math.round((Math.abs(point.value) / scale) * 100),
    ),
    points: values
      .map(
        (value, index) =>
          `${(data.length > 1 ? (index * 300) / (data.length - 1) : 0).toFixed(1)},${(90 - ((value - min) / span) * 90).toFixed(1)}`,
      )
      .join(" "),
  };
}

export const pollIdentity = (poll: Poll) =>
  JSON.stringify([
    poll.id,
    poll.author,
    poll.question,
    poll.options,
    poll.multi,
  ]);
export const CARD_INLINE_BUDGET = 2000;
/** All supported tables/charts remain available in the native dialog; only bounded data surfaces render inline. */
export function inlineCardNodes(card: Card): ReadonlySet<string> {
  let remaining = CARD_INLINE_BUDGET;
  const inline = new Set<string>();
  for (const [id, node] of Object.entries(card.elements)) {
    if (node.type !== "Table" && node.type !== "Chart") continue;
    const cost =
      node.type === "Table"
        ? node.props.rows.reduce((sum, row) => sum + row.length * 2 + 2, 0) +
          node.props.headers.length * 2 +
          4
        : node.props.data.length * 8 + 8;
    if (cost <= remaining) {
      inline.add(id);
      remaining -= cost;
    }
  }
  return inline;
}
