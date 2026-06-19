<script setup lang="ts">
import { ref, computed } from "vue";
import type { AtomVirtualListProps, AtomVirtualListEmits } from "./types";
import "./AtomVirtualList.scss";

defineOptions({ name: "AtomVirtualList" });

const props = withDefaults(defineProps<AtomVirtualListProps>(), {
  height: 320,
  buffer: 4,
  keyField: "",
});

const emit = defineEmits<AtomVirtualListEmits>();

const containerRef = ref<HTMLElement | null>(null);
const scrollTop = ref(0);
const viewportHeight = ref(
  typeof props.height === "number" ? props.height : 0,
);

const totalHeight = computed(() => props.items.length * props.itemHeight);

const containerStyle = computed(() => ({
  height: typeof props.height === "number" ? `${props.height}px` : props.height,
}));

const visibleCount = computed(() =>
  Math.ceil((viewportHeight.value || 0) / props.itemHeight) + props.buffer * 2,
);

const startIndex = computed(() =>
  Math.max(0, Math.floor(scrollTop.value / props.itemHeight) - props.buffer),
);

const endIndex = computed(() =>
  Math.min(props.items.length, startIndex.value + visibleCount.value),
);

const offsetY = computed(() => startIndex.value * props.itemHeight);

const visibleItems = computed(() =>
  props.items.slice(startIndex.value, endIndex.value).map((item, i) => ({
    item,
    index: startIndex.value + i,
  })),
);

function keyFor(item: unknown, index: number): string | number {
  if (props.keyField && item && typeof item === "object") {
    const v = (item as Record<string, unknown>)[props.keyField];
    if (v !== undefined) return v as string | number;
  }
  return index;
}

function onScroll(e: Event) {
  const el = e.target as HTMLElement;
  scrollTop.value = el.scrollTop;
  if (!viewportHeight.value) viewportHeight.value = el.clientHeight;
  emit("scroll", el.scrollTop);
  if (el.scrollTop + el.clientHeight >= el.scrollHeight - 1) {
    emit("reach-bottom");
  }
}

/** Programmatically scroll a given item index into view. */
function scrollToIndex(index: number) {
  const el = containerRef.value;
  if (el) el.scrollTop = index * props.itemHeight;
}

defineExpose({ scrollToIndex });
</script>

<template>
  <div
    ref="containerRef"
    class="atom-virtual-list"
    :style="containerStyle"
    @scroll="onScroll"
  >
    <!-- Phantom spacer establishes the full scroll height -->
    <div class="atom-virtual-list__phantom" :style="{ height: `${totalHeight}px` }" />

    <!-- Rendered window, shifted into place -->
    <div
      class="atom-virtual-list__viewport"
      :style="{ transform: `translateY(${offsetY}px)` }"
    >
      <div
        v-for="{ item, index } in visibleItems"
        :key="keyFor(item, index)"
        class="atom-virtual-list__item"
        :style="{ height: `${itemHeight}px` }"
      >
        <slot :item="item" :index="index" />
      </div>
    </div>
  </div>
</template>
