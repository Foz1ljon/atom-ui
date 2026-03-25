<div align="center">
  <img src="docs/public/logo.svg" width="80" height="80" alt="Atom UI Logo" />
  <h1>Atom UI</h1>
  <p>A lightweight, fast and fully customizable Vue 3 component library</p>

  <p>
    <a href="https://www.npmjs.com/package/atomui-vue3">
      <img src="https://img.shields.io/npm/v/atomui-vue3?color=6366f1" />
    </a>
    <a href="./LICENSE">
      <img src="https://img.shields.io/npm/l/atomui-vue3?color=6366f1" />
    </a>
    <img src="https://img.shields.io/badge/Vue-3.x-42b883" />
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178c6" />
  </p>
</div>

---

## ✨ Introduction

**Atom UI** is a lightweight, fast, and reusable component library built specifically for Vue 3.

It is designed to provide **maximum control, performance, and flexibility** without the overhead of large UI frameworks.

Unlike traditional UI libraries, Atom UI focuses on:

- Minimal bundle size
- Simple and predictable API
- Full customization freedom
- High performance

---

## 🚀 Features

- 🧩 **Reusable Components** — build once, use everywhere
- ⚡ **Lightweight & Fast** — optimized for performance
- 🎨 **Fully Customizable** — TailwindCSS-friendly structure
- 🧠 **Developer Friendly** — clean API with clear props & slots
- 📦 **Tree-shakable** — only used components are bundled
- 🔒 **TypeScript Support** — strong type safety

---

## 📦 Installation

```bash
pnpm add atomui-vue3
# or
npm install atomui-vue3
# or
yarn add atomui-vue3
```

---

## ⚙️ Setup

```ts
import { createApp } from "vue";
import AtomUI from "atomui-vue3";
import "atomui-vue3/style.css";
import App from "./App.vue";

const app = createApp(App);

app.use(AtomUI);
app.mount("#app");
```

---

## 🧪 Usage

```vue
<template>
  <AtomButton variant="primary">Hello!</AtomButton>
  <AtomInput v-model="value" placeholder="Type something..." />
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const value = ref("");
</script>
```

---

## 📖 Documentation

👉 Full documentation available here:
🔗 https://atomui-vue.netlify.app/

---

## 🛠 Use Cases

Atom UI is ideal for:

- Admin dashboards
- SaaS platforms
- CRM / ERP systems
- POS applications
- Custom business tools

---

## 🤝 Contributing

Contributions, issues and feature requests are welcome!

👉 GitHub:
https://github.com/Foz1ljon/atom-ui

---

## 📄 License

MIT © 2026 Foz1ljon
