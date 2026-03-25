<script setup lang="ts">
import type { AtomBreadCrumbsProps, AtomBreadCrumbsEmits } from "./types";

const props = withDefaults(defineProps<AtomBreadCrumbsProps>(), {
  separator: "/",
});

const emit = defineEmits<AtomBreadCrumbsEmits>();

const handleClick = (item: any, index: number) => {
  if (item.disabled) return;
  emit("click", item, index);
};
</script>

<template>
  <nav class="flex items-center text-sm text-gray-500">
    <template v-for="(item, index) in props.items" :key="index">
      <!-- ITEM -->
      <div class="flex items-center">
        <router-link
          v-if="item.href && !item.disabled"
          :to="item.href"
          class="hover:text-black transition-colors flex items-center gap-1"
          @click.prevent="handleClick(item, index)"
        >
          <span v-if="item.icon">{{ item.icon }}</span>
          {{ item.label }}
        </router-link>

        <span v-else class="text-gray-400 flex items-center gap-1">
          <span v-if="item.icon">{{ item.icon }}</span>
          {{ item.label }}
        </span>
      </div>

      <!-- SEPARATOR -->
      <span v-if="index < props.items.length - 1" class="mx-2 text-gray-300">
        {{ props.separator }}
      </span>
    </template>
  </nav>
</template>
