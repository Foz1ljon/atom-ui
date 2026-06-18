export type AtomModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface AtomModalProps {
  modelValue?: boolean;
  title?: string;
  size?: AtomModalSize;
  closeable?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  closeOnEsc?: boolean;
  destroyOnClose?: boolean;
  centered?: boolean;
}

export interface AtomModalEmits {
  (e: "update:modelValue", value: boolean): void;
  (e: "open"): void;
  (e: "close"): void;
  (e: "afterOpen"): void;
  (e: "afterClose"): void;
}
