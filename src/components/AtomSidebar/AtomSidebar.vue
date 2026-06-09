<script setup lang="ts">
import { provide, computed } from "vue";
import type { AtomSidebarProps, AtomSidebarEmits } from "./types";
import AtomSidebarItem from "./AtomSidebarItem.vue";
import "./AtomSidebar.scss";

defineOptions({ name: "AtomSidebar" });

const props = withDefaults(defineProps<AtomSidebarProps>(), {
  modelValue: false,
  width: "240px",
  collapsedWidth: "60px",
  items: () => [],
  bordered: true,
});

const emit = defineEmits<AtomSidebarEmits>();

const isCollapsed = computed(() => props.modelValue);

provide("sidebarActiveKey", computed(() => props.activeKey ?? ""));
provide("sidebarCollapsed", computed(() => isCollapsed.value));

const sidebarStyle = computed(() => ({
  width: isCollapsed.value ? props.collapsedWidth : props.width,
}));

function toggle() {
  emit("update:modelValue", !isCollapsed.value);
}

function onSelect(key: string) {
  emit("update:activeKey", key);
  emit("select", key);
}
</script>

<template>
  <aside
    :class="[
      'atom-sidebar',
      isCollapsed && 'atom-sidebar--collapsed',
      bordered && 'atom-sidebar--bordered',
    ]"
    :style="sidebarStyle"
  >
    <!-- Header -->
    <div class="atom-sidebar__header">
      <div class="atom-sidebar__logo">
        <slot name="logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
            <path d="M8 12l3 3 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="atom-sidebar__logo-text">
            <slot name="title">Menu</slot>
          </span>
        </slot>
      </div>
      <button class="atom-sidebar__toggle" type="button" @click="toggle" :aria-label="isCollapsed ? 'Expand' : 'Collapse'">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="atom-sidebar__nav">
      <slot>
        <AtomSidebarItem
          v-for="item in items"
          :key="item.key"
          :item="item"
          :collapsed="isCollapsed"
          @select="onSelect"
        />
      </slot>
    </nav>

    <!-- Footer -->
    <div v-if="$slots.footer" class="atom-sidebar__footer">
      <slot name="footer" />
    </div>
  </aside>
</template>
