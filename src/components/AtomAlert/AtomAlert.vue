<script setup lang="ts">
import { computed, ref } from "vue";
import type { AtomAlertProps, AtomAlertEmits } from "./types";
import "./AtomAlert.scss";

defineOptions({ name: "AtomAlert" });

const props = withDefaults(defineProps<AtomAlertProps>(), {
  variant: "info",
  closeable: false,
  showIcon: true,
});

const emit = defineEmits<AtomAlertEmits>();
const visible = ref(true);

const classes = computed(() => ["atom-alert", `atom-alert--${props.variant}`]);

// SVG icons per variant
const icons: Record<string, string> = {
  info: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" stroke-width="1.5"/><path d="M9 8v4M9 6h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  success: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" stroke-width="1.5"/><path d="M6 9l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  warning: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 7v3M9 12h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  danger: `<svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" stroke-width="1.5"/><path d="M11.5 6.5l-5 5M6.5 6.5l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
};

function close() {
  visible.value = false;
  emit("close");
}
</script>

<template>
  <Transition name="atom-alert-fade">
    <div v-if="visible" :class="classes" role="alert">
      <span v-if="showIcon" class="atom-alert__icon">
        <slot name="icon">
          <!-- eslint-disable-next-line vue/no-v-html -->
          <span v-html="icons[variant]" />
        </slot>
      </span>

      <div class="atom-alert__body">
        <div v-if="title || $slots.title" class="atom-alert__title">
          <slot name="title">{{ title }}</slot>
        </div>
        <div v-if="$slots.default" class="atom-alert__content">
          <slot />
        </div>
      </div>

      <button
        v-if="closeable"
        type="button"
        class="atom-alert__close"
        aria-label="Close"
        @click="close"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </Transition>
</template>

<style>
.atom-alert-fade-enter-active,
.atom-alert-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.atom-alert-fade-enter-from,
.atom-alert-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
