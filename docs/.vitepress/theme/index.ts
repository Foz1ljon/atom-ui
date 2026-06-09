import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { install } from "atomui-vue3";
import "atomui-vue3/style.css";
import DemoBlock from "../../components/DemoBlock.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    install(app);
    app.component("DemoBlock", DemoBlock);
  },
} satisfies Theme;
