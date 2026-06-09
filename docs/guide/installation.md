# Installation

## Requirements

- **Node.js** >= 16.0.0
- **Vue** >= 3.0.0

---

## Install the Package

::: code-group

```bash [pnpm]
pnpm add atomui-vue3
```

```bash [npm]
npm install atomui-vue3
```

```bash [yarn]
yarn add atomui-vue3
```

:::

---

## Global Registration

Register all components at once using the Vue plugin:

```ts
// main.ts
import { createApp } from "vue";
import AtomUI from "atomui-vue3";
import "atomui-vue3/style.css";
import App from "./App.vue";

const app = createApp(App);
app.use(AtomUI);
app.mount("#app");
```

---

## Individual Registration

Import only the components you need for the smallest possible bundle:

```ts
// main.ts
import { createApp } from "vue";
import { AtomButton, AtomInput, AtomSelect } from "atomui-vue3";
import "atomui-vue3/style.css";
import App from "./App.vue";

const app = createApp(App);
app.component("AtomButton", AtomButton);
app.component("AtomInput", AtomInput);
app.component("AtomSelect", AtomSelect);
app.mount("#app");
```

---

## Import on Demand (Recommended)

Import directly in your components for the best tree-shaking:

```vue
<script setup lang="ts">
import { AtomButton, AtomInput } from "atomui-vue3";
import "atomui-vue3/style.css";
</script>

<template>
  <AtomInput v-model="name" placeholder="Your name" />
  <AtomButton @click="submit">Submit</AtomButton>
</template>
```

---

## Vite Configuration

No special configuration needed. Atom UI works out of the box with Vite:

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
});
```

---

## You're Ready

Start using components immediately:

```vue
<template>
  <AtomButton variant="primary">Hello, Atom UI!</AtomButton>
</template>
```
