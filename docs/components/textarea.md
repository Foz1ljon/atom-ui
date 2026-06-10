# AtomTextarea

<script setup lang="ts">
import { ref } from "vue";
import DemoBlock from "./DemoBlock.vue";
import { AtomTextarea } from "atomui-vue3";
import "atomui-vue3/style.css";

const v1 = ref("");
const v2 = ref("");
const v3 = ref("");
const v4 = ref("");
const v5 = ref("");
const v6 = ref("");
const v7 = ref("");
const v8 = ref("");

const basicCode = `<AtomTextarea v-model="value" placeholder="Type something..." />`;

const labelCode = `<AtomTextarea
  v-model="value"
  label="Description"
  placeholder="Enter a description"
  hint="Keep it under 500 characters"
/>`;

const sizesCode = `<AtomTextarea v-model="v" size="sm" placeholder="Small" />
<AtomTextarea v-model="v" size="md" placeholder="Medium" />
<AtomTextarea v-model="v" size="lg" placeholder="Large" />`;

const rowsCode = `<AtomTextarea v-model="value" :rows="6" placeholder="6 rows tall..." />`;

const countCode = `<AtomTextarea
  v-model="value"
  :maxlength="200"
  show-count
  label="Bio"
  placeholder="Write something about yourself..."
/>`;

const errorCode = `<AtomTextarea
  v-model="value"
  :error="true"
  error-message="This field is required"
  label="Message"
  placeholder="Enter your message"
/>`;

const autosizeCode = `<AtomTextarea
  v-model="value"
  :autosize="true"
  :min-rows="2"
  :max-rows="8"
  placeholder="Auto-grows as you type..."
/>`;

const resizeCode = `<AtomTextarea v-model="v" resize="none"       placeholder="resize: none" />
<AtomTextarea v-model="v" resize="horizontal" placeholder="resize: horizontal" />
<AtomTextarea v-model="v" resize="both"       placeholder="resize: both" />`;
</script>

`AtomTextarea` is a multi-line text input with support for labels, hints, error states, character count, auto-resize, and configurable resize handles.

---

## Basic

<DemoBlock title="Basic" :code="basicCode">
  <AtomTextarea v-model="v1" placeholder="Type something..." />
</DemoBlock>

---

## Label & Hint

<DemoBlock title="Label & Hint" :code="labelCode">
  <AtomTextarea
    v-model="v2"
    label="Description"
    placeholder="Enter a description"
    hint="Keep it under 500 characters"
  />
</DemoBlock>

---

## Sizes

<DemoBlock title="Sizes" :code="sizesCode">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <AtomTextarea v-model="v3" size="sm" placeholder="Small" />
    <AtomTextarea v-model="v3" size="md" placeholder="Medium" />
    <AtomTextarea v-model="v3" size="lg" placeholder="Large" />
  </div>
</DemoBlock>

---

## Custom Rows

<DemoBlock title="Custom Rows" :code="rowsCode">
  <AtomTextarea v-model="v4" :rows="6" placeholder="6 rows tall..." />
</DemoBlock>

---

## Character Count

<DemoBlock title="Character Count" :code="countCode">
  <AtomTextarea
    v-model="v5"
    :maxlength="200"
    show-count
    label="Bio"
    placeholder="Write something about yourself..."
  />
</DemoBlock>

---

## Error State

<DemoBlock title="Error State" :code="errorCode">
  <AtomTextarea
    v-model="v6"
    :error="true"
    error-message="This field is required"
    label="Message"
    placeholder="Enter your message"
  />
</DemoBlock>

---

## Autosize

Textarea automatically grows between `minRows` and `maxRows` as the user types.

<DemoBlock title="Autosize" :code="autosizeCode">
  <AtomTextarea
    v-model="v7"
    :autosize="true"
    :min-rows="2"
    :max-rows="8"
    placeholder="Auto-grows as you type..."
  />
</DemoBlock>

---

## Resize Modes

<DemoBlock title="Resize Modes" :code="resizeCode">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <AtomTextarea v-model="v8" resize="none"       placeholder="resize: none" />
    <AtomTextarea v-model="v8" resize="horizontal" placeholder="resize: horizontal" />
    <AtomTextarea v-model="v8" resize="both"       placeholder="resize: both" />
  </div>
</DemoBlock>

---

## Props

| Prop           | Type                                              | Default      | Description                                  |
| -------------- | ------------------------------------------------- | ------------ | -------------------------------------------- |
| `modelValue`   | `string`                                          | —            | v-model value                                |
| `size`         | `'sm' \| 'md' \| 'lg'`                           | `'md'`       | Textarea size                                |
| `label`        | `string`                                          | —            | Field label                                  |
| `placeholder`  | `string`                                          | —            | Placeholder text                             |
| `hint`         | `string`                                          | —            | Helper text shown below the textarea         |
| `disabled`     | `boolean`                                         | `false`      | Disable the textarea                         |
| `readonly`     | `boolean`                                         | `false`      | Read-only mode                               |
| `error`        | `boolean`                                         | `false`      | Error state styling                          |
| `errorMessage` | `string`                                          | —            | Error message text                           |
| `rows`         | `number`                                          | `3`          | Number of visible rows                       |
| `maxlength`    | `number`                                          | —            | Maximum character count                      |
| `showCount`    | `boolean`                                         | `false`      | Display character counter                    |
| `autosize`     | `boolean`                                         | `false`      | Auto-grow height as content increases        |
| `minRows`      | `number`                                          | `2`          | Minimum rows when `autosize` is enabled      |
| `maxRows`      | `number`                                          | `8`          | Maximum rows when `autosize` is enabled      |
| `resize`       | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | CSS resize handle direction                  |

---

## Emits

| Event               | Payload        | Description         |
| ------------------- | -------------- | ------------------- |
| `update:modelValue` | `string`       | v-model update      |
| `change`            | `string`       | Value changed       |
| `focus`             | `FocusEvent`   | Textarea focused    |
| `blur`              | `FocusEvent`   | Textarea blurred    |
| `keydown`           | `KeyboardEvent`| Key pressed down    |
| `keyup`             | `KeyboardEvent`| Key released        |

---

## Exposed

| Name          | Type                    | Description                    |
| ------------- | ----------------------- | ------------------------------ |
| `focus()`     | `() => void`            | Programmatically focus element |
| `blur()`      | `() => void`            | Programmatically blur element  |
| `textareaRef` | `Ref<HTMLTextAreaElement>` | Direct ref to the `<textarea>` |
