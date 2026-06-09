<script setup>
import { ref } from 'vue'

const page1 = ref(1)
const page2 = ref(1)
const pageSize2 = ref(10)
const page3 = ref(1)
const page4 = ref(3)
</script>

# Pagination

Navigate through pages of data. Supports size selector, total display, and jump-to-page.

## Basic

<DemoBlock>
  <div style="display:flex;flex-direction:column;gap:12px">
    <AtomPagination v-model:current="page1" :total="100" />
    <p style="font-size:13px;color:#6b7280">Page: <strong>{{ page1 }}</strong></p>
  </div>
  <template #code>

```vue
<script setup>
const current = ref(1)
</script>
<template>
  <AtomPagination v-model:current="current" :total="100" />
</template>
```

  </template>
</DemoBlock>

## With Total & Size Changer

<DemoBlock>
  <AtomPagination
    v-model:current="page2"
    v-model:page-size="pageSize2"
    :total="237"
    show-total
    show-size-changer
    :page-sizes="[10, 20, 50]"
  />
  <template #code>

```vue
<AtomPagination
  v-model:current="current"
  v-model:page-size="pageSize"
  :total="237"
  show-total
  show-size-changer
  :page-sizes="[10, 20, 50]"
/>
```

  </template>
</DemoBlock>

## With Jump-to-Page

<DemoBlock>
  <AtomPagination
    v-model:current="page3"
    :total="500"
    show-jumper
    show-total
  />
  <template #code>

```vue
<AtomPagination v-model:current="current" :total="500" show-jumper show-total />
```

  </template>
</DemoBlock>

## Simple Mode

<DemoBlock>
  <AtomPagination v-model:current="page4" :total="80" simple />
  <template #code>

```vue
<AtomPagination v-model:current="current" :total="80" simple />
```

  </template>
</DemoBlock>

## Disabled

<DemoBlock>
  <AtomPagination :current="3" :total="100" disabled />
</DemoBlock>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `total` | `number` | required | Total number of items |
| `current` | `number` | `1` | Current page (`v-model:current`) |
| `pageSize` | `number` | `10` | Items per page (`v-model:page-size`) |
| `pageSizes` | `number[]` | `[10, 20, 50, 100]` | Options for size changer |
| `showSizeChanger` | `boolean` | `false` | Show page size selector |
| `showTotal` | `boolean` | `false` | Show total item count |
| `showJumper` | `boolean` | `false` | Show go-to-page input |
| `disabled` | `boolean` | `false` | Disable all controls |
| `simple` | `boolean` | `false` | Simple prev/next mode |

## Emits

| Event | Payload | Description |
|-------|---------|-------------|
| `update:current` | `number` | Current page changed |
| `update:pageSize` | `number` | Page size changed |
| `change` | `(page, size)` | Either changed |
