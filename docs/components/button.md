# 🔘 AtomButton

<script setup lang="ts">
import { ref } from "vue";
import DemoBlock from "./DemoBlock.vue";
import { AtomButton } from "atomui-vue3";
import "atomui-vue3/style.css";

const loading = ref(false);

function toggleLoading() {
  loading.value = !loading.value;
}

function onClick(label: string) {
  console.log(`${label} clicked`);
}

const variantsCode = `<AtomButton @click="onClick('Primary')">Primary</AtomButton>
<AtomButton variant="secondary" @click="onClick('Secondary')">Secondary</AtomButton>
<AtomButton variant="outline" @click="onClick('Outline')">Outline</AtomButton>
<AtomButton variant="ghost" @click="onClick('Ghost')">Ghost</AtomButton>
<AtomButton variant="danger" @click="onClick('Danger')">Danger</AtomButton>`;

const sizesCode = `<AtomButton size="sm">Small</AtomButton>
<AtomButton size="md">Medium</AtomButton>
<AtomButton size="lg">Large</AtomButton>`;

const roundedCode = `<AtomButton rounded="sm">Rounded SM</AtomButton>
<AtomButton rounded="md">Rounded MD</AtomButton>
<AtomButton rounded="lg">Rounded LG</AtomButton>
<AtomButton rounded="full">Rounded Full</AtomButton>`;

const disabledCode = `<AtomButton disabled>Primary Disabled</AtomButton>
<AtomButton variant="secondary" disabled>Secondary Disabled</AtomButton>
<AtomButton variant="outline" disabled>Outline Disabled</AtomButton>
<AtomButton variant="ghost" disabled>Ghost Disabled</AtomButton>
<AtomButton variant="danger" disabled>Danger Disabled</AtomButton>`;

const loadingCode = `const loading = ref(false);

function toggleLoading() {
  loading.value = !loading.value;
}

<AtomButton :loading="loading">Loading Button</AtomButton>
<AtomButton variant="outline" :loading="loading">Saving...</AtomButton>
<AtomButton variant="danger" :loading="loading">Deleting...</AtomButton>
<AtomButton variant="secondary" @click="toggleLoading">
  {{ loading ? "Stop loading" : "Start loading" }}
</AtomButton>`;

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
</AtomButton>

<AtomButton variant="danger">
  <template #iconLeft>🗑</template>
  Delete
