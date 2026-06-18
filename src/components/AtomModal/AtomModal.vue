<script setup lang="ts">
import { computed, watch, onUnmounted } from "vue";
import type { AtomModalProps, AtomModalEmits } from "./types";
import "./AtomModal.scss";

defineOptions({ name: "AtomModal" });

const props = withDefaults(defineProps<AtomModalProps>(), {
  modelValue: false,
  size: "md",
  closeable: true,
  mask: true,
  maskClosable: true,
  closeOnEsc: true,
  destroyOnClose: false,
  centered: true,
});

const emit = defineEmits<AtomModalEmits>();

const wrapperClass = computed(() => [
  "atom-modal__wrapper",
  props.centered && "atom-modal__wrapper--centered",
]);

const panelClass = computed(() => [
  "atom-modal__panel",
  `atom-modal__panel--${props.size}`,
]);

function close() {
  emit("update:modelValue", false);
  emit("close");
}

function onMaskClick() {
  if (props.maskClosable) close();
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && props.closeOnEsc && props.modelValue) close();
}

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      document.addEventListener("keydown", onKeydown);
      document.body.style.overflow = "hidden";
      emit("open");
    } else {
      document.removeEventListener("keydown", onKeydown);
      document.body.style.overflow = "";
    }
  },
);

onUnmounted(() => {
  document.removeEventListener("keydown", onKeydown);
  document.body.style.overflow = "";
});
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="atom-modal-backdrop">
      <div
        v-if="modelValue && mask"
        class="atom-modal__backdrop"
        @click="onMaskClick"
      />
    </Transition>

    <!-- Wrapper + panel -->
    <Transition name="atom-modal-zoom" @after-enter="emit('afterOpen')" @after-leave="emit('afterClose')">
      <div
        v-if="modelValue || !destroyOnClose"
        v-show="modelValue"
        :class="wrapperClass"
        @click.self="onMaskClick"
      >
        <div :class="panelClass" role="dialog" :aria-modal="true">
          <!-- Header -->
          <div v-if="title || $slots.header || closeable" class="atom-modal__header">
            <div class="atom-modal__title">
              <slot name="header">{{ title }}</slot>
            </div>
            <button v-if="closeable" type="button" class="atom-modal__close" aria-label="Yopish" @click="close">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="atom-modal__body">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="atom-modal__footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
