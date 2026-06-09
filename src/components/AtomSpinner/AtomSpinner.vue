<script setup lang="ts">
import { computed } from "vue";
import type { AtomSpinnerProps } from "./types";
import "./AtomSpinner.scss";

defineOptions({ name: "AtomSpinner" });

const props = withDefaults(defineProps<AtomSpinnerProps>(), {
  size: "md",
  variant: "primary",
});

const classes = computed(() => [
  "atom-spinner",
  `atom-spinner--${props.size}`,
  `atom-spinner--${props.variant}`,
]);
</script>

<template>
  <span :class="classes" role="status" :aria-label="label ?? 'Loading'">
    <span class="atom-spinner__ring" />
    <span v-if="label" class="atom-spinner__label">{{ label }}</span>
  </span>
</template>
