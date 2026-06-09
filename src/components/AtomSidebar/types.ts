export interface AtomSidebarItemOption {
  key: string;
  label: string;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
  children?: Omit<AtomSidebarItemOption, "children">[];
}

export interface AtomSidebarProps {
  modelValue?: boolean;
  width?: string;
  collapsedWidth?: string;
  activeKey?: string;
  items?: AtomSidebarItemOption[];
  bordered?: boolean;
}

export interface AtomSidebarEmits {
  (e: "update:modelValue", val: boolean): void;
  (e: "update:activeKey", key: string): void;
  (e: "select", key: string): void;
}

export interface AtomSidebarItemProps {
  item: AtomSidebarItemOption;
  active?: boolean;
  collapsed?: boolean;
  depth?: number;
}

export interface AtomSidebarItemEmits {
  (e: "select", key: string): void;
}
