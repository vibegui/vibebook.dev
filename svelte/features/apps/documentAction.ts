/** Recheck the same document after asynchronous proof, then start the protected
 * action in that uninterrupted continuation. Already dispatched writes are not
 * rolled back by a later navigation or local cancellation. */
export type AppDocumentCapability = { active(): boolean; attest(): Promise<boolean> };
export async function appDocumentAction<T>(current: () => boolean, document: () => AppDocumentCapability | null, action: () => Promise<T>): Promise<{ok:true;value:T}|{ok:false}> {
  const captured = document();
  if (!current() || !captured?.active()) return {ok:false};
  if (!(await captured.attest()) || !current() || document() !== captured || !captured.active()) return {ok:false};
  return {ok:true,value:await action()};
}
