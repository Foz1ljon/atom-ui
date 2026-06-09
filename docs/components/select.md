# AtomSelect

<script setup lang="ts">
import { ref } from "vue";
import DemoBlock from "./DemoBlock.vue";
import { AtomSelect } from "atomui-vue3";
import "atomui-vue3/style.css";

const v1 = ref(null);
const v2 = ref(null);
const v3 = ref(null);
const v4 = ref(null);
const v5 = ref([]);
const v6 = ref(null);

const fruits = [
  { label: "Apple",  value: "apple"  },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Grape",  value: "grape"  },
  { label: "Lemon",  value: "lemon"  },
  { label: "Pear",   value: "pear"   },
];

const frameworks = [
  { label: "Vue 3",   value: "vue"     },
  { label: "React",   value: "react"   },
  { label: "Angular", value: "angular" },
  { label: "Svelte",  value: "svelte"  },
  { label: "SolidJS", value: "solid",  disabled: true },
];

const basicCode = `<AtomSelect
  v-model="value"
  :options="[
    { label: 'Apple',  value: 'apple'  },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
  ]"
  placeholder="Select a fruit..."
/>`;

const labelCode = `<AtomSelect
  v-model="value"
  :options="options"
  label="Fruit"
  hint="Select one item"
  placeholder="Select..."
/>`;

const clearableCode = `<AtomSelect v-model="value" :options="options" clearable placeholder="Clearable..." />`;

const searchableCode = `<AtomSelect
  v-model="value"
  :options="options"
  searchable
  clearable
  placeholder="Type to filter..."
/>`;

const multipleCode = `<AtomSelect
  v-model="values"
  :options="options"
  multiple
  clearable
  placeholder="Select multiple..."
/>`;

const sizesCode = `<AtomSelect v-model="v" :options="options" size="sm" placeholder="Small" />
<AtomSelect v-model="v" :options="options" size="md" placeholder="Medium" />
<AtomSelect v-model="v" :options="options" size="lg" placeholder="Large" />`;
</script>

`AtomSelect` is a custom dropdown component with support for single and multiple selection, search filtering, keyboard navigation, and clearable state.

---

## Basic

<DemoBlock title="Basic" :code="basicCode">
  <AtomSelect v-model="v1" :options="fruits" placeholder="Select a fruit..." />
  <div v-if="v1" style="margin-top: 8px; font-size: 13px; color: #6b7280;">
    Selected: <strong>{{ v1 }}</strong>
  </div>
</DemoBlock>

---

## Label & Hint

<DemoBlock title="Label & Hint" :code="labelCode">
  <AtomSelect
    v-model="v2"
    :options="fruits"
    label="Fruit"
    hint="Select one item"
    placeholder="Select..."
  />
</DemoBlock>

---

## Clearable

<DemoBlock title="Clearable" :code="clearableCode">
  <AtomSelect v-model="v3" :options="fruits" clearable placeholder="Clearable..." />
</DemoBlock>

---

## Searchable

<DemoBlock title="Searchable" :code="searchableCode">
  <AtomSelect
    v-model="v4"
    :options="frameworks"
    searchable
    clearable
    placeholder="Search frameworks..."
  />
</DemoBlock>

---

## Multiple Selection

<DemoBlock title="Multiple" :code="multipleCode">
  <AtomSelect
    v-model="v5"
    :options="fruits"
    multiple
    clearable
    placeholder="Select multiple fruits..."
  />
  <div v-if="v5.length" style="margin-top: 8px; font-size: 13px; color: #6b7280;">
    Selected: {{ v5.join(", ") }}
  </div>
</DemoBlock>

---

## Sizes

<DemoBlock title="Sizes" :code="sizesCode">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <AtomSelect v-model="v6" :options="fruits" size="sm" placeholder="Small" />
    <AtomSelect v-model="v6" :options="fruits" size="md" placeholder="Medium" />
    <AtomSelect v-model="v6" :options="fruits" size="lg" placeholder="Large" />
  </div>
</DemoBlock>

---

## Props

| Prop           | Type                                  | Default             | Description                     |
| -------------- | ------------------------------------- | ------------------- | ------------------------------- |
| `modelValue`   | `string \| number \| array \| null`   | —                   | v-model value                   |
| `options`      | `AtomSelectOption[]`                  | `[]`                | List of options                 |
| `size`         | `'sm' \| 'md' \| 'lg'`               | `'md'`              | Select size                     |
| `placeholder`  | `string`                              | `'Select...'`       | Placeholder text                |
| `label`        | `string`                              | —                   | Field label                     |
| `hint`         | `string`                              | —                   | Helper text                     |
| `disabled`     | `boolean`                             | `false`             | Disable the select              |
| `clearable`    | `boolean`                             | `false`             | Show clear button               |
| `searchable`   | `boolean`                             | `false`             | Enable option filtering         |
| `multiple`     | `boolean`                             | `false`             | Allow multiple selections       |
| `error`        | `boolean`                             | `false`             | Error state                     |
| `errorMessage` | `string`                              | —                   | Error message text              |
| `noDataText`   | `string`                              | `'No data found'`   | Empty state message             |

---

## AtomSelectOption

```ts
interface AtomSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}
```

---

## Emits

| Event               | Payload  | Description               |
| ------------------- | -------- | ------------------------- |
| `update:modelValue` | `value`  | v-model update            |
| `change`            | `value`  | Selection changed         |
| `clear`             | —        | Clear button clicked      |
| `focus`             | —        | Dropdown opened           |
| `blur`              | —        | Dropdown closed           |

---

## Keyboard Navigation

| Key           | Action                          |
| ------------- | ------------------------------- |
| `↓ / ↑`       | Navigate through options        |
| `Enter`       | Select the focused option       |
| `Escape`      | Close the dropdown              |
| `Space / ↓`   | Open the dropdown (on trigger)  |
