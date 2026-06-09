export type AtomSpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AtomSpinnerVariant = "primary" | "secondary" | "success" | "warning" | "danger" | "white";

export interface AtomSpinnerProps {
  size?: AtomSpinnerSize;
  variant?: AtomSpinnerVariant;
  label?: string;
}
