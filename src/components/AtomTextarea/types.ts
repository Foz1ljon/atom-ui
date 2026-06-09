export type AtomTextareaSize = "sm" | "md" | "lg";
export type AtomTextareaResize = "none" | "vertical" | "horizontal" | "both";

export interface AtomTextareaProps {
  modelValue?: string;
  size?: AtomTextareaSize;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  hint?: string;
  rows?: number;
  maxlength?: number;
  showCount?: boolean;
  autosize?: boolean;
  minRows?: number;
  maxRows?: number;
  resize?: AtomTextareaResize;
}

export interface AtomTextareaEmits {
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
  (e: "blur", event: FocusEvent): void;
  (e: "focus", event: FocusEvent): void;
  (e: "keydown", event: KeyboardEvent): void;
  (e: "keyup", event: KeyboardEvent): void;
}
