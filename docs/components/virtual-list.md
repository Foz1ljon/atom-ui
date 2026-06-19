<script setup>
import { ref } from 'vue'

const bigList = ref(
  Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: `Item #${i + 1}`,
  }))
)
</script>

# Virtual List

Renders only the rows visible in the viewport, so lists with tens of thousands
of items scroll smoothly. Use a fixed `itemHeight` and provide your row markup
through the default slot.

## 10,000 rows

<DemoBlock>
  <AtomVirtualList :items="bigList" :item-height="44" :height="300" key-field="id" style="border:1px solid #eee;border-radius:8px">
    <template #default="{ item, index }">
      <div style="display:flex;align-items:center;gap:12px;padding:0 16px;height:100%;border-bottom:1px solid #f1f1f1">
        <span style="color:#aaa;width:56px">{{ index }}</span>
        <span>{{ item.name }}</span>
      </div>
    </template>
  </AtomVirtualList>
  <template #code>

```vue
<script setup>
import { ref } from 'vue'
const bigList = ref(
  Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Item #${i + 1}` }))
)
</script>

<template>
  <AtomVirtualList :items="bigList" :item-height="44" :height="300" key-field="id">
    <template #default="{ item, index }">
      <div class="row">{{ index }} — {{ item.name }}</div>
    </template>
  </AtomVirtualList>
</template>
```

  </template>
</DemoBlock>

## Props

| Prop         | Type               | Default | Description                                         |
| ------------ | ------------------ | ------- | --------------------------------------------------- |
| `items`      | `T[]`              | required| Full data set                                       |
| `itemHeight` | `number`           | required| Fixed pixel height of every row                     |
| `height`     | `number \| string` | `320`   | Scroll container height                             |
| `buffer`     | `number`           | `4`     | Extra rows rendered above/below the viewport        |
| `keyField`   | `string`           | `''`    | Item field used as `:key` (falls back to index)     |

## Slots

| Slot      | Props            | Description           |
| --------- | ---------------- | --------------------- |
| `default` | `{ item, index }`| Markup for one row    |

## Emits

| Event          | Payload     | Description                         |
| -------------- | ----------- | ----------------------------------- |
| `scroll`       | `scrollTop` | Fired while scrolling               |
| `reach-bottom` | —           | Fired when scrolled to the end      |

## Exposed methods

| Method                 | Description                          |
| ---------------------- | ------------------------------------ |
| `scrollToIndex(index)` | Scroll a given item index into view  |
