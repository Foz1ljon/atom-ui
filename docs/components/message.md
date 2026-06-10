<script setup>
import { ref } from 'vue'
import { useMessage } from 'atomui-vue3'

const msg = useMessage()
const loadId = ref(null)

function startLoad() {
  loadId.value = msg.info('Loading data...', 0)
}
function finishLoad() {
  if (loadId.value !== null) {
    msg.remove(loadId.value)
    msg.success('Data loaded successfully!')
    loadId.value = null
  }
}
</script>

# Message

Global toast notifications via `useMessage()`. Place `<AtomMessage />` once in your `App.vue`.

## Setup

```vue
<!-- App.vue -->
<template>
  <RouterView />
  <AtomMessage />
</template>
```

## All Types

<DemoBlock>
  <div style="display:flex;gap:10px;flex-wrap:wrap">
    <AtomButton @click="msg.info('This is an info message')">Info</AtomButton>
    <AtomButton variant="success" @click="msg.success('Operation completed!')">Success</AtomButton>
    <AtomButton variant="warning" @click="msg.warning('Please check your input')">Warning</AtomButton>
    <AtomButton variant="danger"  @click="msg.error('Something went wrong')">Error</AtomButton>
  </div>
  <template #code>

```vue
<script setup>
  import { useMessage } from "atomui-vue3";
  const msg = useMessage();
</script>
<template>
  <AtomButton @click="msg.info('Info message')">Info</AtomButton>
  <AtomButton @click="msg.success('Success!')">Success</AtomButton>
  <AtomButton @click="msg.warning('Warning')">Warning</AtomButton>
  <AtomButton @click="msg.error('Error')">Error</AtomButton>
</template>
```

  </template>
</DemoBlock>

## Custom Duration

<DemoBlock>
  <div style="display:flex;gap:10px;flex-wrap:wrap">
    <AtomButton variant="secondary" @click="msg.info('1 second', 1000)">1s</AtomButton>
    <AtomButton variant="secondary" @click="msg.success('8 seconds', 8000)">8s</AtomButton>
    <AtomButton variant="secondary" @click="msg.warning('Stays until closed', 0)">Persistent</AtomButton>
    <AtomButton variant="danger"    @click="msg.clear()">Clear All</AtomButton>
  </div>
  <template #code>

```js
msg.info("1 second", 1000); // disappears after 1s
msg.warning("Stays until closed", 0); // must be closed manually
msg.clear(); // remove all messages
```

  </template>
</DemoBlock>

## Programmatic Control

<DemoBlock>
  <div style="display:flex;gap:10px">
    <AtomButton @click="startLoad">Start Loading</AtomButton>
    <AtomButton variant="success" @click="finishLoad">Done</AtomButton>
  </div>
  <template #code>

```js
const id = msg.info("Loading...", 0); // persistent
msg.remove(id); // remove by id
msg.success("Done!");
```

  </template>
</DemoBlock>

## `useMessage()` API

| Method                        | Returns  | Description        |
| ----------------------------- | -------- | ------------------ |
| `info(content, duration?)`    | `number` | Show info toast    |
| `success(content, duration?)` | `number` | Show success toast |
| `warning(content, duration?)` | `number` | Show warning toast |
| `error(content, duration?)`   | `number` | Show error toast   |
| `remove(id)`                  | `void`   | Remove by id       |
| `clear()`                     | `void`   | Remove all         |

Default duration: **3000ms**. Pass `0` for persistent.
