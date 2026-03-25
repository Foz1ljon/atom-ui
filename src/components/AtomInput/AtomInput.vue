<!-- src/components/AtomInput/AtomInput.vue -->
<script setup lang="ts">
import { computed, ref } from "vue";
import { AtomInputProps } from "./types";

const props = withDefaults(defineProps<AtomInputProps>(), {
  modelValue: "",
  type: "text",
  required: false,
  disabled: false,
  readonly: false,
  size: "md",
  block: true,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number): void;
  (e: "focus", event: FocusEvent): void;
  (e: "blur", event: FocusEvent): void;
}>();

const slots = defineSlots<{
  "icon-left"?: () => unknown;
  "icon-right"?: () => unknown;
}>();

const isFocused = ref(false);
const showPassword = ref(false);

const inputType = computed(() => {
  if (props.type === "password") {
    return showPassword.value ? "text" : "password";
  }
  return props.type;
});

const sizes = {
  sm: {
    input: "h-8 text-xs px-3",
    label: "text-xs",
    icon: "w-3.5 h-3.5",
    iconPadLeft: "pl-8",
    iconPadRight: "pr-8",
  },
  md: {
    input: "h-10 text-sm px-3",
    label: "text-sm",
    icon: "w-4 h-4",
    iconPadLeft: "pl-9",
    iconPadRight: "pr-9",
  },
  lg: {
    input: "h-12 text-base px-4",
    label: "text-base",
    icon: "w-5 h-5",
    iconPadLeft: "pl-11",
    iconPadRight: "pr-11",
  },
};

const iconPositions = {
  sm: { left: "left-2.5", right: "right-2.5" },
  md: { left: "left-3", right: "right-3" },
  lg: { left: "left-3.5", right: "right-3.5" },
};

const hasLeftIcon = computed(() => !!slots["icon-left"]);
const hasRightIcon = computed(() => !!slots["icon-right"] || props.type === "password");

const inputClass = computed(() => [
  "w-full rounded-lg border bg-white outline-none transition-all duration-200",
  "text-gray-800 placeholder:text-gray-400",
  sizes[props.size].input,
  hasLeftIcon.value ? sizes[props.size].iconPadLeft : "",
  hasRightIcon.value ? sizes[props.size].iconPadRight : "",
  props.error
    ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-100"
    : isFocused.value
      ? "border-blue-500 ring-4 ring-blue-100"
      : "border-gray-300 hover:border-blue-400 hover:ring-4 hover:ring-blue-50",
  props.disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "",
  props.readonly ? "cursor-default bg-gray-50" : "",
]);

const onInput = (e: Event) => {
  const val = (e.target as HTMLInputElement).value;
  emit("update:modelValue", props.type === "number" ? Number(val) : val);
};

const onFocus = (e: FocusEvent) => {
  isFocused.value = true;
  emit("focus", e);
};

const onBlur = (e: FocusEvent) => {
  isFocused.value = false;
  emit("blur", e);
};
</script>

<template>
  <div :class="['flex flex-col gap-1', block ? 'w-full' : 'inline-flex']">
    <!-- Label -->
    <label v-if="label" :class="['font-medium text-gray-700', sizes[size].label]">
      <span v-if="required" class="text-red-500 mr-0.5">*</span>
      {{ label }}
    </label>

    <!-- Input wrapper -->
    <div class="relative flex items-center">
      <!-- Left icon -->
      <span
        v-if="hasLeftIcon"
        :class="[
          'absolute flex items-center justify-center text-gray-400 pointer-events-none',
          iconPositions[size].left,
          sizes[size].icon,
        ]"
      >
        <slot name="icon-left" />
      </span>

      <!-- Input -->
      <input
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :class="inputClass"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
      />

      <!-- Right icon / password toggle -->
      <span
        v-if="hasRightIcon"
        :class="[
          'absolute flex items-center justify-center',
          iconPositions[size].right,
          sizes[size].icon,
          type === 'password'
            ? 'cursor-pointer text-gray-400 hover:text-gray-600'
            : 'text-gray-400 pointer-events-none',
        ]"
        @click="type === 'password' ? (showPassword = !showPassword) : null"
      >
        <!-- Password toggle icon -->
        <template v-if="type === 'password'">
          <!-- Eye open -->
          <svg
            v-if="showPassword"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-full h-full"
          >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <!-- Eye off -->
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="w-full h-full"
          >
            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
            <path
              d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"
            />
            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
            <line x1="2" x2="22" y1="2" y2="22" />
          </svg>
        </template>

        <!-- Custom right icon -->
        <slot v-else name="icon-right" />
      </span>
    </div>

    <!-- Error -->
    <span v-if="error" class="text-xs text-red-500">{{ error }}</span>

    <!-- Hint -->
    <span v-else-if="hint" class="text-xs text-gray-400">{{ hint }}</span>
  </div>
</template>
