export interface AtomCheckBoxProps {
  modelValue?: boolean;
  label?: string;
  disabled?: boolean;
}

export interface AtomCheckBoxEmits {
  (e: "update:modelValue", value: boolean): void;
  (e: "change", value: boolean): void;
}
