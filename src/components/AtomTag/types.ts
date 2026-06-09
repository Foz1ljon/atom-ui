export type AtomTagVariant = "primary" | "secondary" | "success" | "warning" | "danger" | "info";
export type AtomTagSize = "sm" | "md" | "lg";

export interface AtomTagProps {
  variant?: AtomTagVariant;
  size?: AtomTagSize;
  closeable?: boolean;
  outline?: boolean;
  pill?: boolean;
  disabled?: boolean;
}

export interface AtomTagEmits {
  (e: "close"): void;
}
