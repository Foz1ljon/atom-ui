# AtomEditor

<script setup lang="ts">
import { ref } from "vue";
import DemoBlock from "./DemoBlock.vue";
import { AtomEditor } from "atom-ui-vue";
import "atom-ui-vue/style.css";

const c1 = ref("<p>Start typing here...</p>");
const c2 = ref("");
const c3 = ref("");

const basicCode = `<AtomEditor v-model="content" />`;

const labelCode = `<AtomEditor
  v-model="content"
  label="Article Body"
  hint="Content is saved as HTML"
  placeholder="Write your article..."
/>`;

const outputCode = `<AtomEditor v-model="html" />

<!-- Render the HTML output -->
<div v-html="html" class="preview" />`;

const heightCode = `<AtomEditor
  v-model="content"
  min-height="400px"
  max-height="700px"
/>`;
</script>

`AtomEditor` is a full-featured WYSIWYG rich text editor. It returns content as **HTML** via `v-model`, making it ready to store in a database and render with `v-html`.

---

## Basic

<DemoBlock title="Basic Editor" :code="basicCode">
  <AtomEditor v-model="c1" />
</DemoBlock>

---

## Label & Hint

<DemoBlock title="Label & Hint" :code="labelCode">
  <AtomEditor
    v-model="c2"
    label="Article Body"
    hint="Content is saved as HTML"
    placeholder="Write your article..."
  />
</DemoBlock>

---

## Live HTML Output

<DemoBlock title="Editor + Preview" :code="outputCode">
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
    <div>
      <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px; color: #374151;">Editor</div>
      <AtomEditor v-model="c3" :show-word-count="false" />
    </div>
    <div>
      <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px; color: #374151;">HTML Output</div>
      <div
        style="border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; min-height: 100px; font-size: 14px; line-height: 1.7;"
        v-html="c3 || '<span style=\'color:#9ca3af\'>Output will appear here</span>'"
      />
    </div>
  </div>
</DemoBlock>

---

## Toolbar Reference

| Group          | Buttons                                                         |
| -------------- | --------------------------------------------------------------- |
| **History**    | ↩ Undo `Ctrl+Z`, ↪ Redo `Ctrl+Y`                                |
| **Block**      | Paragraph, H1, H2, H3, H4, Blockquote (dropdown)                |
| **Formatting** | **B** Bold, _I_ Italic, <u>U</u> Underline, ~~S~~ Strikethrough |
| **Lists**      | • Unordered list, 1. Ordered list                               |
| **Alignment**  | Left, Center, Right, Justify                                    |
| **Insert**     | 🔗 Link, ✂️ Unlink, 🖼 Image, `{}` Code block, — Divider        |
| **Source**     | `</>` Toggle raw HTML view                                      |

---

## Props

| Prop            | Type      | Default             | Description                        |
| --------------- | --------- | ------------------- | ---------------------------------- |
| `modelValue`    | `string`  | `''`                | HTML content (v-model)             |
| `placeholder`   | `string`  | `'Start typing...'` | Placeholder shown when empty       |
| `label`         | `string`  | —                   | Field label                        |
| `hint`          | `string`  | —                   | Helper text below the editor       |
| `minHeight`     | `string`  | `'200px'`           | Minimum editor height              |
| `maxHeight`     | `string`  | `'600px'`           | Maximum editor height (scrollable) |
| `disabled`      | `boolean` | `false`             | Disable all editing                |
| `readonly`      | `boolean` | `false`             | Read-only mode                     |
| `error`         | `boolean` | `false`             | Error state styling                |
| `errorMessage`  | `string`  | —                   | Error message text                 |
| `showWordCount` | `boolean` | `true`              | Word and character counter         |
| `showSource`    | `boolean` | `true`              | Show the HTML source toggle        |

---

## Emits

| Event               | Payload        | Description                    |
| ------------------- | -------------- | ------------------------------ |
| `update:modelValue` | `html: string` | HTML content updated (v-model) |
| `change`            | `html: string` | Content changed                |
| `focus`             | `FocusEvent`   | Editor received focus          |
| `blur`              | `FocusEvent`   | Editor lost focus              |

---

## Usage Example

```vue
<script setup lang="ts">
  import { ref } from "vue";
  import { AtomEditor } from "atom-ui-vue";
  import "atom-ui-vue/style.css";

  const body = ref("");

  async function publish() {
    // body.value contains the full HTML string
    await api.post("/posts", { body: body.value });
  }
</script>

<template>
  <AtomEditor v-model="body" label="Post Content" placeholder="Write your post..." min-height="300px" />
  <AtomButton @click="publish">Publish</AtomButton>
</template>
```

---

## Notes

- Content is persisted as raw HTML — sanitize it server-side before rendering to untrusted audiences.
- The toolbar uses `document.execCommand` internally, which is broadly supported but marked as deprecated in the spec. A future version will migrate to the Selection API.
- Tab key inside the editor inserts 4 spaces instead of moving focus.
