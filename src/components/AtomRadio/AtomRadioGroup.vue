<script setup lang="ts">
import { provide } from "vue";
import type { AtomRadioGroupProps, AtomRadioGroupEmits } from "./types";
import AtomRadio from "./AtomRadio.vue";

defineOptions({ name: "AtomRadioGroup" });

const props = withDefaults(defineProps<AtomRadioGroupProps>(), {
  options: () => [],
  size: "md",
  disabled: false,
  vertical: false,
  buttonStyle: false,
});

const emit = defineEmits<AtomRadioGroupEmits>();

provide("atomRadioGroup", {
  get modelValue() { return props.modelValue as string | number; },
  get disabled() { return props.disabled; },
  get size() { return props.size; },
  update(val: string | number) {
    emit("update:modelValue", val);
    emit("change", val);
  },
});
</script>

<template>
  <div
    :class="[
      'atom-radio-group',
      vertical && 'atom-radio-group--vertical',
      buttonStyle && 'atom-radio-group--button',
    ]"
    role="radiogroup"
  >
    <slot>
      <AtomRadio
        v-for="opt in options"
        :key="opt.value"
        :value="opt.value"
        :label="opt.label"
        :disabled="opt.disabled"
      />
    </slot>
  </div>
</template>
