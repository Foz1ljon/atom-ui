<script setup>
import { ref, computed } from 'vue'

const checked = ref(false)

const groupSelected = ref(['vue'])

const all = ['a', 'b', 'c']
const triSelected = ref(['a'])
const isAll = computed(() => triSelected.value.length === all.length)
const isIndet = computed(() =>
  triSelected.value.length > 0 && triSelected.value.length < all.length
)
function toggleAll() {
  triSelected.value = isAll.value ? [] : [...all]
}
</script>

# Checkbox

Checkbox lets users select one or more options. Supports single, group, and indeterminate states.

## Basic Usage

<DemoBlock>
  <div style="display:flex;flex-direction:column;gap:12px">
    <AtomCheckbox v-model="checked" label="Accept terms and conditions" />
    <p style="font-size:13px;color:#6b7280">Value: <strong>{{ checked }}</strong></p>
  </div>
  <template #code>

```vue
<script setup>
import { ref } from 'vue'
const checked = ref(false)
</script>
<template>
  <AtomCheckbox v-model="checked" label="Accept terms and conditions" />
</template>
```

  </template>
</DemoBlock>

## Checkbox Group

<DemoBlock>
  <div style="display:flex;flex-direction:column;gap:12px">
    <AtomCheckboxGroup v-model="groupSelected">
      <AtomCheckbox value="vue"     label="Vue" />
      <AtomCheckbox value="react"   label="React" />
      <AtomCheckbox value="angular" label="Angular" />
      <AtomCheckbox value="svelte"  label="Svelte" />
    </AtomCheckboxGroup>
    <p style="font-size:13px;color:#6b7280">Selected: <strong>{{ groupSelected.join(', ') }}</strong></p>
  </div>
  <template #code>

```vue
<script setup>
const selected = ref(['vue'])
</script>
<template>
  <AtomCheckboxGroup v-model="selected">
    <AtomCheckbox value="vue"     label="Vue" />
    <AtomCheckbox value="react"   label="React" />
    <AtomCheckbox value="angular" label="Angular" />
    <AtomCheckbox value="svelte"  label="Svelte" />
  </AtomCheckboxGroup>
</template>
```

  </template>
</DemoBlock>

## Indeterminate (Select All)

<DemoBlock>
  <div style="display:flex;flex-direction:column;gap:10px">
    <AtomCheckbox
      :model-value="isAll"
      :indeterminate="isIndet"
      label="Select All"
      @click="toggleAll"
    />
    <hr style="margin:4px 0;border-color:#e5e7eb" />
    <AtomCheckboxGroup v-model="triSelected" vertical>
      <AtomCheckbox value="a" label="Option A" />
      <AtomCheckbox value="b" label="Option B" />
      <AtomCheckbox value="c" label="Option C" />
    </AtomCheckboxGroup>
  </div>
  <template #code>

```vue
<script setup>
const all = ['a', 'b', 'c']
const selected = ref(['a'])
const isAll = computed(() => selected.value.length === all.length)
const isIndet = computed(() =>
  selected.value.length > 0 && selected.value.length < all.length
)
function toggleAll() {
  selected.value = isAll.value ? [] : [...all]
}
</script>
<template>
  <AtomCheckbox
    :model-value="isAll"
    :indeterminate="isIndet"
    label="Select All"
    @click="toggleAll"
  />
  <AtomCheckboxGroup v-model="selected" vertical>
    <AtomCheckbox value="a" label="Option A" />
    <AtomCheckbox value="b" label="Option B" />
    <AtomCheckbox value="c" label="Option C" />
  </AtomCheckboxGroup>
</template>
```

  </template>
</DemoBlock>

## Sizes

<DemoBlock>
  <div style="display:flex;gap:20px;align-items:center">
    <AtomCheckbox size="sm" :model-value="true" label="Small" />
    <AtomCheckbox size="md" :model-value="true" label="Medium" />
    <AtomCheckbox size="lg" :model-value="true" label="Large" />
  </div>
</DemoBlock>

## Disabled

<DemoBlock>
  <div style="display:flex;gap:20px">
    <AtomCheckbox disabled label="Disabled unchecked" />
    <AtomCheckbox disabled :model-value="true" label="Disabled checked" />
  </div>
</DemoBlock>

## AtomCheckbox Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean \| (string\|number)[]` | `false` | Bound value |
| `value` | `string \| number` | — | Value used in group mode |
| `label` | `string` | — | Label text |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Checkbox size |
| `disabled` | `boolean` | `false` | Disabled state |
| `indeterminate` | `boolean` | `false` | Indeterminate visual state |

## AtomCheckboxGroup Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `(string\|number)[]` | `[]` | Array of selected values |
| `disabled` | `boolean` | `false` | Disable all checkboxes |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size for all checkboxes |
| `vertical` | `boolean` | `false` | Stack checkboxes vertically |
