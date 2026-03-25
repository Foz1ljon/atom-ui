import type { App } from "vue";
import "./styles/index.css";
import { AtomButton } from "./components/AtomButton/";
import { AtomInput } from "./components/AtomInput";
import { AtomModal } from "./components/AtomModal";
import { AtomTab, AtomTabs } from "./components/AtomTabs";
import { AtomSideBar, AtomSideBarItem } from "./components/AtomSideBar";
import { AtomBreadCrumbs } from "./components/AtomBreadCrumbs";
import { AtomCheckBox } from "./components/AtomCheckBox";

export * from "./components/AtomInput";
export * from "./components/AtomButton";
export * from "./components/AtomModal";
export * from "./components/AtomTabs";
export * from "./components/AtomSideBar";
export * from "./components/AtomBreadCrumbs";
export * from "./components/AtomCheckBox";

export const install = (app: App) => {
  app.component("AtomButton", AtomButton);
  app.component("AtomInput", AtomInput);
  app.component("AtomModal", AtomModal);
  app.component("AtomTabs", AtomTabs);
  app.component("AtomTab", AtomTab);
  app.component("AtomSideBar", AtomSideBar);
  app.component("AtomSideBarItem", AtomSideBarItem);
  app.component("AtomBreadCrumbs", AtomBreadCrumbs);
  app.component("AtomCheckBox", AtomCheckBox);
};

export default { install };
