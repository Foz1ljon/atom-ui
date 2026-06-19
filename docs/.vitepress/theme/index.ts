import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { install, AtomMessage } from "atom-ui-vue";
import "atom-ui-vue/style.css";
import DemoBlock from "../../components/DemoBlock.vue";

export default {
  extends: DefaultTheme,
  Layout() {
    // Mount the global message host once so useMessage() toasts render.
    return h(DefaultTheme.Layout, null, {
      "layout-bottom": () => h(AtomMessage),
    });
  },
  enhanceApp({ app }) {
    install(app);
    app.component("DemoBlock", DemoBlock);
  },
} satisfies Theme;
