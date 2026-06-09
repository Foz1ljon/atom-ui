<script setup lang="ts">
import { computed, ref, useSlots } from "vue";
import type { AtomInputProps, AtomInputEmits } from "./types";
import "./AtomInput.scss";

defineOptions({ name: "AtomInput" });

const props = withDefaults(defineProps<AtomInputProps>(), {
  type: "text",
  size: "md",
  disabled: false,
  readonly: false,
  clearable: false,
  showPassword: false,
  error: false,
});

const emit = defineEmits<AtomInputEmits>();
const slots = useSlots();
const inputRef = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);
const passwordVisible = ref(false);

const currentType = computed(() => {
  if (props.type === "password" && props.showPassword) {
    return passwordVisible.value ? "text" : "password";
  }
  return props.type;
});

const currentLength = computed(() => {
  const val = props.modelValue;
  return val != null ? String(val).length : 0;
});

const showClear = computed(
  () => props.clearable && !props.disabled && !props.readonly && currentLength.value > 0,
);

const wrapperClasses = computed(() => [
  "atom-input__wrapper",
  `atom-input__wrapper--${props.size}`,
  props.error && "atom-input__wrapper--error",
  props.disabled && "atom-input__wrapper--disabled",
  (slots.prefix) && "atom-input__wrapper--has-prefix",
  (slots.suffix || showClear.value || (props.type === "password" && props.showPassword) || (props.maxlength && props.showCount)) && "atom-input__wrapper--has-suffix",
]);

function onInput(event: Event) {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
}

function onChange(event: Event) {
  emit("change", (event.target as HTMLInputElement).value);
}

function onFocus(event: FocusEvent) {
  isFocused.value = true;
  emit("focus", event);
}

function onBlur(event: FocusEvent) {
  isFocused.value = false;
  emit("blur", event);
}

function onClear() {
  emit("update:modelValue", "");
  emit("clear");
  inputRef.value?.focus();
}

function onKeydown(event: KeyboardEvent) {
  emit("keydown", event);
}

function onKeyup(event: KeyboardEvent) {
  emit("keyup", event);
}

function focus() {
  inputRef.value?.focus();
}

function blur() {
  inputRef.value?.blur();
}

defineExpose({ focus, blur, inputRef });
</script>

<template>
  <div class="atom-input">
    <label v-if="label" class="atom-input__label">{{ label }}</label>

    <div :class="wrapperClasses">
      <span v-if="$slots.prefix" class="atom-input__prefix">
        <slot name="prefix" />
      </span>

      <input
        ref="inputRef"
        class="atom-input__field"
        :type="currentType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :maxlength="maxlength"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
        @keyup="onKeyup"
      />

      <span class="atom-input__action">
        <span v-if="maxlength && showCount" class="atom-input__count">
          {{ currentLength }}/{{ maxlength }}
        </span>

        <button
          v-if="showClear"
          type="button"
          class="atom-input__action-btn"
          tabindex="-1"
          @click="onClear"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </button>

        <button
          v-if="type === 'password' && showPassword"
          type="button"
          class="atom-input__action-btn"
          tabindex="-1"
          @click="passwordVisible = !passwordVisible"
        >
          <svg v-if="!passwordVisible" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M1 8C1 8 3.5 3 8 3s7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
            <circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.4"/>
          </svg>
          <svg v-else width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M6.5 6.6A2 2 0 0 0 9.4 9.5M4.2 4.3C2.7 5.3 1.7 6.8 1 8c1 2 3.5 5 7 5a7 7 0 0 0 3.8-1.2M6 3.1A7 7 0 0 1 8 3c3.5 0 6 3 7 5-.4.8-1 1.7-1.8 2.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
          </svg>
        </button>

        <span v-if="$slots.suffix" class="atom-input__suffix">
          <slot name="suffix" />
        </span>
      </span>
    </div>

    <span v-if="error && errorMessage" class="atom-input__error">{{ errorMessage }}</span>
    <span v-else-if="hint" class="atom-input__hint">{{ hint }}</span>
  </div>
</template>
