<script setup lang="ts">
import { ref, computed, watch } from "vue";
import type { AtomNumberInputProps, AtomNumberInputEmits } from "./types";
import "./AtomNumberInput.scss";

defineOptions({ name: "AtomNumberInput" });

const props = withDefaults(defineProps<AtomNumberInputProps>(), {
  modelValue: null,
  step: 1,
  disabled: false,
  readonly: false,
  size: "md",
  placeholder: "",
  controls: true,
  error: false,
});

const emit = defineEmits<AtomNumberInputEmits>();

const allowDecimal = computed(
  () => props.precision === undefined || props.precision > 0,
);
const allowNegative = computed(
  () => props.min === undefined || props.min < 0,
);

function formatValue(n: number): string {
  return props.precision !== undefined ? n.toFixed(props.precision) : String(n);
}

// Local editable string so partial input ("-", "1.") is preserved while typing.
const display = ref(
  props.modelValue === null || props.modelValue === undefined
    ? ""
    : formatValue(props.modelValue),
);

watch(
  () => props.modelValue,
  (val) => {
    const current = parseDisplay(display.value);
    if (val !== current) {
      display.value = val === null || val === undefined ? "" : formatValue(val);
    }
  },
);

function parseDisplay(s: string): number | null {
  if (s === "" || s === "-" || s === "." || s === "-.") return null;
  const n = Number(s);
  return Number.isNaN(n) ? null : n;
}

function sanitize(raw: string): string {
  let s = raw;
  // keep only digits, optional decimal point, optional leading minus
  s = s.replace(allowDecimal.value ? /[^0-9.\-]/g : /[^0-9\-]/g, "");
  // minus: only a single one, only at the start, only if allowed
  const negative = allowNegative.value && s.startsWith("-");
  s = s.replace(/-/g, "");
  // collapse to a single decimal point
  if (allowDecimal.value) {
    const firstDot = s.indexOf(".");
    if (firstDot !== -1) {
      s = s.slice(0, firstDot + 1) + s.slice(firstDot + 1).replace(/\./g, "");
    }
    // cap decimal places to precision
    if (props.precision !== undefined && props.precision > 0 && firstDot !== -1) {
      const [int, dec] = s.split(".");
      s = `${int}.${dec.slice(0, props.precision)}`;
    }
    // a bare leading dot becomes "0." (e.g. "." → "0.", ".5" → "0.5")
    if (s.startsWith(".")) s = "0" + s;
  }
  return (negative ? "-" : "") + s;
}

function clamp(n: number): number {
  let v = n;
  if (props.min !== undefined) v = Math.max(props.min, v);
  if (props.max !== undefined) v = Math.min(props.max, v);
  return v;
}

function commit(n: number | null) {
  if (n === null) {
    display.value = "";
    emit("update:modelValue", null);
    emit("change", null);
    return;
  }
  let v = clamp(n);
  if (props.precision !== undefined) {
    const factor = 10 ** props.precision;
    v = Math.round(v * factor) / factor;
  }
  display.value = formatValue(v);
  emit("update:modelValue", v);
  emit("change", v);
}

function onInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value;
  const clean = sanitize(raw);
  display.value = clean;
  // Live-update the model with the parsed (unclamped) value while typing.
  const parsed = parseDisplay(clean);
  emit("update:modelValue", parsed);
}

function onBlur() {
  commit(parseDisplay(display.value));
  emit("blur");
}

const isDisabled = computed(() => props.disabled || props.readonly);

function stepBy(dir: 1 | -1) {
  if (isDisabled.value) return;
  const base = parseDisplay(display.value) ?? 0;
  commit(base + dir * props.step);
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "ArrowUp") {
    e.preventDefault();
    stepBy(1);
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    stepBy(-1);
  }
}

const decDisabled = computed(() => {
  if (isDisabled.value) return true;
  const v = parseDisplay(display.value);
  return props.min !== undefined && v !== null && v <= props.min;
});
const incDisabled = computed(() => {
  if (isDisabled.value) return true;
  const v = parseDisplay(display.value);
  return props.max !== undefined && v !== null && v >= props.max;
});
</script>

<template>
  <div class="atom-number-input">
    <label v-if="label" class="atom-number-input__label">{{ label }}</label>

    <div
      :class="[
        'atom-number-input__wrapper',
        `atom-number-input__wrapper--${size}`,
        error && 'atom-number-input__wrapper--error',
        disabled && 'atom-number-input__wrapper--disabled',
        controls && 'atom-number-input__wrapper--has-controls',
      ]"
    >
      <button
        v-if="controls"
        type="button"
        class="atom-number-input__btn atom-number-input__btn--dec"
        tabindex="-1"
        aria-label="Kamaytirish"
        :disabled="decDisabled"
        @click="stepBy(-1)"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      </button>

      <span v-if="prefix" class="atom-number-input__affix">{{ prefix }}</span>

      <input
        class="atom-number-input__field"
        type="text"
        inputmode="decimal"
        :value="display"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        @input="onInput"
        @blur="onBlur"
        @focus="emit('focus')"
        @keydown="onKeydown"
      />

      <span v-if="suffix" class="atom-number-input__affix">{{ suffix }}</span>

      <button
        v-if="controls"
        type="button"
        class="atom-number-input__btn atom-number-input__btn--inc"
        tabindex="-1"
        aria-label="Oshirish"
        :disabled="incDisabled"
        @click="stepBy(1)"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 3v8M3 7h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      </button>
    </div>
  </div>
</template>
