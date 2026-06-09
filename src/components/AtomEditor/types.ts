export interface AtomEditorProps {
  modelValue?: string;
  placeholder?: string;
  label?: string;
  hint?: string;
  minHeight?: string;
  maxHeight?: string;
  disabled?: boolean;
  readonly?: boolean;
  error?: boolean;
  errorMessage?: string;
  showWordCount?: boolean;
  showSource?: boolean;
}

export interface AtomEditorEmits {
  (e: "update:modelValue", value: string): void;
  (e: "change", value: string): void;
  (e: "focus", event: FocusEvent): void;
  (e: "blur", event: FocusEvent): void;
}
