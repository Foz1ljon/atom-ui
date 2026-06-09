<script setup lang="ts">
import { computed, ref, nextTick, watch, onMounted } from "vue";
import type { AtomTextareaProps, AtomTextareaEmits } from "./types";
import "./AtomTextarea.scss";

defineOptions({ name: "AtomTextarea" });

const props = withDefaults(defineProps<AtomTextareaProps>(), {
  size: "md",
  disabled: false,
  readonly: false,
  error: false,
  rows: 3,
  showCount: false,
  autosize: false,
  minRows: 2,
  maxRows: 8,
  resize: "vertical",
});

const emit = defineEmits<AtomTextareaEmits>();

const textareaRef = ref<HTMLTextAreaElement | null>(null);

const currentLength = computed(() => (props.modelValue ? String(props.modelValue).length : 0));

const wrapperClasses = computed(() => [
  "atom-textarea__wrapper",
  `atom-textarea__wrapper--${props.size}`,
  props.error && "atom-textarea__wrapper--error",
  props.disabled && "atom-textarea__wrapper--disabled",
]);

const fieldClasses = computed(() => [
  "atom-textarea__field",
  props.autosize ? "atom-textarea__field--autosize" : `atom-textarea__field--resize-${props.resize}`,
]);

function resizeToFit() {
  const el = textareaRef.value;
  if (!el || !props.autosize) return;

  el.style.height = "auto";

  const styles = window.getComputedStyle(el);
  const lineHeight = parseFloat(styles.lineHeight) || 20;
  const paddingTop = parseFloat(styles.paddingTop) || 0;
  const paddingBottom = parseFloat(styles.paddingBottom) || 0;
  const borderTop = parseFloat(styles.borderTopWidth) || 0;
  const borderBottom = parseFloat(styles.borderBottomWidth) || 0;
  const extra = paddingTop + paddingBottom + borderTop + borderBottom;

  const minHeight = props.minRows * lineHeight + extra;
  const maxHeight = props.maxRows * lineHeight + extra;

  const next = Math.min(Math.max(el.scrollHeight, minHeight), maxHeight);
  el.style.height = `${next}px`;
  el.style.overflowY = el.scrollHeight > maxHeight ? "auto" : "hidden";
}

function onInput(event: Event) {
  emit("update:modelValue", (event.target as HTMLTextAreaElement).value);
  if (props.autosize) nextTick(resizeToFit);
}

function onChange(event: Event) {
  emit("change", (event.target as HTMLTextAreaElement).value);
}

function onFocus(event: FocusEvent) {
  emit("focus", event);
}

function onBlur(event: FocusEvent) {
  emit("blur", event);
}

function onKeydown(event: KeyboardEvent) {
  emit("keydown", event);
}

function onKeyup(event: KeyboardEvent) {
  emit("keyup", event);
}

function focus() {
  textareaRef.value?.focus();
}

function blur() {
  textareaRef.value?.blur();
}

watch(
  () => props.modelValue,
  () => {
    if (props.autosize) nextTick(resizeToFit);
  },
);

onMounted(() => {
  if (props.autosize) resizeToFit();
});

defineExpose({ focus, blur, textareaRef });
</script>

<template>
  <div class="atom-textarea">
    <label v-if="label" class="atom-textarea__label">{{ label }}</label>

    <div :class="wrapperClasses">
      <textarea
        ref="textareaRef"
        :class="fieldClasses"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :rows="autosize ? minRows : rows"
        :maxlength="maxlength"
        @input="onInput"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
        @keyup="onKeyup"
      />
    </div>

    <div v-if="(error && errorMessage) || hint || (maxlength && showCount)" class="atom-textarea__footer">
      <span v-if="error && errorMessage" class="atom-textarea__error">{{ errorMessage }}</span>
      <span v-else-if="hint" class="atom-textarea__hint">{{ hint }}</span>
      <span v-if="maxlength && showCount" class="atom-textarea__count">
        {{ currentLength }}/{{ maxlength }}
      </span>
    </div>
  </div>
</template>
