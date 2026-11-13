// Compatibility entry point: the normalized browser-safe wire contract lives in shared.
export {
  cardOf,
  cardText,
  CARD_TYPES,
  CardSchema,
  CardElementSchema,
} from "../shared/card";
export type { Card, CardEl } from "../shared/card";
