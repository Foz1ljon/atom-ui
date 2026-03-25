<template>
  <div class="w-full">
    <!-- TAB HEADERS -->
    <div class="flex border-b border-gray-200">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :disabled="tab.disabled"
        @click="selectTab(tab)"
        :class="[
          'px-4 py-2 text-sm font-medium transition-colors',
          modelValue === tab.value
            ? 'border-b-2 border-blue-500 text-blue-600'
            : 'text-gray-500 hover:text-gray-700',
          tab.disabled && 'opacity-50 cursor-not-allowed',
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- TAB CONTENT -->
    <div class="mt-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import type { BaseTabsProps, BaseTabsEmits, TabItem } from "./types";

const props = defineProps<BaseTabsProps>();
const emit = defineEmits<BaseTabsEmits>();

const tabs = ref<TabItem[]>([]);

// childlardan register qilish
const registerTab = (tab: TabItem) => {
  tabs.value.push(tab);
};

// select qilish
const selectTab = (tab: TabItem) => {
  if (tab.disabled) return;
  emit("update:modelValue", tab.value);
};

// provide
provide("tabsContext", {
  modelValue: props,
  registerTab,
});
</script>
