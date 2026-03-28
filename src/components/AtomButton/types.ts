import type { ButtonHTMLAttributes, VNode } from "vue";

export type AtomButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

export type AtomButtonSize = "sm" | "md" | "lg";
export type AtomButtonRounded = "sm" | "md" | "lg" | "full";

export interface AtomButtonProps {
  variant?: AtomButtonVariant;
  size?: AtomButtonSize;
  rounded?: AtomButtonRounded;
  block?: boolean;
  disabled?: boolean;
  loading?: boolean;
  ripple?: boolean;
  htmlType?: ButtonHTMLAttributes["type"];
}

export interface AtomButtonEmits {
  (e: "click", event: MouseEvent): void;
}

export interface AtomButtonSlots {
  default?: () => VNode[];
  iconLeft?: () => VNode[];
  iconRight?: () => VNode[];
  loader?: () => VNode[];
}
