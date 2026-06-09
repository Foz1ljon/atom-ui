<script setup lang="ts">
import { provide } from "vue";
import type { AtomCheckboxGroupProps, AtomCheckboxGroupEmits } from "./types";

defineOptions({ name: "AtomCheckboxGroup" });

const props = withDefaults(defineProps<AtomCheckboxGroupProps>(), {
  modelValue: () => [],
  disabled: false,
  size: "md",
  vertical: false,
});

const emit = defineEmits<AtomCheckboxGroupEmits>();

provide("atomCheckboxGroup", {
  get modelValue() { return props.modelValue ?? []; },
  get disabled() { return props.disabled; },
  get size() { return props.size; },
  update(val: (string | number)[]) {
    emit("update:modelValue", val);
    emit("change", val);
  },
});
</script>

<template>
  <div
    :class="['atom-checkbox-group', vertical && 'atom-checkbox-group--vertical']"
    role="group"
  >
    <slot />
  </div>
</template>
