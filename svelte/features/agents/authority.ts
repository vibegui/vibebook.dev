import { AgentsFailure, type AgentsApi } from "./api";
/** Global session rejection invalidates identity-free metadata. Both sides of recovery bind fresh Me proof to this actor's captured account. */
export async function agentIdentityRead<T>(
  api: AgentsApi,
  account: string,
  signal: AbortSignal,
  identityRequired: boolean,
  read: () => Promise<T>,
): Promise<T> {
  const prove = async () => {
    if (
      signal.aborted ||
      (await api.identity(signal)) !== account ||
      signal.aborted
    )
      throw new AgentsFailure("identity-unconfirmed");
  };
  if (identityRequired) await prove();
  const result = await read();
  if (identityRequired) await prove();
  return result;
}
