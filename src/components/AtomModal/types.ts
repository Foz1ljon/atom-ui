export type ModalSize = "sm" | "md" | "lg" | "xl";

export interface BaseModalProps {
  modelValue: boolean;
  title?: string;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;
}

export interface BaseModalEmits {
  (e: "update:modelValue", value: boolean): void;
  (e: "close"): void;
}
