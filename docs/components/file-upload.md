<script setup>
import { ref } from 'vue'

const files = ref([])
const images = ref([])
</script>

# File Upload

Drag-and-drop file picker with validation, a text list or image-thumbnail grid,
and full touch support.

## Basic Usage

<DemoBlock>
  <AtomFileUpload v-model="files" multiple hint="PDF, DOCX yoki rasm — har biri 5MB gacha" />
  <template #code>

```vue
<script setup>
import { ref } from 'vue'
const files = ref([])
</script>

<template>
  <AtomFileUpload v-model="files" multiple hint="Max 5MB each" />
</template>
```

  </template>
</DemoBlock>

## Image Grid (`list-type="picture"`)

<DemoBlock>
  <AtomFileUpload
    v-model="images"
    multiple
    accept="image/*"
    list-type="picture"
    drop-text="Rasmlarni tashlang"
  />
  <template #code>

```vue
<AtomFileUpload
  v-model="images"
  multiple
  accept="image/*"
  list-type="picture"
/>
```

  </template>
</DemoBlock>

## Validation

Reject files over a size limit or beyond a maximum count — both emit events you can react to.

```vue
<AtomFileUpload
  v-model="files"
  multiple
  :max-size="5 * 1024 * 1024"
  :max-count="3"
  @exceed-size="(f) => msg.error(`${f.name} is too large`)"
  @exceed-count="() => msg.error('Too many files')"
/>
```

## Props

| Prop           | Type                   | Default                | Description                          |
| -------------- | ---------------------- | ---------------------- | ------------------------------------ |
| `modelValue`   | `File[]`               | `[]`                   | Selected files (v-model)             |
| `accept`       | `string`               | `''`                   | Native accept filter, e.g. `image/*` |
| `multiple`     | `boolean`              | `false`                | Allow selecting multiple files       |
| `disabled`     | `boolean`              | `false`                | Disable the picker                   |
| `maxSize`      | `number`               | `0`                    | Max bytes per file (`0` = no limit)  |
| `maxCount`     | `number`               | `0`                    | Max number of files (`0` = no limit) |
| `listType`     | `'text' \| 'picture'`  | `'text'`               | List style                           |
| `dropText`     | `string`               | `'Faylni…tanlang'`     | Drop-zone label                      |
| `hint`         | `string`               | `''`                   | Secondary hint text                  |
| `showFileList` | `boolean`              | `true`                 | Render the selected-files list       |

## Emits

| Event              | Payload          | Description                     |
| ------------------ | ---------------- | ------------------------------- |
| `update:modelValue`| `File[]`         | Files changed                   |
| `change`           | `File[]`         | Files changed                   |
| `remove`           | `(file, index)`  | A file was removed              |
| `exceed-size`      | `File`           | A file exceeded `maxSize`       |
| `exceed-count`     | `File[]`         | Selection exceeded `maxCount`   |
