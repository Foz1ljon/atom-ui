# AtomTag

<script setup lang="ts">
import { ref } from "vue";
import DemoBlock from "./DemoBlock.vue";
import { AtomTag } from "atomui-vue3";
import "atomui-vue3/style.css";

const tags = ref(["Vue 3", "TypeScript", "Vite", "SCSS"]);

function remove(i: number) {
  tags.value.splice(i, 1);
}

const variantsCode = `<AtomTag variant="primary">Primary</AtomTag>
<AtomTag variant="secondary">Secondary</AtomTag>
<AtomTag variant="success">Success</AtomTag>
<AtomTag variant="warning">Warning</AtomTag>
<AtomTag variant="danger">Danger</AtomTag>
<AtomTag variant="info">Info</AtomTag>`;

const outlineCode = `<AtomTag variant="primary" outline>Primary</AtomTag>
<AtomTag variant="success" outline>Success</AtomTag>
<AtomTag variant="danger" outline>Danger</AtomTag>`;

const closeableCode = `<AtomTag closeable @close="onClose">Closeable Tag</AtomTag>`;

const sizesCode = `<AtomTag size="sm">Small</AtomTag>
<AtomTag size="md">Medium</AtomTag>
<AtomTag size="lg">Large</AtomTag>`;

const dynamicCode = `<AtomTag
  v-for="(tag, i) in tags"
  :key="tag"
  closeable
  @close="tags.splice(i, 1)"
>
  {{ tag }}
</AtomTag>`;
</script>

`AtomTag` is a closeable label component for keywords, filters, or selections.

---

## Variants

<DemoBlock title="Variants" :code="variantsCode">
  <div style="display: flex; gap: 8px; flex-wrap: wrap;">
    <AtomTag variant="primary">Primary</AtomTag>
    <AtomTag variant="secondary">Secondary</AtomTag>
    <AtomTag variant="success">Success</AtomTag>
    <AtomTag variant="warning">Warning</AtomTag>
    <AtomTag variant="danger">Danger</AtomTag>
    <AtomTag variant="info">Info</AtomTag>
  </div>
</DemoBlock>

---

## Outline

<DemoBlock title="Outline" :code="outlineCode">
  <div style="display: flex; gap: 8px;">
    <AtomTag variant="primary" outline>Primary</AtomTag>
    <AtomTag variant="success" outline>Success</AtomTag>
    <AtomTag variant="danger" outline>Danger</AtomTag>
  </div>
</DemoBlock>

---

## Closeable

<DemoBlock title="Closeable" :code="closeableCode">
  <div style="display: flex; gap: 8px;">
    <AtomTag closeable>Vue 3</AtomTag>
    <AtomTag variant="success" closeable>TypeScript</AtomTag>
    <AtomTag variant="info" closeable>Vite</AtomTag>
  </div>
</DemoBlock>

---

## Sizes

<DemoBlock title="Sizes" :code="sizesCode">
  <div style="display: flex; gap: 8px; align-items: center;">
    <AtomTag size="sm">Small</AtomTag>
    <AtomTag size="md">Medium</AtomTag>
    <AtomTag size="lg">Large</AtomTag>
  </div>
</DemoBlock>

---

## Dynamic Tags

<DemoBlock title="Dynamic List" :code="dynamicCode">
  <div style="display: flex; gap: 8px; flex-wrap: wrap; min-height: 32px;">
    <AtomTag
      v-for="(tag, i) in tags"
      :key="tag"
      closeable
      @close="remove(i)"
    >
      {{ tag }}
    </AtomTag>
    <span v-if="!tags.length" style="color: #9ca3af; font-size: 14px;">All tags removed</span>
  </div>
</DemoBlock>

---

## Props

| Prop        | Type                                                                       | Default     | Description           |
| ----------- | -------------------------------------------------------------------------- | ----------- | --------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'primary'` | Color variant         |
| `size`      | `'sm' \| 'md' \| 'lg'`                                                    | `'md'`      | Tag size              |
| `closeable` | `boolean`                                                                  | `false`     | Show close button     |
| `outline`   | `boolean`                                                                  | `false`     | Outline style         |
| `pill`      | `boolean`                                                                  | `false`     | Fully rounded shape   |
| `disabled`  | `boolean`                                                                  | `false`     | Disable interaction   |

---

## Emits

| Event   | Description                  |
| ------- | ---------------------------- |
| `close` | Close button was clicked     |

---

## Slots

| Slot      | Description     |
| --------- | --------------- |
| `default` | Tag text/label  |
