<script setup lang="ts">
import { ref, computed, onUnmounted } from "vue";
import type { AtomFileUploadProps, AtomFileUploadEmits } from "./types";
import "./AtomFileUpload.scss";

defineOptions({ name: "AtomFileUpload" });

const props = withDefaults(defineProps<AtomFileUploadProps>(), {
  modelValue: () => [],
  accept: "",
  multiple: false,
  disabled: false,
  maxSize: 0,
  maxCount: 0,
  listType: "text",
  dropText: "Faylni shu yerga tashlang yoki tanlang",
  hint: "",
  showFileList: true,
});

const emit = defineEmits<AtomFileUploadEmits>();

const inputRef = ref<HTMLInputElement | null>(null);
const isDragOver = ref(false);

// Cache object URLs for image previews so we can revoke them later.
const previewUrls = new WeakMap<File, string>();

function previewUrl(file: File): string {
  let url = previewUrls.get(file);
  if (!url) {
    url = URL.createObjectURL(file);
    previewUrls.set(file, url);
  }
  return url;
}

function isImage(file: File): boolean {
  return file.type.startsWith("image/");
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const canAddMore = computed(
  () => props.maxCount === 0 || props.modelValue.length < props.maxCount,
);

function openPicker() {
  if (props.disabled || !canAddMore.value) return;
  inputRef.value?.click();
}

function addFiles(fileList: FileList | File[]) {
  const incoming = Array.from(fileList);
  const accepted: File[] = [];

  for (const file of incoming) {
    if (props.maxSize > 0 && file.size > props.maxSize) {
      emit("exceed-size", file);
      continue;
    }
    accepted.push(file);
  }

  let next = props.multiple ? [...props.modelValue, ...accepted] : accepted.slice(0, 1);

  if (props.maxCount > 0 && next.length > props.maxCount) {
    emit("exceed-count", next);
    next = next.slice(0, props.maxCount);
  }

  emit("update:modelValue", next);
  emit("change", next);
}

function onInputChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files?.length) addFiles(target.files);
  // Reset so selecting the same file again still fires change.
  target.value = "";
}

function onDrop(e: DragEvent) {
  isDragOver.value = false;
  if (props.disabled || !canAddMore.value) return;
  if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
}

function onDragOver() {
  if (props.disabled) return;
  isDragOver.value = true;
}

function removeFile(index: number) {
  if (props.disabled) return;
  const file = props.modelValue[index];
  const url = previewUrls.get(file);
  if (url) {
    URL.revokeObjectURL(url);
    previewUrls.delete(file);
  }
  const next = props.modelValue.filter((_, i) => i !== index);
  emit("update:modelValue", next);
  emit("change", next);
  emit("remove", file, index);
}

onUnmounted(() => {
  props.modelValue.forEach((f) => {
    const url = previewUrls.get(f);
    if (url) URL.revokeObjectURL(url);
  });
});
</script>

<template>
  <div :class="['atom-file-upload', disabled && 'atom-file-upload--disabled']">
    <!-- Drop zone -->
    <div
      :class="[
        'atom-file-upload__zone',
        isDragOver && 'atom-file-upload__zone--dragover',
        !canAddMore && 'atom-file-upload__zone--full',
      ]"
      role="button"
      tabindex="0"
      @click="openPicker"
      @keydown.enter.prevent="openPicker"
      @keydown.space.prevent="openPicker"
      @dragover.prevent="onDragOver"
      @dragenter.prevent="onDragOver"
      @dragleave.prevent="isDragOver = false"
      @drop.prevent="onDrop"
    >
      <span class="atom-file-upload__icon">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 16V4M12 4l-4 4M12 4l4 4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
        </svg>
      </span>
      <span class="atom-file-upload__text">{{ dropText }}</span>
      <span v-if="hint" class="atom-file-upload__hint">{{ hint }}</span>

      <input
        ref="inputRef"
        type="file"
        class="atom-file-upload__input"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled"
        @change="onInputChange"
      />
    </div>

    <!-- File list -->
    <template v-if="showFileList && modelValue.length">
      <!-- Picture grid -->
      <div v-if="listType === 'picture'" class="atom-file-upload__grid">
        <div
          v-for="(file, i) in modelValue"
          :key="`${file.name}-${i}`"
          class="atom-file-upload__thumb"
        >
          <img v-if="isImage(file)" :src="previewUrl(file)" :alt="file.name" />
          <span v-else class="atom-file-upload__thumb-ext">
            {{ file.name.split('.').pop()?.toUpperCase() || 'FILE' }}
          </span>
          <button
            v-if="!disabled"
            type="button"
            class="atom-file-upload__thumb-remove"
            aria-label="O'chirish"
            @click.stop="removeFile(i)"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M9 3L3 9M3 3l6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Text list -->
      <ul v-else class="atom-file-upload__list">
        <li
          v-for="(file, i) in modelValue"
          :key="`${file.name}-${i}`"
          class="atom-file-upload__item"
        >
          <span class="atom-file-upload__item-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M9 1.5H4a1 1 0 00-1 1v11a1 1 0 001 1h8a1 1 0 001-1V5.5L9 1.5z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
              <path d="M9 1.5V5.5h4" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
            </svg>
          </span>
          <span class="atom-file-upload__item-name">{{ file.name }}</span>
          <span class="atom-file-upload__item-size">{{ formatSize(file.size) }}</span>
          <button
            v-if="!disabled"
            type="button"
            class="atom-file-upload__item-remove"
            aria-label="O'chirish"
            @click="removeFile(i)"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10.5 3.5l-7 7M3.5 3.5l7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </button>
        </li>
      </ul>
    </template>
  </div>
</template>
