import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  prefix: "tw",
  extend: {
    theme: {
      radius: ["button", "control", "surface"],
      shadow: ["edge", "edge-raised", "soft", "lift"],
    },
  },
});

export function cn(...values: ClassValue[]): string {
  return twMerge(clsx(values));
}
