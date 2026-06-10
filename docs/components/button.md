# AtomButton

<script setup lang="ts">
import { ref } from "vue";
import DemoBlock from "./DemoBlock.vue";
import { AtomButton } from "atom-ui-vue";
import "atom-ui-vue/style.css";

const loading = ref(false);

function toggleLoading() {
  loading.value = !loading.value;
}

const variantsCode = `<AtomButton>Primary</AtomButton>
<AtomButton variant="secondary">Secondary</AtomButton>
<AtomButton variant="outline">Outline</AtomButton>
<AtomButton variant="ghost">Ghost</AtomButton>
<AtomButton variant="danger">Danger</AtomButton>
<AtomButton variant="success">Success</AtomButton>`;

const sizesCode = `<AtomButton size="sm">Small</AtomButton>
<AtomButton size="md">Medium</AtomButton>
<AtomButton size="lg">Large</AtomButton>`;

const roundedCode = `<AtomButton rounded="sm">SM</AtomButton>
<AtomButton rounded="md">MD</AtomButton>
<AtomButton rounded="lg">LG</AtomButton>
<AtomButton rounded="full">Full</AtomButton>`;

const disabledCode = `<AtomButton disabled>Primary</AtomButton>
<AtomButton variant="secondary" disabled>Secondary</AtomButton>
<AtomButton variant="outline" disabled>Outline</AtomButton>
<AtomButton variant="danger" disabled>Danger</AtomButton>`;

const loadingCode = `<AtomButton :loading="loading">Save</AtomButton>
<AtomButton variant="outline" :loading="loading">Loading...</AtomButton>
<AtomButton variant="danger" :loading="loading">Deleting...</AtomButton>`;

const iconsCode = `<AtomButton>
  <template #iconLeft>+</template>
  Add Item
</AtomButton>

<AtomButton variant="secondary">
  <template #iconLeft>←</template>
  Back
</AtomButton>

<AtomButton variant="outline">
  Next
  <template #iconRight>→</template>
</AtomButton>`;

const blockCode = `<AtomButton block>Full Width Primary</AtomButton>
<AtomButton block variant="outline">Full Width Outline</AtomButton>`;
</script>

`AtomButton` is the base button component. Supports variants, sizes, border radius, loading state, icons, and a ripple effect.

---

## Variants

<DemoBlock title="Variants" :code="variantsCode">
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <AtomButton>Primary</AtomButton>
    <AtomButton variant="secondary">Secondary</AtomButton>
    <AtomButton variant="outline">Outline</AtomButton>
    <AtomButton variant="ghost">Ghost</AtomButton>
    <AtomButton variant="danger">Danger</AtomButton>
    <AtomButton variant="success">Success</AtomButton>
  </div>
</DemoBlock>

---

## Sizes

<DemoBlock title="Sizes" :code="sizesCode">
  <div style="display: flex; gap: 10px; align-items: center;">
    <AtomButton size="sm">Small</AtomButton>
    <AtomButton size="md">Medium</AtomButton>
    <AtomButton size="lg">Large</AtomButton>
  </div>
</DemoBlock>

---

## Border Radius

<DemoBlock title="Rounded" :code="roundedCode">
  <div style="display: flex; gap: 10px; align-items: center;">
    <AtomButton rounded="sm">SM</AtomButton>
    <AtomButton rounded="md">MD</AtomButton>
    <AtomButton rounded="lg">LG</AtomButton>
    <AtomButton rounded="full">Full</AtomButton>
  </div>
</DemoBlock>

---

## Disabled

<DemoBlock title="Disabled" :code="disabledCode">
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <AtomButton disabled>Primary</AtomButton>
    <AtomButton variant="secondary" disabled>Secondary</AtomButton>
    <AtomButton variant="outline" disabled>Outline</AtomButton>
    <AtomButton variant="danger" disabled>Danger</AtomButton>
  </div>
</DemoBlock>

---

## Loading

<DemoBlock title="Loading" :code="loadingCode">
  <div style="display: flex; gap: 10px; flex-wrap: wrap; align-items: center;">
    <AtomButton :loading="loading">Save</AtomButton>
    <AtomButton variant="outline" :loading="loading">Loading...</AtomButton>
    <AtomButton variant="danger" :loading="loading">Deleting...</AtomButton>
    <AtomButton variant="secondary" @click="toggleLoading">
      {{ loading ? "Stop" : "Toggle loading" }}
    </AtomButton>
  </div>
</DemoBlock>

---

## With Icons

<DemoBlock title="Icons" :code="iconsCode">
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <AtomButton>
      <template #iconLeft>+</template>
      Add Item
    </AtomButton>
    <AtomButton variant="secondary">
      <template #iconLeft>←</template>
      Back
    </AtomButton>
    <AtomButton variant="outline">
      Next
      <template #iconRight>→</template>
    </AtomButton>
  </div>
</DemoBlock>

---

## Block

<DemoBlock title="Block" :code="blockCode">
  <div style="display: flex; flex-direction: column; gap: 10px;">
    <AtomButton block>Full Width Primary</AtomButton>
    <AtomButton block variant="outline">Full Width Outline</AtomButton>
  </div>
</DemoBlock>

---

## Props

| Prop       | Type                                                                        | Default     | Description          |
| ---------- | --------------------------------------------------------------------------- | ----------- | -------------------- |
| `variant`  | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger' \| 'success'` | `'primary'` | Visual style         |
| `size`     | `'sm' \| 'md' \| 'lg'`                                                      | `'md'`      | Button size          |
| `rounded`  | `'sm' \| 'md' \| 'lg' \| 'full'`                                            | `'md'`      | Border radius        |
| `block`    | `boolean`                                                                   | `false`     | Full width button    |
| `disabled` | `boolean`                                                                   | `false`     | Disable the button   |
| `loading`  | `boolean`                                                                   | `false`     | Show loading spinner |
| `htmlType` | `'button' \| 'submit' \| 'reset'`                                           | `'button'`  | Native button type   |
| `ripple`   | `boolean`                                                                   | `true`      | Enable ripple effect |

---

## Emits

| Event   | Payload      | Description        |
| ------- | ------------ | ------------------ |
| `click` | `MouseEvent` | Button was clicked |

---

## Slots

| Slot        | Description              |
| ----------- | ------------------------ |
| `default`   | Button label / content   |
| `iconLeft`  | Icon on the left side    |
| `iconRight` | Icon on the right side   |
| `loader`    | Custom loading indicator |
