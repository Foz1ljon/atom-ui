<script setup lang="ts">
import { computed, inject } from "vue";
import type { AtomCheckboxProps, AtomCheckboxEmits } from "./types";
import "./AtomCheckbox.scss";

defineOptions({ name: "AtomCheckbox" });

const props = withDefaults(defineProps<AtomCheckboxProps>(), {
  size: "md",
  disabled: false,
  indeterminate: false,
});

const emit = defineEmits<AtomCheckboxEmits>();

const groupModel = inject<{
  modelValue: (string | number)[];
  disabled: boolean;
  size: string;
  update: (val: (string | number)[]) => void;
} | null>("atomCheckboxGroup", null);

const isChecked = computed(() => {
  if (groupModel) {
    return groupModel.modelValue.includes(props.value as string | number);
  }
  return props.modelValue === true;
});

const isDisabled = computed(
  () => props.disabled || (groupModel?.disabled ?? false)
);

const currentSize = computed(() => props.size || groupModel?.size || "md");

function toggle() {
  if (isDisabled.value) return;

  if (groupModel) {
    const val = props.value as string | number;
    const arr = [...groupModel.modelValue];
    const idx = arr.indexOf(val);
    if (idx === -1) arr.push(val);
    else arr.splice(idx, 1);
    groupModel.update(arr);
    return;
  }

  const next = !isChecked.value;
  emit("update:modelValue", next);
  emit("change", next);
}
</script>

<template>
  <span
    :class="[
      'atom-checkbox',
      `atom-checkbox--${currentSize}`,
      isChecked && 'atom-checkbox--checked',
      indeterminate && !isChecked && 'atom-checkbox--indeterminate',
      isDisabled && 'atom-checkbox--disabled',
    ]"
    role="checkbox"
    :aria-checked="indeterminate ? 'mixed' : isChecked"
    :aria-disabled="isDisabled"
    tabindex="0"
    @click="toggle"
    @keydown.space.prevent="toggle"
  >
    <span class="atom-checkbox__input" />
    <span v-if="label || $slots.default" class="atom-checkbox__label">
      <slot>{{ label }}</slot>
    </span>
  </span>
</template>
