<script setup lang="ts">
import { computed, inject } from "vue";
import type { AtomRadioProps, AtomRadioEmits } from "./types";
import "./AtomRadio.scss";

defineOptions({ name: "AtomRadio" });

const props = withDefaults(defineProps<AtomRadioProps>(), {
  size: "md",
  disabled: false,
});

const emit = defineEmits<AtomRadioEmits>();

const groupCtx = inject<{
  modelValue: string | number;
  disabled: boolean;
  size: string;
  update: (val: string | number) => void;
} | null>("atomRadioGroup", null);

const isChecked = computed(() => {
  if (groupCtx) return groupCtx.modelValue === props.value;
  return props.modelValue === props.value;
});

const isDisabled = computed(
  () => props.disabled || (groupCtx?.disabled ?? false)
);

const currentSize = computed(() => props.size || groupCtx?.size || "md");

function select() {
  if (isDisabled.value || isChecked.value) return;
  const val = props.value as string | number;
  if (groupCtx) {
    groupCtx.update(val);
    return;
  }
  emit("update:modelValue", val);
  emit("change", val);
}
</script>

<template>
  <span
    :class="[
      'atom-radio',
      `atom-radio--${currentSize}`,
      isChecked && 'atom-radio--checked',
      isDisabled && 'atom-radio--disabled',
    ]"
    role="radio"
    :aria-checked="isChecked"
    :aria-disabled="isDisabled"
    tabindex="0"
    @click="select"
    @keydown.space.prevent="select"
  >
    <span class="atom-radio__dot" />
    <span v-if="label || $slots.default" class="atom-radio__label">
      <slot>{{ label }}</slot>
    </span>
  </span>
</template>
