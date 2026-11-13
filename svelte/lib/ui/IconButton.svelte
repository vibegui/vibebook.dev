<script lang="ts">
  import Button from "./Button.svelte";
  import Icon from "./Icon.svelte";
  import type { ButtonProps } from "./button";
  import type { IconName } from "./icons";
  let {
    label,
    icon,
    variant = "ghost",
    ref = $bindable(null),
    ...rest
  }: Omit<ButtonProps, "children" | "size" | "aria-label"> & {
    label: string;
    icon: IconName;
  } = $props();
</script>

<Button
  {...rest}
  {variant}
  bind:ref
  size="icon"
  aria-label={label}
  title={label}><Icon name={icon} /></Button
>
