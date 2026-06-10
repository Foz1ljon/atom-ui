# AtomAvatar

<script setup lang="ts">
import DemoBlock from "./DemoBlock.vue";
import { AtomAvatar } from "atom-ui-vue";
import "atom-ui-vue/style.css";

const basicCode = `<AtomAvatar initials="JD" />`;
const imgCode = `<AtomAvatar src="https://i.pravatar.cc/100" alt="User avatar" />`;

const sizesCode = `<AtomAvatar size="xs" initials="A" />
<AtomAvatar size="sm" initials="B" />
<AtomAvatar size="md" initials="JD" />
<AtomAvatar size="lg" initials="MK" />
<AtomAvatar size="xl" initials="FK" />`;

const shapesCode = `<AtomAvatar shape="circle" initials="JD" />
<AtomAvatar shape="square" initials="JD" />`;

const statusCode = `<AtomAvatar initials="JD" status="online" />
<AtomAvatar initials="AB" status="busy" />
<AtomAvatar initials="CD" status="away" />
<AtomAvatar initials="EF" status="offline" />`;

const colorCode = `<AtomAvatar initials="JD" color="#8b5cf6" />
<AtomAvatar initials="AB" color="#0891b2" />
<AtomAvatar initials="CD" color="#16a34a" />`;

const fallbackCode = `<!-- Falls back to initials when image fails to load -->
<AtomAvatar src="broken-url.jpg" initials="JD" />

<!-- Falls back to placeholder icon when neither src nor initials provided -->
<AtomAvatar />`;
</script>

`AtomAvatar` displays a user image, initials, or a placeholder icon. Automatically falls back to initials when the image fails to load.

---

## Initials

<DemoBlock title="Initials" :code="basicCode">
  <AtomAvatar initials="JD" />
</DemoBlock>

---

## Image

<DemoBlock title="With Image" :code="imgCode">
  <AtomAvatar src="https://i.pravatar.cc/100" alt="User avatar" />
</DemoBlock>

---

## Sizes

<DemoBlock title="Sizes" :code="sizesCode">
  <div style="display: flex; gap: 12px; align-items: center;">
    <AtomAvatar size="xs" initials="A" />
    <AtomAvatar size="sm" initials="B" />
    <AtomAvatar size="md" initials="JD" />
    <AtomAvatar size="lg" initials="MK" />
    <AtomAvatar size="xl" initials="FK" />
  </div>
</DemoBlock>

---

## Shapes

<DemoBlock title="Circle & Square" :code="shapesCode">
  <div style="display: flex; gap: 16px; align-items: center;">
    <AtomAvatar shape="circle" initials="JD" />
    <AtomAvatar shape="square" initials="JD" />
  </div>
</DemoBlock>

---

## Status Dot

<DemoBlock title="Status" :code="statusCode">
  <div style="display: flex; gap: 16px; align-items: center;">
    <AtomAvatar initials="JD" status="online" />
    <AtomAvatar initials="AB" status="busy" />
    <AtomAvatar initials="CD" status="away" />
    <AtomAvatar initials="EF" status="offline" />
  </div>
</DemoBlock>

---

## Custom Color

<DemoBlock title="Custom Background" :code="colorCode">
  <div style="display: flex; gap: 12px; align-items: center;">
    <AtomAvatar initials="JD" color="#8b5cf6" />
    <AtomAvatar initials="AB" color="#0891b2" />
    <AtomAvatar initials="CD" color="#16a34a" />
  </div>
</DemoBlock>

---

## Fallback Behavior

<DemoBlock title="Fallback" :code="fallbackCode">
  <div style="display: flex; gap: 12px; align-items: center;">
    <AtomAvatar src="broken-url.jpg" initials="JD" />
    <AtomAvatar />
  </div>
</DemoBlock>

---

## Props

| Prop       | Type                                        | Default    | Description                          |
| ---------- | ------------------------------------------- | ---------- | ------------------------------------ |
| `src`      | `string`                                    | —          | Image URL                            |
| `alt`      | `string`                                    | —          | Image alt text                       |
| `initials` | `string`                                    | —          | 1–2 character fallback text          |
| `size`     | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`      | `'md'`     | Avatar size                          |
| `shape`    | `'circle' \| 'square'`                      | `'circle'` | Shape                                |
| `status`   | `'online' \| 'offline' \| 'busy' \| 'away'` | —          | Status indicator dot                 |
| `color`    | `string`                                    | —          | Custom background color for initials |

---

## Slots

| Slot      | Description                       |
| --------- | --------------------------------- |
| `default` | Fully replaces the avatar content |
