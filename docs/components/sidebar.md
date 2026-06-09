<script setup>
import { ref } from 'vue'

const collapsed1 = ref(false)
const active1 = ref('dashboard')
const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: '⬛' },
  { key: 'users',     label: 'Users',     icon: '👤', badge: 5 },
  { key: 'analytics', label: 'Analytics', icon: '📊' },
  { key: 'settings',  label: 'Settings',  icon: '⚙️' },
]

const collapsed2 = ref(false)
const active2 = ref('list')
const nestedItems = [
  { key: 'home',     label: 'Home',     icon: '🏠' },
  {
    key: 'products',
    label: 'Products',
    icon: '📦',
    children: [
      { key: 'list',  label: 'Product List' },
      { key: 'add',   label: 'Add Product'  },
      { key: 'cats',  label: 'Categories'   },
    ],
  },
  { key: 'orders',  label: 'Orders',  icon: '📋', badge: 12 },
  { key: 'reports', label: 'Reports', icon: '📈' },
]
</script>

# Sidebar

Collapsible navigation sidebar with nested items, badges, and custom slots.

## Basic Usage

<DemoBlock>
  <div style="height:300px;border:1px solid #e5e7eb;border-radius:8px;display:inline-flex;overflow:hidden">
    <AtomSidebar
      v-model="collapsed1"
      v-model:active-key="active1"
      :items="navItems"
    >
      <template #title>MyApp</template>
    </AtomSidebar>
    <div style="padding:20px;min-width:160px;font-size:14px;color:#374151">
      Active: <strong>{{ active1 }}</strong>
    </div>
  </div>
  <template #code>

```vue
<script setup>
const collapsed = ref(false)
const activeKey = ref('dashboard')
const items = [
  { key: 'dashboard', label: 'Dashboard', icon: '⬛' },
  { key: 'users',     label: 'Users',     icon: '👤', badge: 5 },
  { key: 'settings',  label: 'Settings',  icon: '⚙️' },
]
</script>
<template>
  <AtomSidebar v-model="collapsed" v-model:active-key="activeKey" :items="items">
    <template #title>MyApp</template>
  </AtomSidebar>
</template>
```

  </template>
</DemoBlock>

## Nested Items

<DemoBlock>
  <div style="height:360px;border:1px solid #e5e7eb;border-radius:8px;display:inline-flex;overflow:hidden">
    <AtomSidebar
      v-model="collapsed2"
      v-model:active-key="active2"
      :items="nestedItems"
    >
      <template #title>Admin</template>
    </AtomSidebar>
    <div style="padding:20px;min-width:160px;font-size:14px;color:#374151">
      Active: <strong>{{ active2 }}</strong>
    </div>
  </div>
  <template #code>

```vue
const items = [
  { key: 'home', label: 'Home', icon: '🏠' },
  {
    key: 'products',
    label: 'Products',
    icon: '📦',
    children: [
      { key: 'list', label: 'Product List' },
      { key: 'add',  label: 'Add Product'  },
    ],
  },
  { key: 'orders', label: 'Orders', icon: '📋', badge: 12 },
]
```

  </template>
</DemoBlock>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Collapsed state (`v-model`) |
| `width` | `string` | `'240px'` | Expanded width |
| `collapsedWidth` | `string` | `'60px'` | Collapsed width |
| `activeKey` | `string` | — | Active item key (`v-model:active-key`) |
| `items` | `AtomSidebarItemOption[]` | `[]` | Navigation items |
| `bordered` | `boolean` | `true` | Show right border |

## Item Shape

| Field | Type | Description |
|-------|------|-------------|
| `key` | `string` | Unique identifier |
| `label` | `string` | Display text |
| `icon` | `string` | HTML string |
| `badge` | `string \| number` | Badge count |
| `disabled` | `boolean` | Disable item |
| `children` | `ItemOption[]` | Sub-menu items (one level) |

## Emits

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Collapsed state changed |
| `update:activeKey` | `string` | Active key changed |
| `select` | `string` | Item clicked |

## Slots

| Slot | Description |
|------|-------------|
| `default` | Custom nav content (replaces `:items`) |
| `title` | Text next to logo |
| `logo` | Full logo area override |
| `footer` | Bottom of sidebar |
