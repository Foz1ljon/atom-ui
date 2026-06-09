<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
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
let showTimer: ReturnType<typeof setTimeout> | null = null;
let hideTimer: ReturnType<typeof setTimeout> | null = null;

function clearTimers() {
  if (showTimer) clearTimeout(showTimer);
  if (hideTimer) clearTimeout(hideTimer);
}

function show() {
  if (props.disabled) return;
  clearTimers();
  if (props.delay > 0) {
    showTimer = setTimeout(() => {
      visible.value = true;
      emit("show");
    }, props.delay);
  } else {
    visible.value = true;
    emit("show");
  }
}

function hide() {
  clearTimers();
  hideTimer = setTimeout(() => {
    visible.value = false;
    emit("hide");
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

onBeforeUnmount(() => clearTimers());
</script>

<template>
  <span
    class="atom-tooltip"
    @mouseenter="trigger === 'hover' && show()"
    @mouseleave="trigger === 'hover' && hide()"
    @focus="trigger === 'focus' && show()"
    @blur="trigger === 'focus' && hide()"
    @click="trigger === 'click' && toggle()"
  >
    <slot />
    <Transition name="atom-tooltip">
      <span
        v-if="visible && !disabled"
        :class="[
          'atom-tooltip__box',
          `atom-tooltip__box--${placement}`,
          `atom-tooltip__box--${theme}`,
        ]"
        :style="{ maxWidth }"
        role="tooltip"
      >
        <slot name="content">{{ content }}</slot>
      </span>
    </Transition>
  </span>
</template>
