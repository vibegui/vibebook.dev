import type { ComponentProps } from "svelte";
import Input from "./Input.svelte";
import { buttonVariants } from "./button";

buttonVariants({ variant: "outline", size: "sm" });
// @ts-expect-error variants are the owned semantic choices, not arbitrary colors
buttonVariants({ variant: "blue" });
// @ts-expect-error sizes are constrained
buttonVariants({ size: "huge" });
const valid: ComponentProps<typeof Input> = { type: "email", value: "" };
// @ts-expect-error file inputs require a file-aware component, not string binding
const file: ComponentProps<typeof Input> = { type: "file" };
// @ts-expect-error number inputs require numeric value semantics
const number: ComponentProps<typeof Input> = { type: "number" };
void [valid, file, number];
