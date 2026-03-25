<script setup lang="ts">
import { computed } from "vue";
import { AtomCheckBoxProps } from "./types";

const props = withDefaults(defineProps<AtomCheckBoxProps>(), {
  modelValue: false,
  disabled: false,
});

const emit = defineEmits(["update:modelValue", "change"]);

const model = computed({
  get: () => props.modelValue,
  set: (val: boolean) => {
    emit("update:modelValue", val);
    emit("change", val);
  },
});
</script>

<template>
  <label
    class="inline-flex items-start gap-3 cursor-pointer select-none py-1.5 px-2 rounded-lg transition-all duration-300"
    :class="{ 'opacity-50 cursor-not-allowed': disabled }"
  >
    <div class="relative shrink-0 mt-0.5">
      <input type="checkbox" v-model="model" :disabled="disabled" class="peer sr-only" />

      <div
        class="w-5 h-5 border-2 rounded-md border-gray-300 bg-white transition-all duration-300 ease-in-out peer-checked:border-blue-600 peer-checked:bg-blue-600"
      ></div>

      <svg
        class="absolute inset-0 m-auto w-3.5 h-3.5 text-white transition-all duration-300 transform scale-0 opacity-0 peer-checked:scale-100 peer-checked:opacity-100 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>

    <div class="flex-1 min-w-0 leading-tight">
      <span v-if="label" class="text-sm font-medium text-gray-700 transition-colors duration-300">
        {{ label }}
      </span>

      <div v-if="$slots.default" class="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
        <slot />
      </div>
    </div>
  </label>
</template>
