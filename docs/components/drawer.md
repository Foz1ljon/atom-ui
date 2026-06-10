# AtomDrawer

<script setup lang="ts">
import { ref } from "vue";
import DemoBlock from "./DemoBlock.vue";
import { AtomDrawer, AtomButton } from "atomui-vue3";
import "atomui-vue3/style.css";

const open1 = ref(false);
const open2 = ref(false);
const open3 = ref(false);
const open4 = ref(false);
const open5 = ref(false);
const open6 = ref(false);

const basicCode = `<AtomButton @click="open = true">Open Drawer</AtomButton>

<AtomDrawer v-model="open" title="Basic Drawer">
  Drawer content goes here.
</AtomDrawer>`;

const placementCode = `<AtomDrawer v-model="open" placement="right"  title="Right">...</AtomDrawer>
<AtomDrawer v-model="open" placement="left"   title="Left">...</AtomDrawer>
<AtomDrawer v-model="open" placement="top"    title="Top">...</AtomDrawer>
<AtomDrawer v-model="open" placement="bottom" title="Bottom">...</AtomDrawer>`;

const sizesCode = `<AtomDrawer v-model="open" size="sm" title="Small (360px)">...</AtomDrawer>
<AtomDrawer v-model="open" size="md" title="Medium (480px)">...</AtomDrawer>
<AtomDrawer v-model="open" size="lg" title="Large (640px)">...</AtomDrawer>
<AtomDrawer v-model="open" size="full" title="Full width">...</AtomDrawer>`;

const footerCode = `<AtomDrawer v-model="open" title="Edit User">
  <p>Form content here.</p>

  <template #footer>
    <AtomButton variant="secondary" @click="open = false">Cancel</AtomButton>
    <AtomButton @click="save">Save Changes</AtomButton>
  </template>
</AtomDrawer>`;

const noMaskCode = `<AtomDrawer v-model="open" title="No Backdrop" :mask="false">
  The backdrop is hidden.
</AtomDrawer>`;
</script>

`AtomDrawer` is a panel that slides in from any edge of the screen. It renders via Vue `<Teleport>` directly into `<body>`, avoiding z-index conflicts. Supports ESC key, backdrop click, and smooth CSS transitions.

---

## Basic

<DemoBlock title="Basic" :code="basicCode">
  <AtomButton @click="open1 = true">Open Drawer</AtomButton>
  <AtomDrawer v-model="open1" title="Basic Drawer">
    <p>This is the drawer content. Any HTML or Vue components can go here.</p>
    <p style="margin-top: 12px; color: #6b7280; font-size: 14px;">
      Press ESC or click the backdrop to close.
    </p>
  </AtomDrawer>
</DemoBlock>

---

## Placement

<DemoBlock title="Placement" :code="placementCode">
  <div style="display: flex; gap: 10px; flex-wrap: wrap;">
    <AtomButton @click="open2 = true">Right ▶</AtomButton>
    <AtomButton variant="secondary" @click="open3 = true">◀ Left</AtomButton>
    <AtomButton variant="outline" @click="open4 = true">▲ Top</AtomButton>
    <AtomButton variant="ghost" @click="open5 = true">▼ Bottom</AtomButton>
  </div>

<AtomDrawer v-model="open2" placement="right"  title="Right Drawer">Slides from the right.</AtomDrawer>
<AtomDrawer v-model="open3" placement="left"   title="Left Drawer">Slides from the left.</AtomDrawer>
<AtomDrawer v-model="open4" placement="top"    title="Top Drawer" size="sm">Slides from the top.</AtomDrawer>
<AtomDrawer v-model="open5" placement="bottom" title="Bottom Drawer" size="sm">Slides from the bottom.</AtomDrawer>
</DemoBlock>

---

## With Footer

<DemoBlock title="Header + Footer" :code="footerCode">
  <AtomButton @click="open6 = true">Open with Footer</AtomButton>
  <AtomDrawer v-model="open6" title="Edit User">
    <p>Place a form or any content here.</p>
    <template #footer>
      <AtomButton variant="secondary" @click="open6 = false">Cancel</AtomButton>
      <AtomButton @click="open6 = false">Save Changes</AtomButton>
    </template>
  </AtomDrawer>
</DemoBlock>

---

## Props

| Prop             | Type                                     | Default   | Description                            |
| ---------------- | ---------------------------------------- | --------- | -------------------------------------- |
| `modelValue`     | `boolean`                                | `false`   | Open/closed state (v-model)            |
| `title`          | `string`                                 | —         | Header title                           |
| `placement`      | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` | Which edge to slide from               |
| `size`           | `'sm' \| 'md' \| 'lg' \| 'full'`         | `'md'`    | Panel width (or height for top/bottom) |
| `closeable`      | `boolean`                                | `true`    | Show the close button                  |
| `mask`           | `boolean`                                | `true`    | Show the backdrop overlay              |
| `maskClosable`   | `boolean`                                | `true`    | Close on backdrop click                |
| `destroyOnClose` | `boolean`                                | `false`   | Unmount content when closed            |

---

## Emits

| Event               | Description              |
| ------------------- | ------------------------ |
| `update:modelValue` | v-model sync             |
| `open`              | Drawer started opening   |
| `close`             | Drawer started closing   |
| `afterOpen`         | Open animation finished  |
| `afterClose`        | Close animation finished |

---

## Slots

| Slot      | Description                          |
| --------- | ------------------------------------ |
| `default` | Main content                         |
| `header`  | Custom header (overrides title prop) |
| `footer`  | Footer area (action buttons, etc.)   |
