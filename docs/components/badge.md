# AtomBadge

<script setup lang="ts">
import DemoBlock from "./DemoBlock.vue";
import { AtomBadge } from "atom-ui-vue";
import "atom-ui-vue/style.css";

const variantsCode = `<AtomBadge variant="primary">Primary</AtomBadge>
<AtomBadge variant="secondary">Secondary</AtomBadge>
<AtomBadge variant="success">Success</AtomBadge>
<AtomBadge variant="warning">Warning</AtomBadge>
<AtomBadge variant="danger">Danger</AtomBadge>
<AtomBadge variant="info">Info</AtomBadge>`;

const outlineCode = `<AtomBadge variant="primary" outline>Primary</AtomBadge>
<AtomBadge variant="success" outline>Success</AtomBadge>
<AtomBadge variant="warning" outline>Warning</AtomBadge>
<AtomBadge variant="danger" outline>Danger</AtomBadge>
<AtomBadge variant="info" outline>Info</AtomBadge>`;

const sizesCode = `<AtomBadge size="sm">Small</AtomBadge>
<AtomBadge size="md">Medium</AtomBadge>
<AtomBadge size="lg">Large</AtomBadge>`;

const pillCode = `<AtomBadge pill>Default</AtomBadge>
<AtomBadge variant="success" pill>Success</AtomBadge>
<AtomBadge variant="danger" pill>Danger</AtomBadge>`;

const dotCode = `<AtomBadge variant="success" dot>Active</AtomBadge>
<AtomBadge variant="danger" dot>Error</AtomBadge>
<AtomBadge variant="warning" dot>Pending</AtomBadge>`;
</script>

`AtomBadge` is a small inline element for status indicators, labels, or counters.

---

## Variants

<DemoBlock title="Variants" :code="variantsCode">
  <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
    <AtomBadge variant="primary">Primary</AtomBadge>
    <AtomBadge variant="secondary">Secondary</AtomBadge>
    <AtomBadge variant="success">Success</AtomBadge>
    <AtomBadge variant="warning">Warning</AtomBadge>
    <AtomBadge variant="danger">Danger</AtomBadge>
    <AtomBadge variant="info">Info</AtomBadge>
  </div>
</DemoBlock>

---

## Outline

<DemoBlock title="Outline" :code="outlineCode">
  <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center;">
    <AtomBadge variant="primary" outline>Primary</AtomBadge>
    <AtomBadge variant="success" outline>Success</AtomBadge>
    <AtomBadge variant="warning" outline>Warning</AtomBadge>
    <AtomBadge variant="danger" outline>Danger</AtomBadge>
    <AtomBadge variant="info" outline>Info</AtomBadge>
  </div>
</DemoBlock>

---

## Sizes

<DemoBlock title="Sizes" :code="sizesCode">
  <div style="display: flex; gap: 8px; align-items: center;">
    <AtomBadge size="sm">Small</AtomBadge>
    <AtomBadge size="md">Medium</AtomBadge>
    <AtomBadge size="lg">Large</AtomBadge>
  </div>
</DemoBlock>

---

## Pill

<DemoBlock title="Pill" :code="pillCode">
  <div style="display: flex; gap: 8px; align-items: center;">
    <AtomBadge pill>Default</AtomBadge>
    <AtomBadge variant="success" pill>Success</AtomBadge>
    <AtomBadge variant="danger" pill>Danger</AtomBadge>
  </div>
</DemoBlock>

---

## With Dot

<DemoBlock title="Dot Indicator" :code="dotCode">
  <div style="display: flex; gap: 12px; align-items: center;">
    <AtomBadge variant="success" dot>Active</AtomBadge>
    <AtomBadge variant="danger" dot>Error</AtomBadge>
    <AtomBadge variant="warning" dot>Pending</AtomBadge>
  </div>
</DemoBlock>

---

## Props

| Prop      | Type                                                                       | Default     | Description         |
| --------- | -------------------------------------------------------------------------- | ----------- | ------------------- |
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` | Color variant       |
| `size`    | `'sm' \| 'md' \| 'lg'`                                                     | `'md'`      | Badge size          |
| `dot`     | `boolean`                                                                  | `false`     | Show leading dot    |
| `pill`    | `boolean`                                                                  | `false`     | Fully rounded shape |
| `outline` | `boolean`                                                                  | `false`     | Outline style       |

---

## Slots

| Slot      | Description        |
| --------- | ------------------ |
| `default` | Badge text/content |
