<script setup lang="ts">
import { computed } from "vue";
import type { AtomSkeletonProps } from "./types";
import "./AtomSkeleton.scss";

defineOptions({ name: "AtomSkeleton" });

const props = withDefaults(defineProps<AtomSkeletonProps>(), {
  variant: "rect",
  animated: true,
  lines: 3,
  rounded: false,
});

const itemStyle = computed(() => ({
  width: props.width || "100%",
  height:
    props.variant === "circle"
      ? props.width || "40px"
      : props.height || (props.variant === "text" ? "14px" : "20px"),
}));

const isText = computed(() => props.variant === "text");
const isCircle = computed(() => props.variant === "circle");
</script>

<template>
  <div class="atom-skeleton">
    <template v-if="isText">
      <span
        v-for="i in lines"
        :key="i"
        :class="[
          'atom-skeleton__item',
          'atom-skeleton__item--text',
          animated && 'atom-skeleton__item--animated',
        ]"
        :style="{ width: i === lines && lines > 1 ? '70%' : (width || '100%'), height: height || '14px' }"
      />
    </template>
    <span
      v-else
      :class="[
        'atom-skeleton__item',
        isCircle && 'atom-skeleton__item--circle',
        !isCircle && rounded && 'atom-skeleton__item--rounded',
        animated && 'atom-skeleton__item--animated',
      ]"
      :style="itemStyle"
    />
  </div>
</template>
