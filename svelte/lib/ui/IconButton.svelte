<script lang="ts">
  import Button from "./Button.svelte";
  import Icon from "./Icon.svelte";
  import type { ButtonProps } from "./button";
  import type { IconName } from "./icons";
  let {
    label,
    icon,
    variant = "ghost",
    ...rest
  }: Omit<ButtonProps, "children" | "size" | "aria-label"> & {
    label: string;
    icon: IconName;
  } = $props();
</script>

<Button {...rest} {variant} size="icon" aria-label={label} title={label}
  ><Icon name={icon} /></Button
>
