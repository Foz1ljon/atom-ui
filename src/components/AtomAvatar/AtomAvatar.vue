<script setup lang="ts">
import { computed, ref } from "vue";
import type { AtomAvatarProps } from "./types";
import "./AtomAvatar.scss";

defineOptions({ name: "AtomAvatar" });

const props = withDefaults(defineProps<AtomAvatarProps>(), {
  size: "md",
  shape: "circle",
});

const imgError = ref(false);

const classes = computed(() => [
  "atom-avatar",
  `atom-avatar--${props.size}`,
  `atom-avatar--${props.shape}`,
]);

const style = computed(() =>
  props.color ? { "--avatar-bg": props.color } : undefined,
);

const displayInitials = computed(() => {
  if (!props.initials) return "";
  return props.initials.slice(0, 2);
});

function onError() {
  imgError.value = true;
}
</script>

<template>
  <div :class="classes" :style="style">
    <slot>
      <img
        v-if="src && !imgError"
        class="atom-avatar__img"
        :src="src"
        :alt="alt ?? initials ?? ''"
        @error="onError"
      />
      <span v-else-if="initials" class="atom-avatar__initials">
        {{ displayInitials }}
      </span>
      <span v-else class="atom-avatar__placeholder">
        <svg width="55%" height="55%" viewBox="0 0 20 20" fill="none">
          <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 18a7 7 0 1 1 14 0H3z" fill="currentColor"/>
        </svg>
      </span>
    </slot>

    <span
      v-if="status"
      class="atom-avatar__status"
      :class="`atom-avatar__status--${status}`"
    />
  </div>
</template>
