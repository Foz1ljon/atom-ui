# O'rnatish

## Talablar

- **Node.js** 16.0.0 va undan yuqori
- **Vue** 3.0.0 va undan yuqori

## O'rnatish

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

## Ulash

### To'liq ulash

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

### Alohida komponentlarni ulash

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

## Vite bilan ishlatish

```ts
// vite.config.ts
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
});
```

## Tayyor!

O'rnatish muvaffaqiyatli tugadi. Endi komponentlardan foydalanishingiz mumkin:

```vue
<template>
  <AtomButton>Salom Atom UI!</AtomButton>
</template>
```
