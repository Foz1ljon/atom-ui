export type AtomBadgeVariant = "primary" | "secondary" | "success" | "warning" | "danger" | "info";
export type AtomBadgeSize = "sm" | "md" | "lg";

export interface AtomBadgeProps {
  variant?: AtomBadgeVariant;
  size?: AtomBadgeSize;
  dot?: boolean;
  pill?: boolean;
  outline?: boolean;
}
