export type AtomAlertVariant = "info" | "success" | "warning" | "danger";

export interface AtomAlertProps {
  variant?: AtomAlertVariant;
  title?: string;
  closeable?: boolean;
  showIcon?: boolean;
}

export interface AtomAlertEmits {
  (e: "close"): void;
}
