export type AtomDrawerPlacement = "left" | "right" | "top" | "bottom";
export type AtomDrawerSize = "sm" | "md" | "lg" | "full";

export interface AtomDrawerProps {
  modelValue?: boolean;
  title?: string;
  placement?: AtomDrawerPlacement;
  size?: AtomDrawerSize;
  closeable?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  /** Allow closing by swiping the panel toward its edge on touch devices. */
  swipeToClose?: boolean;
}

export interface AtomDrawerEmits {
  (e: "update:modelValue", value: boolean): void;
  (e: "open"): void;
  (e: "close"): void;
  (e: "afterOpen"): void;
  (e: "afterClose"): void;
}
