# AtomCard

<script setup lang="ts">
import DemoBlock from "./DemoBlock.vue";
import { AtomCard, AtomButton } from "atom-ui-vue";
import "atom-ui-vue/style.css";

const basicCode = `<AtomCard>
  Simple card content goes here.
</AtomCard>`;

const headerFooterCode = `<AtomCard>
  <template #header>Card Title</template>

  This is the main body of the card.

  <template #footer>
    <AtomButton size="sm">Save</AtomButton>
  </template>
</AtomCard>`;

const shadowCode = `<AtomCard shadow="none" bordered>No shadow</AtomCard>
<AtomCard shadow="sm">Shadow SM</AtomCard>
<AtomCard shadow="md">Shadow MD</AtomCard>
<AtomCard shadow="lg">Shadow LG</AtomCard>`;

const hoverableCode = `<AtomCard hoverable shadow="sm">
  Hover over me — shadow deepens and card lifts.
</AtomCard>`;

const paddingCode = `<AtomCard padding="none" bordered>No padding</AtomCard>
<AtomCard padding="sm" shadow="sm">Small padding</AtomCard>
<AtomCard padding="md" shadow="sm">Medium padding</AtomCard>
<AtomCard padding="lg" shadow="sm">Large padding</AtomCard>`;
</script>

`AtomCard` is a flexible container component for grouping related content. Supports header/footer slots, shadow levels, hoverable effect, and padding control.

---

## Basic

<DemoBlock title="Basic" :code="basicCode">
  <AtomCard>
    Simple card content goes here.
  </AtomCard>
</DemoBlock>

---

## Header & Footer

<DemoBlock title="Header & Footer" :code="headerFooterCode">
  <AtomCard>
    <template #header>Card Title</template>
    This is the main body of the card. You can place any content here.
    <template #footer>
      <AtomButton size="sm">Save</AtomButton>
    </template>
  </AtomCard>
</DemoBlock>

---

## Shadow Levels

<DemoBlock title="Shadow" :code="shadowCode">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
    <AtomCard shadow="none" bordered>No shadow</AtomCard>
    <AtomCard shadow="sm">Shadow SM</AtomCard>
    <AtomCard shadow="md">Shadow MD</AtomCard>
    <AtomCard shadow="lg">Shadow LG</AtomCard>
  </div>
</DemoBlock>

---

## Hoverable

<DemoBlock title="Hoverable" :code="hoverableCode">
  <AtomCard hoverable shadow="sm">
    Hover over me — shadow deepens and the card lifts slightly.
  </AtomCard>
</DemoBlock>

---

## Padding

<DemoBlock title="Padding Sizes" :code="paddingCode">
  <div style="display: flex; flex-direction: column; gap: 12px;">
    <AtomCard padding="none" bordered>No padding</AtomCard>
    <AtomCard padding="sm" shadow="sm">Small padding</AtomCard>
    <AtomCard padding="md" shadow="sm">Medium padding</AtomCard>
    <AtomCard padding="lg" shadow="sm">Large padding</AtomCard>
  </div>
</DemoBlock>

---

## Props

| Prop        | Type                             | Default | Description          |
| ----------- | -------------------------------- | ------- | -------------------- |
| `shadow`    | `'none' \| 'sm' \| 'md' \| 'lg'` | `'sm'`  | Box shadow intensity |
| `padding`   | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'`  | Inner spacing        |
| `bordered`  | `boolean`                        | `false` | Show a border        |
| `hoverable` | `boolean`                        | `false` | Lift on hover        |
| `radius`    | `'sm' \| 'md' \| 'lg'`           | `'md'`  | Border radius        |

---

## Slots

| Slot      | Description      |
| --------- | ---------------- |
| `header`  | Card header area |
| `default` | Main content     |
| `footer`  | Card footer area |
