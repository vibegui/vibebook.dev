import { tv, type VariantProps } from "tailwind-variants";
import type { HTMLButtonAttributes } from "svelte/elements";
import { cn } from "./utils";

const buttonRecipe = tv(
  {
    base: "tw:inline-flex tw:shrink-0 tw:items-center tw:justify-center tw:gap-2 tw:whitespace-nowrap tw:rounded-button tw:border tw:border-transparent tw:font-sans tw:text-sm tw:font-medium tw:leading-5 tw:tracking-normal tw:outline-none tw:transition-colors tw:focus-visible:ring-2 tw:focus-visible:ring-ring tw:focus-visible:ring-offset-2 tw:focus-visible:ring-offset-background tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/30 tw:motion-reduce:transition-none tw:[&_svg]:shrink-0",
    variants: {
      variant: {
        primary:
          "tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary-hover",
        secondary:
          "tw:bg-secondary tw:text-secondary-foreground tw:hover:bg-secondary-hover",
        outline:
          "tw:border-input tw:bg-card tw:text-card-foreground tw:hover:bg-accent",
        ghost: "tw:bg-transparent tw:text-foreground tw:hover:bg-accent",
        destructive:
          "tw:border-destructive tw:bg-card tw:text-card-foreground tw:hover:bg-destructive/10",
        link: "tw:bg-transparent tw:text-link tw:underline-offset-4 tw:hover:underline",
      },
      size: {
        sm: "tw:h-8 tw:px-3 tw:py-1.5",
        md: "tw:h-9 tw:px-4 tw:py-2",
        lg: "tw:h-11 tw:px-5 tw:py-3",
        icon: "tw:size-9 tw:p-2",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
  { twMerge: false },
);

type ButtonVariants = VariantProps<typeof buttonRecipe>;
export const buttonVariants = (options: ButtonVariants = {}) =>
  cn(buttonRecipe(options));

export type ButtonProps = Omit<HTMLButtonAttributes, "style" | "class"> &
  ButtonVariants & {
    class?: string;
    loading?: boolean;
    ref?: HTMLButtonElement | null;
  };
