<script setup lang="ts">
import { computed, watch, onUnmounted } from "vue";
import type { AtomDrawerProps, AtomDrawerEmits } from "./types";
import "./AtomDrawer.scss";

defineOptions({ name: "AtomDrawer" });

const props = withDefaults(defineProps<AtomDrawerProps>(), {
  modelValue: false,
  placement: "right",
  size: "md",
  closeable: true,
  mask: true,
  maskClosable: true,
  destroyOnClose: false,
});

const emit = defineEmits<AtomDrawerEmits>();

const panelClass = computed(() => [
  "atom-drawer__panel",
  `atom-drawer__panel--${props.placement}`,
  `atom-drawer__panel--${props.size}`,
]);

const transitionName = computed(() => `atom-drawer-${props.placement}`);

function close() {
  emit("update:modelValue", false);
  emit("close");
}

function onMaskClick() {
  if (props.maskClosable) close();
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape" && props.modelValue) close();
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
      emit("afterClose");
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
    <Transition name="atom-drawer-backdrop">
      <div
        v-if="modelValue && mask"
        class="atom-drawer__backdrop"
        @click="onMaskClick"
      />
    </Transition>

    <!-- Panel -->
    <Transition :name="transitionName" @after-enter="emit('afterOpen')" @after-leave="emit('afterClose')">
      <div v-if="modelValue || !destroyOnClose" v-show="modelValue" :class="panelClass" role="dialog" :aria-modal="true">
        <!-- Header -->
        <div v-if="title || $slots.header || closeable" class="atom-drawer__header">
          <div class="atom-drawer__title">
            <slot name="header">{{ title }}</slot>
          </div>
          <button v-if="closeable" type="button" class="atom-drawer__close" aria-label="Yopish" @click="close">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- Body -->
        <div class="atom-drawer__body">
          <slot />
        </div>

        <!-- Footer -->
        <div v-if="$slots.footer" class="atom-drawer__footer">
          <slot name="footer" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
