<script lang="ts">
  import { buttonVariants, type ButtonProps } from "./button";
  import { cn } from "./utils";
  let {
    children,
    variant,
    size,
    class: className,
    loading = false,
    disabled = false,
    type = "button",
    ref = $bindable(null),
    ...rest
  }: ButtonProps = $props();
</script>

<button
  bind:this={ref}
  {type}
  disabled={disabled || loading}
  aria-busy={loading || undefined}
  class={cn(buttonVariants({ variant, size }), className)}
  {...rest}
>
  {#if loading}<span
      aria-hidden="true"
      class="tw:size-4 tw:animate-spin tw:rounded-full tw:border-2 tw:border-current tw:border-r-transparent tw:motion-reduce:animate-none"
    ></span>{/if}
  {@render children?.()}
</button>
