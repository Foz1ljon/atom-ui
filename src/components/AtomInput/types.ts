// src/components/AtomInput/types.ts
export interface AtomInputProps {
  modelValue?: string | number;
  label?: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number" | "tel" | "url" | "search";
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  error?: string;
  hint?: string;
  size?: "sm" | "md" | "lg";
  block?: boolean;
}
