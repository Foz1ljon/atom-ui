<script setup>
import { ref } from 'vue'

const picked = ref('vue')

const plan = ref('pro')
const planOptions = [
  { value: 'free',       label: 'Free' },
  { value: 'pro',        label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise' },
]

const size = ref('md')
const sizeOptions = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
]

const vert = ref('a')
const vertOptions = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C — Disabled', disabled: true },
]
</script>

# Radio

Radio buttons let users select exactly one option from a group.

## Basic Usage

<DemoBlock>
  <div style="display:flex;flex-direction:column;gap:12px">
    <div style="display:flex;gap:16px">
      <AtomRadio v-model="picked" value="vue"     label="Vue" />
      <AtomRadio v-model="picked" value="react"   label="React" />
      <AtomRadio v-model="picked" value="angular" label="Angular" />
    </div>
    <p style="font-size:13px;color:#6b7280">Picked: <strong>{{ picked }}</strong></p>
  </div>
  <template #code>

```vue
<script setup>
const picked = ref('vue')
</script>
<template>
  <AtomRadio v-model="picked" value="vue"     label="Vue" />
  <AtomRadio v-model="picked" value="react"   label="React" />
  <AtomRadio v-model="picked" value="angular" label="Angular" />
</template>
```

  </template>
</DemoBlock>

## Radio Group with Options Array

<DemoBlock>
  <div style="display:flex;flex-direction:column;gap:12px">
    <AtomRadioGroup v-model="plan" :options="planOptions" />
    <p style="font-size:13px;color:#6b7280">Plan: <strong>{{ plan }}</strong></p>
  </div>
  <template #code>

```vue
<script setup>
const plan = ref('pro')
const options = [
  { value: 'free',       label: 'Free' },
  { value: 'pro',        label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise' },
]
</script>
<template>
  <AtomRadioGroup v-model="plan" :options="options" />
</template>
```

  </template>
</DemoBlock>

## Button Style

<DemoBlock>
  <AtomRadioGroup v-model="size" :options="sizeOptions" button-style />
  <template #code>

```vue
<AtomRadioGroup v-model="size" :options="options" button-style />
```

  </template>
</DemoBlock>

## Vertical + Disabled Option

<DemoBlock>
  <AtomRadioGroup v-model="vert" :options="vertOptions" vertical />
  <template #code>

```vue
const options = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C — Disabled', disabled: true },
]
```

  </template>
</DemoBlock>

## AtomRadio Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| number \| boolean` | — | Bound value |
| `value` | `string \| number \| boolean` | — | This radio's value |
| `label` | `string` | — | Label text |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Radio size |
| `disabled` | `boolean` | `false` | Disabled state |

## AtomRadioGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| number` | — | Selected value |
| `options` | `AtomRadioOption[]` | `[]` | Array of `{ value, label, disabled? }` |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size for all radios |
| `disabled` | `boolean` | `false` | Disable all radios |
| `vertical` | `boolean` | `false` | Stack vertically |
| `buttonStyle` | `boolean` | `false` | Render as segmented button group |
