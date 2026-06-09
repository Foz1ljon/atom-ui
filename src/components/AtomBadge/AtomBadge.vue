<script setup lang="ts">
import { computed } from "vue";
import type { AtomBadgeProps } from "./types";
import "./AtomBadge.scss";

defineOptions({ name: "AtomBadge" });

const props = withDefaults(defineProps<AtomBadgeProps>(), {
  variant: "primary",
  size: "md",
  dot: false,
  pill: false,
  outline: false,
});

const classes = computed(() => [
  "atom-badge",
  `atom-badge--${props.variant}`,
  `atom-badge--${props.size}`,
  props.pill && "atom-badge--pill",
  props.outline && "atom-badge--outline",
]);
</script>

<template>
  <span :class="classes">
    <span v-if="dot" class="atom-badge__dot" />
    <slot />
  </span>
</template>
