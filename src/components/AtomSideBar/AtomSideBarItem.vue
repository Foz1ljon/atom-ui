<template>
  <div>
    <!-- ITEM -->
    <div
      @click="toggle"
      class="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-100"
    >
      <!-- ICON -->
      <component v-if="item.icon" :is="item.icon" />

      <!-- LABEL -->
      <span v-if="!collapsed" class="text-sm">
        {{ item.label }}
      </span>

      <!-- ARROW -->
      <span v-if="hasChildren && !collapsed" class="ml-auto">
        {{ open ? "▾" : "▸" }}
      </span>
    </div>

    <!-- CHILDREN -->
    <div v-if="hasChildren && open" class="ml-4 mt-1 space-y-1">
      <BaseSidebarItem
        v-for="child in item.children"
        :key="child.key"
        :item="child"
        :collapsed="collapsed"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { SidebarItem } from "./types";

interface Props {
  item: SidebarItem;
  collapsed?: boolean;
}

const props = defineProps<Props>();

const open = ref(false);

const hasChildren = computed(() => {
  return props.item.children && props.item.children.length > 0;
});

const toggle = () => {
  if (hasChildren.value) {
    open.value = !open.value;
  }
};
</script>
