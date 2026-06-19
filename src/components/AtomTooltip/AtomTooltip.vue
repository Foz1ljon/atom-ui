<script setup lang="ts">
import { ref, nextTick, onBeforeUnmount } from "vue";
import type { AtomTooltipProps, AtomTooltipEmits } from "./types";
import "./AtomTooltip.scss";

defineOptions({ name: "AtomTooltip" });

const props = withDefaults(defineProps<AtomTooltipProps>(), {
  placement: "top",
  trigger: "hover",
  disabled: false,
  delay: 0,
  maxWidth: "260px",
  theme: "dark",
  arrow: true,
});

const emit = defineEmits<AtomTooltipEmits>();

const visible = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const boxRef = ref<HTMLElement | null>(null);
const boxStyle = ref<Record<string, string>>({});
let showTimer: ReturnType<typeof setTimeout> | null = null;
let hideTimer: ReturnType<typeof setTimeout> | null = null;

function clearTimers() {
  if (showTimer) clearTimeout(showTimer);
  if (hideTimer) clearTimeout(hideTimer);
}

function updatePosition() {
  const trigger = triggerRef.value;
  const box = boxRef.value;
  if (!trigger || !box) return;
  const r = trigger.getBoundingClientRect();
  const bw = box.offsetWidth;
  const bh = box.offsetHeight;
  const gap = 8;

  let top = 0;
  let left = 0;

  switch (props.placement) {
    case "top":
      top = r.top - bh - gap;
      left = r.left + r.width / 2 - bw / 2;
      break;
    case "top-start":
      top = r.top - bh - gap;
      left = r.left;
      break;
    case "top-end":
      top = r.top - bh - gap;
      left = r.right - bw;
      break;
    case "bottom":
      top = r.bottom + gap;
      left = r.left + r.width / 2 - bw / 2;
      break;
    case "bottom-start":
      top = r.bottom + gap;
      left = r.left;
      break;
    case "bottom-end":
      top = r.bottom + gap;
      left = r.right - bw;
      break;
    case "left":
    case "left-start":
    case "left-end":
      left = r.left - bw - gap;
      top =
        props.placement === "left-start"
          ? r.top
          : props.placement === "left-end"
            ? r.bottom - bh
            : r.top + r.height / 2 - bh / 2;
      break;
    case "right":
    case "right-start":
    case "right-end":
      left = r.right + gap;
      top =
        props.placement === "right-start"
          ? r.top
          : props.placement === "right-end"
            ? r.bottom - bh
            : r.top + r.height / 2 - bh / 2;
      break;
  }

  boxStyle.value = {
    position: "fixed",
    top: `${Math.round(top)}px`,
    left: `${Math.round(left)}px`,
    maxWidth: props.maxWidth,
  };
}

function onScrollOrResize() {
  if (visible.value) updatePosition();
}

function reveal() {
  visible.value = true;
  emit("show");
  nextTick(updatePosition);
  window.addEventListener("scroll", onScrollOrResize, true);
  window.addEventListener("resize", onScrollOrResize);
}

function show() {
  if (props.disabled) return;
  clearTimers();
  if (props.delay > 0) {
    showTimer = setTimeout(reveal, props.delay);
  } else {
    reveal();
  }
}

function hide() {
  clearTimers();
  hideTimer = setTimeout(() => {
    visible.value = false;
    emit("hide");
    window.removeEventListener("scroll", onScrollOrResize, true);
    window.removeEventListener("resize", onScrollOrResize);
  }, 80);
}

function toggle() {
  if (props.disabled) return;
  if (visible.value) {
    hide();
  } else {
    show();
  }
}

onBeforeUnmount(() => {
  clearTimers();
  window.removeEventListener("scroll", onScrollOrResize, true);
  window.removeEventListener("resize", onScrollOrResize);
});
</script>

<template>
  <span
    ref="triggerRef"
    class="atom-tooltip"
    @mouseenter="trigger === 'hover' && show()"
    @mouseleave="trigger === 'hover' && hide()"
    @focus="trigger === 'focus' && show()"
    @blur="trigger === 'focus' && hide()"
    @click="trigger === 'click' && toggle()"
  >
    <slot />
    <Teleport to="body">
      <Transition name="atom-tooltip">
        <span
          v-if="visible && !disabled"
          ref="boxRef"
          :class="[
            'atom-tooltip__box',
            `atom-tooltip__box--${placement}`,
            `atom-tooltip__box--${theme}`,
            arrow && 'atom-tooltip__box--arrow',
          ]"
          :style="boxStyle"
          role="tooltip"
        >
          <slot name="content">{{ content }}</slot>
        </span>
      </Transition>
    </Teleport>
  </span>
</template>
