export interface SidebarItem {
  label: string;
  key: string;
  icon?: any;
  children?: SidebarItem[];
}

export interface BaseSidebarProps {
  modelValue: boolean; // mobile open/close
  collapsed?: boolean; // desktop collapse
  items: SidebarItem[];
}
