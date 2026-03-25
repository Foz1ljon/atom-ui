<template>
  <Teleport to="body">
    <transition name="modal-fade">
      <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- BACKDROP -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="handleBackdrop" />

        <!-- MODAL -->
        <transition name="modal-scale">
          <div v-if="modelValue" :class="modalClasses" @click.stop>
            <!-- HEADER -->
            <div v-if="$slots.header || title" class="mb-4">
              <slot name="header">
                <h3 class="text-lg font-semibold">{{ title }}</h3>
              </slot>
            </div>

            <!-- BODY -->
            <div class="mb-4">
              <slot />
            </div>

            <!-- FOOTER -->
            <div v-if="$slots.footer" class="mt-4">
              <slot name="footer" />
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from "vue";
import type { BaseModalProps, BaseModalEmits } from "./types";

const props = withDefaults(defineProps<BaseModalProps>(), {
  size: "md",
  closeOnBackdrop: true,
  closeOnEsc: true,
});

const emit = defineEmits<BaseModalEmits>();

const modalClasses = computed(() => {
  const base = "relative bg-white rounded-2xl shadow-xl w-full p-6 z-10";

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-2xl",
  };

  return `${base} ${sizes[props.size!]}`;
});

const close = () => {
  emit("update:modelValue", false);
  emit("close");
};

const handleBackdrop = () => {
  if (props.closeOnBackdrop) close();
};

const handleEsc = (e: KeyboardEvent) => {
  if (e.key === "Escape" && props.closeOnEsc) {
    close();
  }
};

onMounted(() => {
  document.addEventListener("keydown", handleEsc);
});

onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleEsc);
});
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-scale-enter-active {
  transition: all 0.25s ease;
}
.modal-scale-leave-active {
  transition: all 0.2s ease;
}

.modal-scale-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}
.modal-scale-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(10px);
}
</style>
