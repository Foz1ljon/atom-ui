export type AtomCheckboxSize = "sm" | "md" | "lg";

export interface AtomCheckboxProps {
  modelValue?: boolean | (string | number)[];
  value?: string | number;
  label?: string;
  size?: AtomCheckboxSize;
  disabled?: boolean;
  indeterminate?: boolean;
}

export interface AtomCheckboxEmits {
  (e: "update:modelValue", val: boolean | (string | number)[]): void;
  (e: "change", val: boolean | (string | number)[]): void;
}

export interface AtomCheckboxGroupProps {
  modelValue?: (string | number)[];
  disabled?: boolean;
  size?: AtomCheckboxSize;
  vertical?: boolean;
}

export interface AtomCheckboxGroupEmits {
  (e: "update:modelValue", val: (string | number)[]): void;
  (e: "change", val: (string | number)[]): void;
}
