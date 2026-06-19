<script setup lang="ts">
import { computed, watch, onUnmounted, ref } from "vue";
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
  swipeToClose: true,
});

const emit = defineEmits<AtomDrawerEmits>();

const panelRef = ref<HTMLElement | null>(null);
const bodyRef = ref<HTMLElement | null>(null);

const isHorizontal = computed(
  () => props.placement === "left" || props.placement === "right",
);

const panelClass = computed(() => [
  "atom-drawer__panel",
  `atom-drawer__panel--${props.placement}`,
  `atom-drawer__panel--${props.size}`,
  dragging.value && "atom-drawer__panel--dragging",
]);

const transitionName = computed(() => `atom-drawer-${props.placement}`);

// ---- Swipe to close (touch) ----
const dragging = ref(false);
const dragOffset = ref(0); // px moved toward the closing edge (always >= 0)

let startX = 0;
let startY = 0;
let startTime = 0;
let axisLock: "drag" | "scroll" | null = null;

const sign = computed(() =>
  props.placement === "right" || props.placement === "bottom" ? 1 : -1,
);

const panelStyle = computed(() => {
  if (!dragging.value && dragOffset.value === 0) return undefined;
  const axis = isHorizontal.value ? "X" : "Y";
  return {
    transform: `translate${axis}(${sign.value * dragOffset.value}px)`,
  };
});

function closingDelta(dx: number, dy: number): number {
  switch (props.placement) {
    case "right": return dx;
    case "left": return -dx;
    case "bottom": return dy;
    case "top": return -dy;
    default: return 0;
  }
}

// For vertical sheets, only allow swipe-close when the body can't scroll
// further in the closing direction (so we don't hijack content scrolling).
function bodyAtClosingEdge(): boolean {
  const el = bodyRef.value;
  if (!el || el.scrollHeight <= el.clientHeight) return true;
  if (props.placement === "bottom") return el.scrollTop <= 0;
  if (props.placement === "top") return el.scrollTop + el.clientHeight >= el.scrollHeight;
  return true;
}

function onTouchStart(e: TouchEvent) {
  if (!props.swipeToClose || !props.modelValue) return;
  const t = e.touches[0];
  startX = t.clientX;
  startY = t.clientY;
  startTime = Date.now();
  axisLock = null;
  dragOffset.value = 0;
}

function onTouchMove(e: TouchEvent) {
  if (!props.swipeToClose || !props.modelValue) return;
  const t = e.touches[0];
  const dx = t.clientX - startX;
  const dy = t.clientY - startY;

  // Decide once whether this gesture is a close-drag or normal scroll.
  if (axisLock === null) {
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);
    if (absX < 6 && absY < 6) return; // too small to decide yet
    const gestureMatchesAxis = isHorizontal.value ? absX > absY : absY > absX;
    if (gestureMatchesAxis && closingDelta(dx, dy) > 0 && bodyAtClosingEdge()) {
      axisLock = "drag";
      dragging.value = true;
    } else {
      axisLock = "scroll";
    }
  }

  if (axisLock !== "drag") return;
  e.preventDefault(); // stop the body from scrolling while we drag
  dragOffset.value = Math.max(0, closingDelta(dx, dy));
}

function onTouchEnd() {
  if (axisLock !== "drag") {
    axisLock = null;
    return;
  }
  dragging.value = false;
  axisLock = null;

  const panel = panelRef.value;
  const size = panel
    ? isHorizontal.value
      ? panel.offsetWidth
      : panel.offsetHeight
    : 0;
  const elapsed = Date.now() - startTime;
  const velocity = elapsed > 0 ? dragOffset.value / elapsed : 0;

  const shouldClose =
    size > 0 && (dragOffset.value > size * 0.33 || velocity > 0.5);

  if (shouldClose) {
    // Animate the panel the rest of the way out, then close.
    dragOffset.value = size;
    window.setTimeout(() => {
      dragOffset.value = 0;
      close();
    }, 280);
  } else {
    // Snap back into place (base transition handles the easing).
    dragOffset.value = 0;
  }
}

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
      dragOffset.value = 0;
      dragging.value = false;
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
      <div
        v-if="modelValue || !destroyOnClose"
        v-show="modelValue"
        ref="panelRef"
        :class="panelClass"
        :style="panelStyle"
        role="dialog"
        :aria-modal="true"
        @touchstart.passive="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
      >
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
        <div ref="bodyRef" class="atom-drawer__body">
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
