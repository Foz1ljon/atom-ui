# Установка

## Требования

- **Node.js** 16.0.0 и выше
- **Vue** 3.0.0 и выше

## Установка

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

## Подключение

### Полное подключение

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

### Подключение отдельных компонентов

```ts
// main.ts
import { createApp } from "vue";
import { AtomButton, AtomInput, AtomTabs, AtomModal } from "atomui-vue3";
import "atomui-vue3/style.css";
import App from "./App.vue";

const app = createApp(App);
app.component("AtomButton", AtomButton);
app.component("AtomInput", AtomInput);
app.component("AtomTabs", AtomTabs);
app.component("AtomModal", AtomModal);
app.mount("#app");
```

## Использование с Vite

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
});
```

## Готово!

Установка завершена. Теперь можно использовать компоненты:

```vue
<template>
  <AtomButton>Привет, Atom UI!</AtomButton>
</template>
```
