<script setup lang="ts">
import { computed, ref, nextTick, onMounted, onUnmounted, watch } from "vue";
import type { AtomSelectProps, AtomSelectEmits, AtomSelectOption } from "./types";
import "./AtomSelect.scss";

defineOptions({ name: "AtomSelect" });

const props = withDefaults(defineProps<AtomSelectProps>(), {
  options: () => [],
  size: "md",
  placeholder: "Tanlang...",
  noDataText: "Ma'lumot topilmadi",
  disabled: false,
  clearable: false,
  searchable: false,
  multiple: false,
  error: false,
});

const emit = defineEmits<AtomSelectEmits>();

const isOpen = ref(false);
const searchQuery = ref("");
const focusedIndex = ref(-1);
const wrapperRef = ref<HTMLElement | null>(null);
const searchRef = ref<HTMLInputElement | null>(null);

const selectedOptions = computed<AtomSelectOption[]>(() => {
  if (props.multiple) {
    const vals = Array.isArray(props.modelValue) ? props.modelValue : [];
    return props.options.filter((o) => vals.includes(o.value));
  }
  const found = props.options.find((o) => o.value === props.modelValue);
  return found ? [found] : [];
});

const displayLabel = computed(() =>
  selectedOptions.value.length ? selectedOptions.value[0].label : "",
);

const hasValue = computed(() =>
  props.multiple
    ? Array.isArray(props.modelValue) && (props.modelValue as (string | number)[]).length > 0
    : props.modelValue !== null && props.modelValue !== undefined && props.modelValue !== "",
);

const filteredOptions = computed(() => {
  if (!props.searchable || !searchQuery.value.trim()) return props.options;
  const q = searchQuery.value.toLowerCase();
  return props.options.filter((o) => o.label.toLowerCase().includes(q));
});

const triggerClasses = computed(() => [
  "atom-select__trigger",
  `atom-select__trigger--${props.size}`,
  isOpen.value && "atom-select__trigger--open",
  props.error && "atom-select__trigger--error",
  props.disabled && "atom-select__trigger--disabled",
]);

function open() {
  if (props.disabled) return;
  isOpen.value = true;
  searchQuery.value = "";
  focusedIndex.value = -1;
  nextTick(() => searchRef.value?.focus());
  emit("focus");
}

function close() {
  isOpen.value = false;
  searchQuery.value = "";
  emit("blur");
}

function toggle() {
  isOpen.value ? close() : open();
}

function selectOption(opt: AtomSelectOption) {
  if (opt.disabled) return;
  if (props.multiple) {
    const vals = Array.isArray(props.modelValue) ? [...(props.modelValue as (string | number)[])] : [];
    const idx = vals.indexOf(opt.value);
    if (idx === -1) vals.push(opt.value);
    else vals.splice(idx, 1);
    emit("update:modelValue", vals);
    emit("change", vals);
  } else {
    emit("update:modelValue", opt.value);
    emit("change", opt.value);
    close();
  }
}

function removeTag(val: string | number, e: Event) {
  e.stopPropagation();
  const vals = Array.isArray(props.modelValue) ? [...(props.modelValue as (string | number)[])] : [];
  const idx = vals.indexOf(val);
  if (idx !== -1) {
    vals.splice(idx, 1);
    emit("update:modelValue", vals);
    emit("change", vals);
  }
}

function clearAll(e: Event) {
  e.stopPropagation();
  emit("update:modelValue", props.multiple ? [] : null);
  emit("clear");
}

function isSelected(opt: AtomSelectOption) {
  if (props.multiple) return Array.isArray(props.modelValue) && (props.modelValue as (string | number)[]).includes(opt.value);
  return props.modelValue === opt.value;
}

function onTriggerKeydown(e: KeyboardEvent) {
  if (["Enter", " ", "ArrowDown"].includes(e.key)) {
    e.preventDefault();
    if (!isOpen.value) open();
  }
}

function onDropdownKeydown(e: KeyboardEvent) {
  const opts = filteredOptions.value;
  if (e.key === "Escape") {
    close();
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    focusedIndex.value = Math.min(focusedIndex.value + 1, opts.length - 1);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    focusedIndex.value = Math.max(focusedIndex.value - 1, 0);
  } else if (e.key === "Enter" && focusedIndex.value >= 0) {
    e.preventDefault();
    selectOption(opts[focusedIndex.value]);
  }
}

watch(filteredOptions, () => { focusedIndex.value = -1; });

function onClickOutside(e: MouseEvent) {
  if (wrapperRef.value && !wrapperRef.value.contains(e.target as Node)) close();
}

onMounted(() => document.addEventListener("mousedown", onClickOutside));
onUnmounted(() => document.removeEventListener("mousedown", onClickOutside));
</script>

<template>
  <div class="atom-select">
    <label v-if="label" class="atom-select__label">{{ label }}</label>

    <div ref="wrapperRef" class="atom-select__wrapper">
      <!-- Trigger -->
      <div
        :class="triggerClasses"
        tabindex="0"
        role="combobox"
        :aria-expanded="isOpen"
        @click="toggle"
        @keydown="onTriggerKeydown"
      >
        <!-- Multiple: tags -->
        <template v-if="multiple">
          <div class="atom-select__tags">
            <span
              v-for="opt in selectedOptions"
              :key="opt.value"
              class="atom-select__tag"
            >
              {{ opt.label }}
              <span class="atom-select__tag-remove" @click="removeTag(opt.value, $event)">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M7.5 2.5L2.5 7.5M2.5 2.5L7.5 7.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                </svg>
              </span>
            </span>
            <span v-if="!selectedOptions.length" class="atom-select__placeholder">{{ placeholder }}</span>
          </div>
        </template>

        <!-- Single -->
        <template v-else>
          <span v-if="hasValue" class="atom-select__display">{{ displayLabel }}</span>
          <span v-else class="atom-select__placeholder">{{ placeholder }}</span>
        </template>

        <span class="atom-select__actions">
          <span v-if="clearable && hasValue" class="atom-select__clear" @click="clearAll($event)">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="atom-select__chevron" :class="isOpen && 'atom-select__chevron--open'">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </span>
      </div>

      <!-- Dropdown -->
      <Transition name="atom-select-drop">
        <div v-if="isOpen" class="atom-select__dropdown" @keydown="onDropdownKeydown">
          <!-- Search -->
          <div v-if="searchable" class="atom-select__search">
            <input
              ref="searchRef"
              v-model="searchQuery"
              placeholder="Qidirish..."
              @click.stop
            />
          </div>

          <!-- Options list -->
          <div class="atom-select__list" role="listbox">
            <template v-if="filteredOptions.length">
              <div
                v-for="(opt, i) in filteredOptions"
                :key="opt.value"
                class="atom-select__option"
                :class="{
                  'atom-select__option--selected': isSelected(opt),
                  'atom-select__option--focused': focusedIndex === i,
                  'atom-select__option--disabled': opt.disabled,
                }"
                role="option"
                :aria-selected="isSelected(opt)"
                @click.stop="selectOption(opt)"
                @mouseenter="focusedIndex = i"
              >
                <span class="atom-select__option-label">{{ opt.label }}</span>
                <span v-if="isSelected(opt)" class="atom-select__option-check">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
              </div>
            </template>
            <div v-else class="atom-select__empty">{{ noDataText }}</div>
          </div>
        </div>
      </Transition>
    </div>

    <span v-if="error && errorMessage" class="atom-select__error">{{ errorMessage }}</span>
    <span v-else-if="hint" class="atom-select__hint">{{ hint }}</span>
  </div>
</template>
