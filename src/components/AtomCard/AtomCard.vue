<script setup lang="ts">
import { computed } from "vue";
import type { AtomCardProps } from "./types";
import "./AtomCard.scss";

defineOptions({ name: "AtomCard" });

const props = withDefaults(defineProps<AtomCardProps>(), {
  shadow: "sm",
  padding: "md",
  bordered: false,
  hoverable: false,
  radius: "md",
});

const classes = computed(() => [
  "atom-card",
  `atom-card--shadow-${props.shadow}`,
  `atom-card--radius-${props.radius}`,
  props.bordered && "atom-card--bordered",
  props.hoverable && "atom-card--hoverable",
]);

const bodyClass = computed(() => ["atom-card__body", `atom-card__body--padding-${props.padding}`]);
</script>

<template>
  <div :class="classes">
    <div v-if="$slots.header" class="atom-card__header">
      <slot name="header" />
    </div>

    <div :class="bodyClass">
      <slot />
    </div>

    <div v-if="$slots.footer" class="atom-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>
