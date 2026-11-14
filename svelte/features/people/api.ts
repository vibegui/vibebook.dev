import { client } from "../../lib/client/api";
import { ErrorBody, OkResult } from "../../../shared/schemas";
import type { PeopleAction } from "./model";
export type PeopleRequest = (
  action: PeopleAction,
  email: string,
) => Promise<void>;
/** Request and response shapes come from the validated Worker routes; the server owns authorization. */
export function createPeopleRequest(
  roomId: string,
  fetcher?: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>,
): PeopleRequest {
  const room = client("/", fetcher).api.books[":id"];
  const id = encodeURIComponent(roomId);
  return async (action, email) => {
    const response =
      action === "remove"
        ? await room.members[":email"].$delete({
            param: { id, email: encodeURIComponent(email) },
          })
        : action === "approve" || action === "deny"
          ? await room.requests.$post({
              param: { id },
              json: { email, ok: action === "approve" },
            })
          : await room.members.$post({ param: { id }, json: { email } });
    const value: unknown = await response.json().catch(() => null);
    if (!response.ok) {
      const error = ErrorBody.safeParse(value);
      throw new Error(
        error.success ? error.data.error : `HTTP ${response.status}`,
      );
    }
    if (!OkResult.safeParse(value).success)
      throw new Error("Invalid people response");
  };
}
