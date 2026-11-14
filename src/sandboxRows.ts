import * as z from "zod/mini";
import { SandboxCard, RoomSandbox } from "../shared/schemas";

const ObjectRow = z.record(z.string(), z.unknown());
const Target = z.extend(z.pick(SandboxCard, { id: true, vm_id: true }), {
  id: z.string().check(z.minLength(1)),
  vm_id: z.string().check(z.minLength(1)),
});
const Name = z.pick(SandboxCard, { name: true });
const Created = z.pick(SandboxCard, { created_at: true });
const OptionalId = z.nullable(z.string().check(z.minLength(1)));
const Folder = z.string().check(z.regex(/^[a-z0-9][a-z0-9-]{0,39}$/));
const Money = z.number().check(z.minimum(0));
const RoomTarget = z.extend(z.pick(RoomSandbox, { id: true, email: true }), {
  id: z.string().check(z.minLength(1)),
  email: z.string().check(z.minLength(1)),
});
const metric = (value: unknown) => (value == null ? 0 : Money.parse(value));
const optionalId = (value: unknown) => {
  const parsed = OptionalId.safeParse(value ?? null);
  return parsed.success ? parsed.data : null;
};

/** SQL ownership predicates stay at each call site. This parses only the target
 * required for VM control; display corruption must not make deletion impossible. */
export function sandboxTarget(value: unknown) {
  if (value === null) return null;
  const raw = ObjectRow.parse(value);
  const target = Target.parse(raw);
  const name = Name.safeParse({ name: raw.name ?? null });
  const created = Created.safeParse({ created_at: raw.created_at ?? null });
  const created_at = created.success ? created.data.created_at : null;
  return {
    ...target,
    raw,
    name: name.success ? name.data.name : null,
    created_at,
    book_id: optionalId(raw.book_id),
    ready: raw.ready === 1 || raw.ready === true,
  };
}
export function sandboxIdentity(raw: Record<string, unknown>) {
  // Only an actual historical NULL permits creating a new terminal identity.
  return OptionalId.parse(raw.identity_id);
}
export function sandboxSetup(value: unknown) {
  const target = sandboxTarget(value);
  if (!target) return null;
  const name = Folder.parse(target.name);
  const book_id = z.string().check(z.minLength(1)).parse(target.book_id);
  return { ...target, name, book_id };
}
export function sandboxCleanupName(value: unknown) {
  const name = Folder.safeParse(value);
  return name.success ? name.data : null;
}

/** Public room presence has different required identifiers from VM control.
 * Preserve row order at the caller; never substitute account/room identities. */
export function roomSandbox(value: unknown) {
  const raw = ObjectRow.parse(value);
  const target = RoomTarget.parse(raw);
  let malformed = false;
  const keep = <T>(
    schema: {
      safeParse(
        value: unknown,
      ): { success: true; data: T } | { success: false };
    },
    value: unknown,
  ) => {
    const parsed = schema.safeParse(value ?? null);
    if (parsed.success) return parsed.data;
    malformed = true;
    return null;
  };
  const name = keep(z.nullable(z.string()), raw.name);
  const state = keep(z.nullable(z.string()), raw.state);
  const run_s = keep(z.nullable(Money), raw.run_s);
  const rate = keep(z.nullable(Money), raw.rate);
  const disk_rate = keep(z.nullable(Money), raw.disk_rate);
  const checked_at = keep(z.nullable(z.number()), raw.checked_at);
  const created_at = keep(z.nullable(z.number()), raw.created_at);
  return RoomSandbox.parse({
    ...target,
    name,
    state,
    run_s,
    rate,
    disk_rate,
    checked_at,
    created_at,
    cost_unknown: raw.cost_unknown === true || malformed || created_at === null,
  });
}
export function sandboxMetrics(raw: Record<string, unknown>) {
  let unknown = false;
  const keep = (value: unknown) => {
    try {
      return metric(value);
    } catch {
      unknown = true;
      return 0;
    }
  };
  const run_s = keep(raw.run_s),
    rate = keep(raw.rate),
    disk_rate = keep(raw.disk_rate);
  // Partial finite compatibility values never claim a complete estimate.
  return { run_s, rate, disk_rate, unknown };
}
export function sandboxEstimate(
  metrics: ReturnType<typeof sandboxMetrics>,
  created: number | null,
  now: number,
  providerFailed = false,
) {
  const partial = (metrics.run_s / 3600) * metrics.rate;
  const total =
    partial +
    (created === null
      ? 0
      : (Math.max(0, now - created) / 3600_000) * metrics.disk_rate);
  return {
    cost: Number.isFinite(total) ? total : 0,
    cost_unknown:
      providerFailed ||
      metrics.unknown ||
      created === null ||
      created > now ||
      !Number.isFinite(total),
  };
}
/** Parse dates before arithmetic; zero is a valid timestamp, not a missing date. */
export function runningSeconds(
  vm: { state: string; totalRunSeconds?: number; updatedAt?: string },
  now: number,
) {
  const base = Money.parse(vm.totalRunSeconds ?? 0);
  if (vm.state !== "running" || vm.updatedAt === undefined) return base;
  const at = Date.parse(vm.updatedAt);
  if (!Number.isFinite(at))
    throw new Error("freestyle: invalid VM update timestamp");
  const seconds = base + Math.max(0, now - at) / 1000;
  return Money.parse(seconds);
}
