// src/components/AtomButton/types.ts

export interface AtomButtonProps {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "warning"
    | "success"
    | "info";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  loading?: boolean;
  block?: boolean;
  to?: string;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  htmlType?: "button" | "submit" | "reset";
}
