# Installation

## Requirements

- **Node.js** 16.0.0 or higher
- **Vue** 3.0.0 or higher

## Install

::: code-group

```bash [pnpm]
pnpm add @atomui-vue3/vue
```

```bash [npm]
npm install @atomui-vue3/vue
```

```bash [yarn]
yarn add @atomui-vue3/vue
```

:::

## Setup

### Full setup

```ts
// main.ts
import { createApp } from "vue";
import AtomUI from "@atomui-vue3/vue";
import "@atomui-vue3/vue/style.css";
import App from "./App.vue";

const app = createApp(App);
app.use(AtomUI);
app.mount("#app");
```

### Individual components

```ts
// main.ts
import { createApp } from "vue";
import { AtomButton, AtomInput, AtomTabs, AtomModal } from "@atomui-vue3/vue";
import "@atomui-vue3/vue/style.css";
import App from "./App.vue";

const app = createApp(App);
app.component("AtomButton", AtomButton);
app.component("AtomInput", AtomInput);
app.component("AtomTabs", AtomTabs);
app.component("AtomModal", AtomModal);
app.mount("#app");
```

## Usage with Vite

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
});
```

## You're all set!

Installation is complete. Start using components right away:

```vue
<template>
  <AtomButton>Hello, Atom UI!</AtomButton>
</template>
```
