<template>
  <div v-show="isActive">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { inject, computed, onMounted } from "vue";
import type { TabItem } from "./types";

interface Props extends TabItem {}

const props = defineProps<Props>();

const context = inject<any>("tabsContext");

if (!context) {
  throw new Error("BaseTab must be used inside BaseTabs");
}

// register qilish
onMounted(() => {
  context.registerTab({
    label: props.label,
    value: props.value,
    disabled: props.disabled,
  });
});

// active state
const isActive = computed(() => {
  return context.modelValue.modelValue === props.value;
});
</script>
