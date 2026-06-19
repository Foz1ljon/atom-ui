<script setup>
import { ref, h } from 'vue'

// ---- Rich / real-world example ----
const palette = ['#6366f1', '#ec4899', '#0ea5e9', '#f59e0b', '#10b981']

function avatar(name) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const color = palette[name.length % palette.length]
  return h('span', {
    style: {
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
      background: color, color: '#fff', fontSize: '12px', fontWeight: 600,
    },
  }, initials)
}

function userCell(row) {
  return h('div', { style: { display: 'flex', alignItems: 'center', gap: '10px' } }, [
    avatar(row.name),
    h('div', { style: { display: 'flex', flexDirection: 'column', lineHeight: 1.3 } }, [
      h('span', { style: { fontWeight: 600 } }, row.name),
      h('span', { style: { fontSize: '12px', color: '#888' } }, row.email),
    ]),
  ])
}

const roleColors = {
  Admin:   { bg: '#eef2ff', fg: '#4f46e5' },
  Editor:  { bg: '#ecfdf5', fg: '#059669' },
  Viewer:  { bg: '#f1f5f9', fg: '#475569' },
}
function roleCell(row) {
  const c = roleColors[row.role] || roleColors.Viewer
  return h('span', {
    style: {
      padding: '2px 10px', borderRadius: '999px', fontSize: '12px',
      fontWeight: 600, background: c.bg, color: c.fg,
    },
  }, row.role)
}

const statusColors = { Active: '#10b981', Idle: '#f59e0b', Offline: '#94a3b8' }
function statusCell(row) {
  return h('span', { style: { display: 'inline-flex', alignItems: 'center', gap: '6px' } }, [
    h('span', { style: { width: '8px', height: '8px', borderRadius: '50%', background: statusColors[row.status] } }),
    h('span', null, row.status),
  ])
}

function balanceCell(row) {
  return h('span', { style: { fontWeight: 600, fontVariantNumeric: 'tabular-nums' } },
    '$' + row.balance.toLocaleString('en-US'))
}

const richColumns = [
  { key: 'name',    title: 'User',    render: userCell },
  { key: 'role',    title: 'Role',    render: roleCell, sortable: true },
  { key: 'status',  title: 'Status',  render: statusCell, sortable: true, align: 'center' },
  { key: 'balance', title: 'Balance', render: balanceCell, sortable: true, align: 'right' },
]
const richData = [
  { id: 1, name: 'Alice Johnson', email: 'alice@acme.io',   role: 'Admin',  status: 'Active',  balance: 12480 },
  { id: 2, name: 'Bob Smith',     email: 'bob@acme.io',     role: 'Editor', status: 'Idle',    balance: 7320  },
  { id: 3, name: 'Carol White',   email: 'carol@acme.io',   role: 'Viewer', status: 'Offline', balance: 2150  },
  { id: 4, name: 'David Lee',     email: 'david@acme.io',   role: 'Editor', status: 'Active',  balance: 9870  },
]

const basicColumns = [
  { key: 'name',   title: 'Name' },
  { key: 'role',   title: 'Role' },
  { key: 'status', title: 'Status' },
]
const basicData = [
  { id: 1, name: 'Alice Johnson', role: 'Engineer',  status: 'Active' },
  { id: 2, name: 'Bob Smith',     role: 'Designer',  status: 'Active' },
  { id: 3, name: 'Carol White',   role: 'Manager',   status: 'Away'   },
]

const loading = ref(true)
const skeletonColumns = [
  { key: 'name',  title: 'Name' },
  { key: 'email', title: 'Email' },
  { key: 'plan',  title: 'Plan' },
]
const skeletonData = [
  { id: 1, name: 'Alice', email: 'alice@example.com', plan: 'Pro' },
  { id: 2, name: 'Bob',   email: 'bob@example.com',   plan: 'Free' },
]
setTimeout(() => { loading.value = false }, 2500)

const sortColumns = [
  { key: 'name',  title: 'Name',  sortable: true },
  { key: 'age',   title: 'Age',   sortable: true, align: 'center' },
  { key: 'score', title: 'Score', sortable: true, align: 'right' },
]
const sortData = [
  { id: 1, name: 'Carol', age: 28, score: 92 },
  { id: 2, name: 'Alice', age: 34, score: 87 },
  { id: 3, name: 'Bob',   age: 25, score: 95 },
  { id: 4, name: 'Dave',  age: 31, score: 78 },
]

const stripedColumns = [
  { key: 'name',    title: 'Name' },
  { key: 'country', title: 'Country' },
  { key: 'points',  title: 'Points', align: 'right' },
]
const stripedData = [
  { id: 1, name: 'Alice',   country: 'USA', points: 4200 },
  { id: 2, name: 'Bob',     country: 'UK',  points: 3800 },
  { id: 3, name: 'Carol',   country: 'JP',  points: 5100 },
  { id: 4, name: 'Dave',    country: 'DE',  points: 2900 },
  { id: 5, name: 'Eve',     country: 'FR',  points: 4700 },
]
</script>

# Table

Feature-rich data table with sorting, skeleton loading, striped rows, and empty states.

## Overview

Use the `render` function on a column to draw fully custom cells — avatars, badges,
status dots, formatted numbers — while keeping built-in sorting.

