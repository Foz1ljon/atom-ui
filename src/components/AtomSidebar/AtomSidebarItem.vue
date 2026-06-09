<script setup lang="ts">
import { ref, inject, computed } from "vue";
import type { AtomSidebarItemProps, AtomSidebarItemEmits } from "./types";

defineOptions({ name: "AtomSidebarItem" });

const props = withDefaults(defineProps<AtomSidebarItemProps>(), {
  active: false,
  collapsed: false,
  depth: 0,
});

const emit = defineEmits<AtomSidebarItemEmits>();

const activeKey = inject<string>("sidebarActiveKey", "");
const isCollapsed = inject<boolean>("sidebarCollapsed", false);

const isActive = computed(() => props.item.key === activeKey);
const hasChildren = computed(
  () => props.item.children && props.item.children.length > 0
);

const open = ref(false);

function handleClick() {
  if (props.item.disabled) return;
  if (hasChildren.value && !isCollapsed) {
    open.value = !open.value;
    return;
  }
  emit("select", props.item.key);
}
</script>

<template>
  <div
    :class="[
      'atom-sidebar-item',
      isActive && 'atom-sidebar-item--active',
      item.disabled && 'atom-sidebar-item--disabled',
      hasChildren && open && 'atom-sidebar-item--open',
    ]"
  >
    <button class="atom-sidebar-item__btn" type="button" @click="handleClick">
      <span class="atom-sidebar-item__icon">
        <span v-if="item.icon" v-html="item.icon" />
        <span v-else>○</span>
      </span>

      <span class="atom-sidebar-item__label">{{ item.label }}</span>

      <span v-if="item.badge !== undefined" class="atom-sidebar-item__badge">
        {{ item.badge }}
      </span>

      <span v-if="hasChildren" class="atom-sidebar-item__arrow">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </button>

    <!-- Children -->
    <Transition name="atom-sidebar-sub">
      <div v-if="hasChildren && open && !isCollapsed" class="atom-sidebar-item__children">
        <div
          v-for="child in item.children"
          :key="child.key"
          class="atom-sidebar-item__child"
        >
          <AtomSidebarItem
            :item="child"
            :depth="depth + 1"
            @select="emit('select', $event)"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.atom-sidebar-sub-enter-active,
.atom-sidebar-sub-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}
.atom-sidebar-sub-enter-from,
.atom-sidebar-sub-leave-to {
  max-height: 0;
  opacity: 0;
}
.atom-sidebar-sub-enter-to,
.atom-sidebar-sub-leave-from {
  max-height: 300px;
  opacity: 1;
}
</style>
