# AtomSpinner

<script setup lang="ts">
import DemoBlock from "./DemoBlock.vue";
import { AtomSpinner } from "atom-ui-vue";
import "atom-ui-vue/style.css";

const basicCode = `<AtomSpinner />`;

const sizesCode = `<AtomSpinner size="xs" />
<AtomSpinner size="sm" />
<AtomSpinner size="md" />
<AtomSpinner size="lg" />
<AtomSpinner size="xl" />`;

const variantsCode = `<AtomSpinner variant="primary" />
<AtomSpinner variant="success" />
<AtomSpinner variant="warning" />
<AtomSpinner variant="danger" />
<AtomSpinner variant="secondary" />`;

const labelCode = `<AtomSpinner label="Loading..." />`;

const usageCode = `<div v-if="loading" style="display:flex; justify-content:center; padding:40px">
  <AtomSpinner size="lg" />
</div>
<div v-else>Your content here</div>`;
</script>

`AtomSpinner` is a standalone loading indicator. Use it to communicate an in-progress state anywhere in your UI.

---

## Basic

<DemoBlock title="Basic" :code="basicCode">
  <AtomSpinner />
</DemoBlock>

---

## Sizes

<DemoBlock title="Sizes" :code="sizesCode">
  <div style="display: flex; gap: 20px; align-items: center;">
    <AtomSpinner size="xs" />
    <AtomSpinner size="sm" />
    <AtomSpinner size="md" />
    <AtomSpinner size="lg" />
    <AtomSpinner size="xl" />
  </div>
</DemoBlock>

---

## Variants

<DemoBlock title="Variants" :code="variantsCode">
  <div style="display: flex; gap: 20px; align-items: center;">
    <AtomSpinner variant="primary" />
    <AtomSpinner variant="success" />
    <AtomSpinner variant="warning" />
    <AtomSpinner variant="danger" />
    <AtomSpinner variant="secondary" />
  </div>
</DemoBlock>

---

## With Label

<DemoBlock title="Label" :code="labelCode">
  <AtomSpinner label="Loading..." />
</DemoBlock>

---

## Usage Example

<DemoBlock title="In Context" :code="usageCode">
  <div style="display: flex; justify-content: center; padding: 24px;">
    <AtomSpinner size="lg" label="Fetching data..." />
  </div>
</DemoBlock>

---

## Props

| Prop      | Type                                                                        | Default     | Description     |
| --------- | --------------------------------------------------------------------------- | ----------- | --------------- |
| `size`    | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                                      | `'md'`      | Spinner size    |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'white'` | `'primary'` | Color variant   |
| `label`   | `string`                                                                    | —           | Text below ring |
