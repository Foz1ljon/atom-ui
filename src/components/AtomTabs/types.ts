export interface BaseTabsProps {
  modelValue: string | number;
}

export interface BaseTabsEmits {
  (e: "update:modelValue", value: string | number): void;
}

export interface TabItem {
  label: string;
  value: string | number;
  disabled?: boolean;
}
