<!-- src/components/AtomButton/AtomButton.vue -->
<script setup lang="ts">
import { computed } from "vue";
import { AtomButtonProps } from "./types";

const props = withDefaults(defineProps<AtomButtonProps>(), {
  variant: "primary",
  size: "md",
  disabled: false,
  loading: false,
  block: false,
  htmlType: "button",
});

const variants: Record<string, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 border border-transparent",
  secondary:
    "bg-gray-100 text-gray-800 hover:bg-gray-200 active:bg-gray-300 border border-transparent",
  outline:
    "bg-transparent text-blue-600 hover:bg-blue-50 active:bg-blue-100 border border-blue-600",
  ghost:
    "bg-transparent text-gray-700 hover:bg-gray-100 active:bg-gray-200 border border-transparent",
  danger: "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 border border-transparent",
  warning:
    "bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700 border border-transparent",
  success:
    "bg-green-600 text-white hover:bg-green-700 active:bg-green-800 border border-transparent",
  info: "bg-sky-500 text-white hover:bg-sky-600 active:bg-sky-700 border border-transparent",
};

const sizes: Record<string, string> = {
  xs: "px-2.5 py-1 text-xs gap-1",
  sm: "px-3 py-1.5 text-sm gap-1.5",
  md: "px-4 py-2 text-sm gap-2",
  lg: "px-5 py-2.5 text-base gap-2",
  xl: "px-6 py-3 text-lg gap-2.5",
};

const iconSizes: Record<string, string> = {
  xs: "w-3 h-3",
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
  xl: "w-6 h-6",
};

const baseClass = computed(() => [
  "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
  variants[props.variant],
  sizes[props.size],
  props.block ? "w-full" : "",
  props.disabled || props.loading ? "opacity-50 cursor-not-allowed pointer-events-none" : "",
]);

// router-link, a yoki button
const tag = computed(() => {
  if (props.to) return "router-link";
  if (props.href) return "a";
  return "button";
});

const tagProps = computed(() => {
  if (props.to) return { to: props.to };
  if (props.href) return { href: props.href, target: props.target };
  return { type: props.htmlType, disabled: props.disabled };
});
</script>

<template>
  <component :is="tag" v-bind="tagProps" :class="baseClass">
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      :class="['animate-spin', iconSizes[size]]"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
    </svg>

    <!-- Left icon -->
    <span v-if="$slots['icon-left'] && !loading" :class="iconSizes[size]">
      <slot name="icon-left" />
    </span>

    <!-- Default slot -->
    <span v-if="$slots.default">
      <slot />
    </span>

    <!-- Right icon -->
    <span v-if="$slots['icon-right'] && !loading" :class="iconSizes[size]">
      <slot name="icon-right" />
    </span>
  </component>
</template>
