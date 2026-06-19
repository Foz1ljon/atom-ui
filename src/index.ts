import type { App } from "vue";
import "./styles/index.css";
import { AtomButton } from "./components/AtomButton/";
import { AtomInput } from "./components/AtomInput/";
import { AtomBadge } from "./components/AtomBadge/";
import { AtomAlert } from "./components/AtomAlert/";
import { AtomCard } from "./components/AtomCard/";
import { AtomSpinner } from "./components/AtomSpinner/";
import { AtomAvatar } from "./components/AtomAvatar/";
import { AtomTag } from "./components/AtomTag/";
import { AtomSelect } from "./components/AtomSelect/";
import { AtomDrawer } from "./components/AtomDrawer/";
import { AtomModal } from "./components/AtomModal/";
import { AtomEditor } from "./components/AtomEditor/";
import { AtomCheckbox, AtomCheckboxGroup } from "./components/AtomCheckbox/";
import { AtomRadio, AtomRadioGroup } from "./components/AtomRadio/";
import { AtomSkeleton } from "./components/AtomSkeleton/";
import { AtomTable } from "./components/AtomTable/";
import { AtomPagination } from "./components/AtomPagination/";
import { AtomSidebar, AtomSidebarItem } from "./components/AtomSidebar/";
import { AtomTooltip } from "./components/AtomTooltip/";
import { AtomMessage } from "./components/AtomMessage/";
import { AtomTextarea } from "./components/AtomTextarea/";
import { AtomFileUpload } from "./components/AtomFileUpload/";
import { AtomVirtualList } from "./components/AtomVirtualList/";
import { AtomNumberInput } from "./components/AtomNumberInput/";

export * from "./components/AtomButton";
export * from "./components/AtomInput";
export * from "./components/AtomBadge";
export * from "./components/AtomAlert";
export * from "./components/AtomCard";
export * from "./components/AtomSpinner";
export * from "./components/AtomAvatar";
export * from "./components/AtomTag";
export * from "./components/AtomSelect";
export * from "./components/AtomDrawer";
export * from "./components/AtomModal";
export * from "./components/AtomEditor";
export * from "./components/AtomCheckbox";
export * from "./components/AtomRadio";
export * from "./components/AtomSkeleton";
export * from "./components/AtomTable";
export * from "./components/AtomPagination";
export * from "./components/AtomSidebar";
export * from "./components/AtomTooltip";
export * from "./components/AtomMessage";
export * from "./components/AtomTextarea";
export * from "./components/AtomFileUpload";
export * from "./components/AtomVirtualList";
export * from "./components/AtomNumberInput";

// Composables
export * from "./composables";

export {
  AtomButton,
  AtomInput,
  AtomBadge,
  AtomAlert,
  AtomCard,
  AtomSpinner,
  AtomAvatar,
  AtomTag,
  AtomSelect,
  AtomDrawer,
  AtomModal,
  AtomEditor,
  AtomCheckbox,
  AtomCheckboxGroup,
  AtomRadio,
  AtomRadioGroup,
  AtomSkeleton,
  AtomTable,
  AtomPagination,
  AtomSidebar,
  AtomSidebarItem,
  AtomTooltip,
  AtomMessage,
  AtomTextarea,
  AtomFileUpload,
  AtomVirtualList,
  AtomNumberInput,
};

const components = [
  AtomButton,
  AtomInput,
  AtomBadge,
  AtomAlert,
  AtomCard,
  AtomSpinner,
  AtomAvatar,
  AtomTag,
  AtomSelect,
  AtomDrawer,
  AtomModal,
  AtomEditor,
  AtomCheckbox,
  AtomCheckboxGroup,
  AtomRadio,
  AtomRadioGroup,
  AtomSkeleton,
  AtomTable,
  AtomPagination,
  AtomSidebar,
  AtomSidebarItem,
  AtomTooltip,
  AtomMessage,
  AtomTextarea,
  AtomFileUpload,
  AtomVirtualList,
  AtomNumberInput,
];

export const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name!, component);
  });
};

export default { install };
