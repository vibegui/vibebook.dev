import { expect, test } from "bun:test";
import { buttonVariants } from "../svelte/lib/ui/button";
import { cn } from "../svelte/lib/ui/utils";

test("namespaced variants merge semantic radius, colors and size overrides", () => {
  const classes = cn(
    buttonVariants({ variant: "outline" }),
    "tw:rounded-md tw:h-11 tw:bg-secondary",
  ).split(" ");
  expect(classes).toContain("tw:rounded-md");
  expect(classes).not.toContain("tw:rounded-button");
  expect(classes).toContain("tw:h-11");
  expect(classes).not.toContain("tw:h-9");
  expect(classes).toContain("tw:bg-secondary");
  expect(classes).not.toContain("tw:bg-card");
  expect(classes.every((value) => value.startsWith("tw:"))).toBe(true);
  expect(cn("tw:shadow-edge", "tw:shadow-soft")).toBe("tw:shadow-soft");
});
