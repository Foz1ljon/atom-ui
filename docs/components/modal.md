# AtomModal

<script setup lang="ts">
import { ref } from "vue";
import DemoBlock from "./DemoBlock.vue";
import { AtomModal, AtomButton } from "atom-ui-vue";
import "atom-ui-vue/style.css";

const open1 = ref(false);
const open2 = ref(false);
const open3 = ref(false);
const open4 = ref(false);
const open5 = ref(false);
const open6 = ref(false);
const open7 = ref(false);

const basicCode = `<AtomButton @click="open = true">Open Modal</AtomButton>

<AtomModal v-model="open" title="Basic Modal">
  Modal content goes here.
</AtomModal>`;

const sizesCode = `<AtomModal v-model="open" size="sm"   title="Small (400px)">...</AtomModal>
<AtomModal v-model="open" size="md"   title="Medium (540px)">...</AtomModal>
<AtomModal v-model="open" size="lg"   title="Large (720px)">...</AtomModal>
<AtomModal v-model="open" size="xl"   title="Extra Large (960px)">...</AtomModal>
<AtomModal v-model="open" size="full" title="Full screen">...</AtomModal>`;

const footerCode = `<AtomModal v-model="open" title="Delete item">
  <p>Are you sure you want to delete this item?</p>

  <template #footer>
    <AtomButton variant="secondary" @click="open = false">Cancel</AtomButton>
    <AtomButton variant="danger" @click="confirm">Delete</AtomButton>
  </template>
</AtomModal>`;

const topCode = `<AtomModal v-model="open" title="Aligned to top" :centered="false">
  This modal is aligned to the top of the viewport.
</AtomModal>`;

const persistentCode = `<AtomModal
  v-model="open"
  title="Persistent"
  :mask-closable="false"
  :close-on-esc="false"
>
  Backdrop click and ESC are disabled — use the close button.
</AtomModal>`;
</script>

`AtomModal` is a centered dialog overlay. It renders via Vue `<Teleport>` directly into `<body>`, avoiding z-index conflicts. Supports ESC key, backdrop click, body scroll lock, and a smooth zoom transition.

---

## Basic

<DemoBlock title="Basic" :code="basicCode">
  <AtomButton @click="open1 = true">Open Modal</AtomButton>
  <AtomModal v-model="open1" title="Basic Modal">
    <p>This is the modal content. Any HTML or Vue components can go here.</p>
    <p style="margin-top: 12px; color: #6b7280; font-size: 14px;">
      Press ESC or click the backdrop to close.
    </p>
  </AtomModal>
</DemoBlock>

---

## Sizes

<DemoBlock title="Sizes" :code="sizesCode">
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <AtomButton @click="open2 = true">Small</AtomButton>
    <AtomButton variant="secondary" @click="open3 = true">Large</AtomButton>
    <AtomButton variant="outline" @click="open4 = true">Full</AtomButton>
  </div>

<AtomModal v-model="open2" size="sm" title="Small Modal">Width 400px.</AtomModal>
<AtomModal v-model="open3" size="lg" title="Large Modal">Width 720px.</AtomModal>
<AtomModal v-model="open4" size="full" title="Full-screen Modal">Spans the viewport.</AtomModal>
</DemoBlock>

---

## With Footer

<DemoBlock title="Header + Footer" :code="footerCode">
  <AtomButton variant="danger" @click="open5 = true">Delete item</AtomButton>
  <AtomModal v-model="open5" title="Delete item">
    <p>Are you sure you want to delete this item? This action cannot be undone.</p>
    <template #footer>
      <AtomButton variant="secondary" @click="open5 = false">Cancel</AtomButton>
      <AtomButton variant="danger" @click="open5 = false">Delete</AtomButton>
    </template>
  </AtomModal>
</DemoBlock>

---

## Top Aligned

<DemoBlock title="Top aligned" :code="topCode">
  <AtomButton @click="open6 = true">Open (top)</AtomButton>
  <AtomModal v-model="open6" title="Aligned to top" :centered="false">
    <p>Set <code>:centered="false"</code> to align the modal to the top of the viewport.</p>
  </AtomModal>
</DemoBlock>

---

## Persistent

<DemoBlock title="Persistent" :code="persistentCode">
  <AtomButton @click="open7 = true">Open persistent</AtomButton>
  <AtomModal
    v-model="open7"
    title="Persistent"
    :mask-closable="false"
    :close-on-esc="false"
  >
    <p>Backdrop click and ESC are disabled — use the close button to dismiss.</p>
  </AtomModal>
</DemoBlock>

---

## Props

| Prop             | Type                                            | Default | Description                                  |
| ---------------- | ----------------------------------------------- | ------- | -------------------------------------------- |
| `modelValue`     | `boolean`                                       | `false` | Open/closed state (v-model)                  |
| `title`          | `string`                                        | —       | Header title                                 |
| `size`           | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'`        | `'md'`  | Panel max width                              |
| `closeable`      | `boolean`                                        | `true`  | Show the close button                        |
| `mask`           | `boolean`                                        | `true`  | Show the backdrop overlay                    |
| `maskClosable`   | `boolean`                                        | `true`  | Close on backdrop click                      |
| `closeOnEsc`     | `boolean`                                        | `true`  | Close when the ESC key is pressed            |
| `destroyOnClose` | `boolean`                                        | `false` | Unmount content when closed                  |
| `centered`       | `boolean`                                        | `true`  | Vertically center (else align to the top)    |

---

## Emits

| Event               | Description              |
| ------------------- | ------------------------ |
| `update:modelValue` | v-model sync             |
| `open`              | Modal started opening    |
| `close`             | Modal started closing    |
| `afterOpen`         | Open animation finished  |
| `afterClose`        | Close animation finished |

---

## Slots

| Slot      | Description                          |
| --------- | ------------------------------------ |
| `default` | Main content                         |
| `header`  | Custom header (overrides title prop) |
| `footer`  | Footer area (action buttons, etc.)   |
