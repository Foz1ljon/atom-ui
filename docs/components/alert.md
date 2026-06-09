# AtomAlert

<script setup lang="ts">
import DemoBlock from "./DemoBlock.vue";
import { AtomAlert } from "atomui-vue3";
import "atomui-vue3/style.css";

const variantsCode = `<AtomAlert variant="info"    title="Information" />
<AtomAlert variant="success" title="Success!" />
<AtomAlert variant="warning" title="Warning" />
<AtomAlert variant="danger"  title="Error occurred" />`;

const contentCode = `<AtomAlert variant="success" title="Changes saved">
  Your profile has been updated successfully.
</AtomAlert>`;

const closeableCode = `<AtomAlert variant="info" title="New update available" closeable>
  Version 1.2.0 is now available. Refresh to update.
</AtomAlert>`;

const noIconCode = `<AtomAlert variant="warning" title="Note" :show-icon="false">
  This alert has no icon.
</AtomAlert>`;

const customIconCode = `<AtomAlert variant="danger" title="Access Denied">
  <template #icon>🚫</template>
  You do not have permission to view this page.
</AtomAlert>`;
</script>

`AtomAlert` is a contextual feedback message component for user notifications. Supports four semantic variants, optional dismiss button, and customizable icon slot.

---

## Variants

<DemoBlock title="Variants" :code="variantsCode">
  <div style="display: flex; flex-direction: column; gap: 10px;">
    <AtomAlert variant="info"    title="Information" />
    <AtomAlert variant="success" title="Success!" />
    <AtomAlert variant="warning" title="Warning" />
    <AtomAlert variant="danger"  title="Error occurred" />
  </div>
</DemoBlock>

---

## With Content

<DemoBlock title="With Description" :code="contentCode">
  <AtomAlert variant="success" title="Changes saved">
    Your profile has been updated successfully.
  </AtomAlert>
</DemoBlock>

---

## Dismissible

<DemoBlock title="Closeable" :code="closeableCode">
  <AtomAlert variant="info" title="New update available" closeable>
    Version 1.2.0 is now available. Refresh to update.
  </AtomAlert>
</DemoBlock>

---

## Without Icon

<DemoBlock title="No Icon" :code="noIconCode">
  <AtomAlert variant="warning" title="Note" :show-icon="false">
    This alert has no icon.
  </AtomAlert>
</DemoBlock>

---

## Custom Icon

<DemoBlock title="Custom Icon Slot" :code="customIconCode">
  <AtomAlert variant="danger" title="Access Denied">
    <template #icon>🚫</template>
    You do not have permission to view this page.
  </AtomAlert>
</DemoBlock>

---

## Props

| Prop        | Type                                             | Default  | Description                      |
| ----------- | ------------------------------------------------ | -------- | -------------------------------- |
| `variant`   | `'info' \| 'success' \| 'warning' \| 'danger'`  | `'info'` | Semantic color variant           |
| `title`     | `string`                                         | —        | Alert title text                 |
| `closeable` | `boolean`                                        | `false`  | Show dismiss button              |
| `showIcon`  | `boolean`                                        | `true`   | Show the leading icon            |

---

## Emits

| Event   | Description               |
| ------- | ------------------------- |
| `close` | Dismiss button clicked    |

---

## Slots

| Slot      | Description                       |
| --------- | --------------------------------- |
| `default` | Alert description text            |
| `title`   | Custom title (overrides prop)     |
| `icon`    | Custom icon                       |
