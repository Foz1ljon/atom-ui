export type AtomInputType = "text" | "password" | "email" | "number" | "search" | "tel" | "url";
export type AtomInputSize = "sm" | "md" | "lg";

export interface AtomInputProps {
  modelValue?: string | number;
  type?: AtomInputType;
  size?: AtomInputSize;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  showPassword?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  hint?: string;
  maxlength?: number;
  showCount?: boolean;
}

export interface AtomInputEmits {
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
  (e: "blur", event: FocusEvent): void;
  (e: "focus", event: FocusEvent): void;
  (e: "clear"): void;
  (e: "keydown", event: KeyboardEvent): void;
  (e: "keyup", event: KeyboardEvent): void;
}
