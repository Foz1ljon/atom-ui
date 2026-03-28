<script setup lang="ts">
import { computed, ref, useSlots, useAttrs } from "vue";
import type {
  AtomButtonProps,
  AtomButtonVariant,
  AtomButtonSize,
  AtomButtonRounded,
  AtomButtonEmits,
} from "./types";
import "./AtomButton.css";

const props = withDefaults(defineProps<AtomButtonProps>(), {
  variant: "primary",
  size: "md",
  rounded: "md",
  block: false,
  disabled: false,
  loading: false,
  htmlType: "button",
  ripple: true,
});

const emit = defineEmits<AtomButtonEmits>();
const slots = useSlots();
const attrs = useAttrs();

const rippleHostRef = ref<HTMLElement | null>(null);

const isClient = typeof window !== "undefined" && typeof document !== "undefined";

const classes = computed(() => [
  "atom-btn",
  `atom-btn--${props.variant as AtomButtonVariant}`,
  `atom-btn--${props.size as AtomButtonSize}`,
  `atom-btn--rounded-${props.rounded as AtomButtonRounded}`,
  props.block && "atom-btn--block",
  (props.disabled || props.loading) && "atom-btn--disabled",
]);

function createRipple(button: HTMLButtonElement) {
  if (!isClient || !props.ripple) return;

  const rippleHost = rippleHostRef.value;
  if (!rippleHost) return;

  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 1.8;

  const ripple = document.createElement("span");
  ripple.className = "atom-btn__ripple";

  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${rect.width / 2 - size / 2}px`;
  ripple.style.top = `${rect.height / 2 - size / 2}px`;

  rippleHost.appendChild(ripple);

  ripple.addEventListener("animationend", () => {
    ripple.remove();
  });
}

function handleClick(event: MouseEvent) {
  if (props.disabled || props.loading) {
    event.preventDefault();
    return;
  }

  const button = event.currentTarget as HTMLButtonElement | null;
  if (button) createRipple(button);

  emit("click", event);
}
</script>

<template>
  <button
    v-bind="attrs"
    :type="htmlType"
    :class="classes"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span ref="rippleHostRef" class="atom-btn__ripple-host" />

    <span class="atom-btn__inner">
      <span v-if="loading" class="atom-btn__loader">
        <slot name="loader">
          <span class="atom-btn__spinner" />
        </slot>
      </span>

      <span v-if="slots.iconLeft && !loading" class="atom-btn__icon atom-btn__icon--left">
        <slot name="iconLeft" />
      </span>

      <span class="atom-btn__label">
        <slot />
      </span>

      <span v-if="slots.iconRight && !loading" class="atom-btn__icon atom-btn__icon--right">
        <slot name="iconRight" />
      </span>
    </span>
  </button>
</template>