<DemoBlock>
  <AtomTable :columns="richColumns" :data="richData" hoverable striped />
  <template #code>

```vue
<script setup>
import { h } from 'vue'

const columns = [
  { key: 'name',    title: 'User',    render: userCell },
  { key: 'role',    title: 'Role',    render: roleCell,    sortable: true },
  { key: 'status',  title: 'Status',  render: statusCell,  sortable: true, align: 'center' },
  { key: 'balance', title: 'Balance', render: balanceCell, sortable: true, align: 'right' },
]

// each render(row) returns a VNode built with h()
function statusCell(row) {
  const color = { Active: '#10b981', Idle: '#f59e0b', Offline: '#94a3b8' }[row.status]
  return h('span', { style: { display: 'inline-flex', alignItems: 'center', gap: '6px' } }, [
    h('span', { style: { width: '8px', height: '8px', borderRadius: '50%', background: color } }),
    h('span', null, row.status),
  ])
}

function balanceCell(row) {
  return h('span', { style: { fontWeight: 600 } }, '$' + row.balance.toLocaleString())
}
</script>

<template>
  <AtomTable :columns="columns" :data="data" hoverable striped />
</template>
```

  </template>
</DemoBlock>

## Basic Usage

<DemoBlock>
  <AtomTable :columns="basicColumns" :data="basicData" />
  <template #code>

```vue
<script setup>
const columns = [
  { key: 'name',   title: 'Name' },
  { key: 'role',   title: 'Role' },
  { key: 'status', title: 'Status' },
]
const data = [
  { id: 1, name: 'Alice Johnson', role: 'Engineer',  status: 'Active' },
  { id: 2, name: 'Bob Smith',     role: 'Designer',  status: 'Active' },
  { id: 3, name: 'Carol White',   role: 'Manager',   status: 'Away'   },
]
</script>

<template>
  <AtomTable :columns="columns" :data="data" />
</template>
```

  </template>
</DemoBlock>

## Skeleton Loading

Set `:loading="true"` to show animated skeleton rows. The demo below auto-loads after 2.5s.

<DemoBlock>
  <AtomTable :columns="skeletonColumns" :data="skeletonData" :loading="loading" :skeleton-rows="4" />
  <template #code>

```vue
<script setup>
import { ref } from 'vue'
const loading = ref(true)
// fetch data then:
// loading.value = false
</script>

<template>
  <AtomTable
    :columns="columns"
    :data="data"
    :loading="loading"
    :skeleton-rows="4"
  />
</template>
```

  </template>
</DemoBlock>

## Sortable Columns

Add `sortable: true` to any column definition.

<DemoBlock>
  <AtomTable :columns="sortColumns" :data="sortData" hoverable />
  <template #code>

```vue
const columns = [
  { key: 'name',  title: 'Name',  sortable: true },
  { key: 'age',   title: 'Age',   sortable: true, align: 'center' },
  { key: 'score', title: 'Score', sortable: true, align: 'right' },
]
```

  </template>
</DemoBlock>

## Striped & Bordered

<DemoBlock>
  <AtomTable :columns="stripedColumns" :data="stripedData" striped bordered />
  <template #code>

```vue
<AtomTable :columns="columns" :data="data" striped bordered />
```

  </template>
</DemoBlock>

## Sizes

<DemoBlock>
  <div style="display:flex;flex-direction:column;gap:24px">
    <div>
      <p style="font-size:12px;color:#888;margin-bottom:8px">Small</p>
      <AtomTable :columns="basicColumns" :data="basicData" size="sm" />
    </div>
    <div>
      <p style="font-size:12px;color:#888;margin-bottom:8px">Medium (default)</p>
      <AtomTable :columns="basicColumns" :data="basicData" size="md" />
    </div>
    <div>
      <p style="font-size:12px;color:#888;margin-bottom:8px">Large</p>
      <AtomTable :columns="basicColumns" :data="basicData" size="lg" />
    </div>
  </div>
</DemoBlock>

## Empty State

<DemoBlock>
  <AtomTable :columns="basicColumns" :data="[]" empty-text="No records found" />
</DemoBlock>

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `AtomTableColumn[]` | required | Column definitions |
| `data` | `object[]` | `[]` | Row data array |
| `rowKey` | `string` | `'id'` | Unique row identifier key |
| `loading` | `boolean` | `false` | Show skeleton rows |
| `skeletonRows` | `number` | `5` | Number of skeleton rows |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Cell padding size |
| `bordered` | `boolean` | `false` | Show cell borders |
| `striped` | `boolean` | `false` | Alternating row colors |
| `hoverable` | `boolean` | `true` | Highlight row on hover |
| `emptyText` | `string` | `'No data'` | Empty state message |
| `maxHeight` | `string` | — | Max height with scroll |

## Column Definition

| Field | Type | Description |
|-------|------|-------------|
| `key` | `string` | Data field key |
| `title` | `string` | Column header text |
| `width` | `string \| number` | Column width |
| `align` | `'left' \| 'center' \| 'right'` | Cell alignment |
| `sortable` | `boolean` | Enable click sorting |
| `render` | `(row, index) => any` | Custom cell renderer |

## Emits

| Event | Payload | Description |
|-------|---------|-------------|
| `row-click` | `(row, index)` | Row was clicked |
| `sort-change` | `(key, order)` | Sort column/order changed |
