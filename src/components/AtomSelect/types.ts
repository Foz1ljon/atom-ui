export type AtomSelectSize = "sm" | "md" | "lg";

export interface AtomSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface AtomSelectProps {
  modelValue?: string | number | (string | number)[] | null;
  options?: AtomSelectOption[];
  size?: AtomSelectSize;
  placeholder?: string;
  label?: string;
  hint?: string;
  disabled?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  multiple?: boolean;
  error?: boolean;
  errorMessage?: string;
  noDataText?: string;
}

export interface AtomSelectEmits {
  (e: "update:modelValue", value: string | number | (string | number)[] | null): void;
  (e: "change", value: string | number | (string | number)[] | null): void;
  (e: "clear"): void;
  (e: "focus"): void;
  (e: "blur"): void;
}
