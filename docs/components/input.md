# AtomInput

<script setup lang="ts">
import { ref } from "vue";
import DemoBlock from "./DemoBlock.vue";
import { AtomInput } from "atomui-vue3";
import "atomui-vue3/style.css";

const v1 = ref("");
const v2 = ref("");
const v3 = ref("");
const v4 = ref("");
const v5 = ref("");
const v6 = ref("");
const v7 = ref("");
const pass = ref("");

const basicCode = `<AtomInput v-model="value" placeholder="Type something..." />`;

const labelCode = `<AtomInput
  v-model="value"
  label="Full Name"
  placeholder="Enter your name"
  hint="This field is optional"
/>`;

const sizesCode = `<AtomInput v-model="v" size="sm" placeholder="Small" />
<AtomInput v-model="v" size="md" placeholder="Medium" />
<AtomInput v-model="v" size="lg" placeholder="Large" />`;

const clearableCode = `<AtomInput v-model="value" clearable placeholder="Clearable input..." />`;

const passwordCode = `<AtomInput
  v-model="password"
  type="password"
  show-password
  label="Password"
  placeholder="Enter your password"
/>`;

const errorCode = `<AtomInput
  v-model="value"
  :error="true"
  error-message="This field is required"
  label="Email"
  placeholder="email@example.com"
/>`;

const countCode = `<AtomInput
  v-model="value"
  :maxlength="120"
  show-count
  label="Bio"
  placeholder="Write something about yourself..."
/>`;

const prefixCode = `<AtomInput v-model="value" placeholder="Search...">
  <template #prefix>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="6.5" cy="6.5" r="5" stroke="#9ca3af" stroke-width="1.5"/>
      <path d="M10.5 10.5L14 14" stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round"/>
    </svg>
  </template>
</AtomInput>`;
</script>

`AtomInput` is a text input component with full support for labels, prefix/suffix slots, clearable mode, password toggle, error state, and character count.

---

## Basic

<DemoBlock title="Basic" :code="basicCode">
  <AtomInput v-model="v1" placeholder="Type something..." />
</DemoBlock>

---

## Label & Hint

<DemoBlock title="Label & Hint" :code="labelCode">
  <AtomInput
    v-model="v2"
    label="Full Name"
    placeholder="Enter your name"
    hint="This field is optional"
  />
</DemoBlock>

---

## Sizes

<DemoBlock title="Sizes" :code="sizesCode">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <AtomInput v-model="v3" size="sm" placeholder="Small" />
    <AtomInput v-model="v3" size="md" placeholder="Medium" />
    <AtomInput v-model="v3" size="lg" placeholder="Large" />
  </div>
</DemoBlock>

---

## Clearable

<DemoBlock title="Clearable" :code="clearableCode">
  <AtomInput v-model="v4" clearable placeholder="Type to see the clear button..." />
</DemoBlock>

---

## Password

<DemoBlock title="Password Toggle" :code="passwordCode">
  <AtomInput
    v-model="pass"
    type="password"
    show-password
    label="Password"
    placeholder="Enter your password"
  />
</DemoBlock>

---

## Error State

<DemoBlock title="Error State" :code="errorCode">
  <AtomInput
    v-model="v5"
    :error="true"
    error-message="This field is required"
    label="Email"
    placeholder="email@example.com"
  />
</DemoBlock>

---

## Character Count

<DemoBlock title="Character Count" :code="countCode">
  <AtomInput
    v-model="v6"
    :maxlength="120"
    show-count
    label="Bio"
    placeholder="Write something about yourself..."
  />
</DemoBlock>

---

## Prefix Slot

<DemoBlock title="Prefix Icon" :code="prefixCode">
  <AtomInput v-model="v7" placeholder="Search...">
    <template #prefix>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <circle cx="6.5" cy="6.5" r="5" stroke="#9ca3af" stroke-width="1.5"/>
        <path d="M10.5 10.5L14 14" stroke="#9ca3af" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    </template>
  </AtomInput>
</DemoBlock>

---

## Props

| Prop           | Type                                           | Default  | Description                     |
| -------------- | ---------------------------------------------- | -------- | ------------------------------- |
| `modelValue`   | `string \| number`                             | —        | v-model value                   |
| `type`         | `'text' \| 'password' \| 'email' \| 'number' \| 'search' \| ...` | `'text'` | Input type |
| `size`         | `'sm' \| 'md' \| 'lg'`                        | `'md'`   | Input size                      |
| `label`        | `string`                                       | —        | Field label                     |
| `placeholder`  | `string`                                       | —        | Placeholder text                |
| `hint`         | `string`                                       | —        | Helper text below the input     |
| `disabled`     | `boolean`                                      | `false`  | Disable the input               |
| `readonly`     | `boolean`                                      | `false`  | Read-only mode                  |
| `clearable`    | `boolean`                                      | `false`  | Show clear button when not empty|
| `showPassword` | `boolean`                                      | `false`  | Password visibility toggle      |
| `error`        | `boolean`                                      | `false`  | Error state styling             |
| `errorMessage` | `string`                                       | —        | Error message text              |
| `maxlength`    | `number`                                       | —        | Maximum character count         |
| `showCount`    | `boolean`                                      | `false`  | Display character counter       |

---

## Emits

| Event               | Payload         | Description                   |
| ------------------- | --------------- | ----------------------------- |
| `update:modelValue` | `string`        | v-model update                |
| `change`            | `string`        | Value changed                 |
| `focus`             | `FocusEvent`    | Input focused                 |
| `blur`              | `FocusEvent`    | Input blurred                 |
| `clear`             | —               | Clear button clicked          |

---

## Slots

| Slot     | Description                     |
| -------- | ------------------------------- |
| `prefix` | Content placed before the input |
| `suffix` | Content placed after the input  |
