export type AtomRadioSize = "sm" | "md" | "lg";

export interface AtomRadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface AtomRadioProps {
  modelValue?: string | number | boolean;
  value?: string | number | boolean;
  label?: string;
  size?: AtomRadioSize;
  disabled?: boolean;
}

export interface AtomRadioEmits {
  (e: "update:modelValue", val: string | number | boolean): void;
  (e: "change", val: string | number | boolean): void;
}

export interface AtomRadioGroupProps {
  modelValue?: string | number;
  options?: AtomRadioOption[];
  size?: AtomRadioSize;
  disabled?: boolean;
  vertical?: boolean;
  buttonStyle?: boolean;
}

export interface AtomRadioGroupEmits {
  (e: "update:modelValue", val: string | number): void;
  (e: "change", val: string | number): void;
}