</AtomButton>`;

const blockCode = `<AtomButton block>Primary Block</AtomButton>
<AtomButton block variant="secondary">Secondary Block</AtomButton>
<AtomButton block variant="outline">Outline Block</AtomButton>
<AtomButton block variant="ghost">Ghost Block</AtomButton>
<AtomButton block variant="danger">Danger Block</AtomButton>`;

const mixedCode = `<AtomButton size="sm" rounded="full">Small Pill</AtomButton>
<AtomButton variant="outline" size="lg" rounded="lg">Large Outline</AtomButton>
<AtomButton variant="ghost" size="sm">Ghost Small</AtomButton>
<AtomButton variant="danger" rounded="full">Danger Pill</AtomButton>
<AtomButton variant="secondary" size="lg" :loading="false">Secondary Large</AtomButton>`;
</script>

`AtomButton` — UI library ichidagi asosiy button komponenti.  
U `variant`, `size`, `rounded`, `loading`, `disabled`, `block` va slotlar bilan ishlaydi.

---

## Variants

<DemoBlock title="Variants" :code="variantsCode">
  <div style="display: flex; gap: 12px;">
    <AtomButton @click="onClick('Primary')">Primary</AtomButton>
    <AtomButton variant="secondary" @click="onClick('Secondary')">Secondary</AtomButton>
    <AtomButton variant="outline" @click="onClick('Outline')">Outline</AtomButton>
    <AtomButton variant="ghost" @click="onClick('Ghost')">Ghost</AtomButton>
    <AtomButton variant="danger" @click="onClick('Danger')">Danger</AtomButton>
  </div>
</DemoBlock>

---

## Sizes

<DemoBlock title="Sizes" :code="sizesCode">
  <div style="display: flex; gap: 12px;">
    <AtomButton  size="sm">Small</AtomButton>
    <AtomButton size="md">Medium</AtomButton>
    <AtomButton size="lg">Large</AtomButton>
  </div>
</DemoBlock>

---

## Rounded

<DemoBlock title="Rounded" :code="roundedCode">
  <div style="display: flex; gap: 12px;">
    <AtomButton rounded="sm">Rounded SM</AtomButton>
    <AtomButton rounded="md">Rounded MD</AtomButton>
    <AtomButton rounded="lg">Rounded LG</AtomButton>
    <AtomButton rounded="full">Rounded Full</AtomButton>
  </div>
</DemoBlock>

---

## Disabled

<DemoBlock title="Disabled" :code="disabledCode">
  <div style="display: flex; gap: 12px;">
    <AtomButton disabled>Primary Disabled</AtomButton>
    <AtomButton variant="secondary" disabled>Secondary Disabled</AtomButton>
    <AtomButton variant="outline" disabled>Outline Disabled</AtomButton>
    <AtomButton variant="ghost" disabled>Ghost Disabled</AtomButton>
    <AtomButton variant="danger" disabled>Danger Disabled</AtomButton>
  </div>
</DemoBlock>

---

## Loading

<DemoBlock title="Loading" :code="loadingCode">
  <div style="display: flex; gap: 12px;">
    <AtomButton :loading="loading">Loading Button</AtomButton>
    <AtomButton variant="outline" :loading="loading">Saving...</AtomButton>
    <AtomButton variant="danger" :loading="loading">Deleting...</AtomButton>
    <AtomButton variant="secondary" @click="toggleLoading">
      {{ loading ? "Stop loading" : "Start loading" }}
    </AtomButton>
  </div>
</DemoBlock>

---

## With Icons

<DemoBlock title="With Icons" :code="iconsCode">
  <div style="display: flex; gap: 12px;">
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

  <AtomButton variant="danger">
      <template #iconLeft>🗑</template>
      Delete
    </AtomButton>

  </div>
</DemoBlock>

---

## Block

<DemoBlock title="Block" :code="blockCode">
 <div style="display: flex; flex-direction: column; gap: 24px;">
    <AtomButton block>Primary Block</AtomButton>
    <AtomButton block variant="secondary">Secondary Block</AtomButton>
    <AtomButton block variant="outline">Outline Block</AtomButton>
    <AtomButton block variant="ghost">Ghost Block</AtomButton>
    <AtomButton block variant="danger">Danger Block</AtomButton>
  </div>
</DemoBlock>

---

## Mixed Examples

<DemoBlock title="Mixed Examples" :code="mixedCode">
  <div style="display: flex; gap: 12px;">
    <AtomButton size="sm" rounded="full">Small Pill</AtomButton>

  <AtomButton variant="outline" size="lg" rounded="lg">
      Large Outline
    </AtomButton>

  <AtomButton variant="ghost" size="sm">
      Ghost Small
  </AtomButton>

  <AtomButton variant="danger" rounded="full">
      Danger Pill
    </AtomButton>

  <AtomButton variant="secondary" size="lg" :loading="false">
      Secondary Large
    </AtomButton>

  </div>
</DemoBlock>

---

## Props

| Prop       | Type                                                           | Default     | Description          |
| ---------- | -------------------------------------------------------------- | ----------- | -------------------- |
| `variant`  | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Button style         |
| `size`     | `'sm' \| 'md' \| 'lg'`                                         | `'md'`      | Button size          |
| `rounded`  | `'sm' \| 'md' \| 'lg' \| 'full'`                               | `'md'`      | Border radius        |
| `block`    | `boolean`                                                      | `false`     | Full width button    |
| `disabled` | `boolean`                                                      | `false`     | Disable button       |
| `loading`  | `boolean`                                                      | `false`     | Show loading spinner |
| `htmlType` | `'button' \| 'submit' \| 'reset'`                              | `'button'`  | Native button type   |
| `ripple`   | `boolean`                                                      | `true`      | Enable wave effect   |

---

## Slots

| Slot        | Description            |
| ----------- | ---------------------- |
| `default`   | Button label/content   |
| `iconLeft`  | Left icon              |
| `iconRight` | Right icon             |
| `loader`    | Custom loading content |
