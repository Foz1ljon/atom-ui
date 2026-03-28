import type { App } from "vue";
import { AtomButton } from "./components/AtomButton/";

export * from "./components/AtomButton";

export const install = (app: App) => {
  app.component("AtomButton", AtomButton);
};

export default { install };
