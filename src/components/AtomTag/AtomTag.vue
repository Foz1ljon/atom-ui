<script setup lang="ts">
import { computed } from "vue";
import type { AtomTagProps, AtomTagEmits } from "./types";
import "./AtomTag.scss";

defineOptions({ name: "AtomTag" });

const props = withDefaults(defineProps<AtomTagProps>(), {
  variant: "primary",
  size: "md",
  closeable: false,
  outline: false,
  pill: false,
  disabled: false,
});

const emit = defineEmits<AtomTagEmits>();

const classes = computed(() => [
  "atom-tag",
  `atom-tag--${props.variant}`,
  `atom-tag--${props.size}`,
  props.pill && "atom-tag--pill",
  props.outline && "atom-tag--outline",
  props.disabled && "atom-tag--disabled",
]);

function onClose(event: MouseEvent) {
  if (props.disabled) return;
  event.stopPropagation();
  emit("close");
}
</script>

<template>
  <span :class="classes">
    <slot />
    <button
      v-if="closeable"
      type="button"
      class="atom-tag__close"
      tabindex="-1"
      :disabled="disabled"
      @click="onClose"
    >
      <svg viewBox="0 0 10 10" fill="none">
        <path d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </button>
  </span>
</template>
