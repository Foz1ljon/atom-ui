<template>
  <!-- MOBILE BACKDROP -->
  <div v-if="modelValue" class="fixed inset-0 bg-black/50 z-40 lg:hidden" @click="close" />

  <!-- SIDEBAR -->
  <aside
    :class="[
      'fixed top-0 left-0 h-full bg-white shadow-lg z-50 transition-all duration-300',
      collapsed ? 'w-16' : 'w-64',
      modelValue ? 'translate-x-0' : '-translate-x-full',
      'lg:translate-x-0',
    ]"
  >
    <!-- HEADER -->
    <div class="h-14 flex items-center justify-between px-4 border-b">
      <span v-if="!collapsed" class="font-bold">Atom UI</span>
      <button @click="toggleCollapse">☰</button>
    </div>

    <!-- MENU -->
    <nav class="p-2 space-y-1 overflow-y-auto">
      <BaseSidebarItem v-for="item in items" :key="item.key" :item="item" :collapsed="collapsed" />
    </nav>
  </aside>
</template>

<script setup lang="ts">
import BaseSidebarItem from "./AtomSideBarItem.vue";
import type { BaseSidebarProps } from "./types";

const props = withDefaults(defineProps<BaseSidebarProps>(), {
  collapsed: false,
});

const emit = defineEmits(["update:modelValue", "update:collapsed"]);

const close = () => {
  emit("update:modelValue", false);
};

const toggleCollapse = () => {
  emit("update:collapsed", !props.collapsed);
};
</script>
