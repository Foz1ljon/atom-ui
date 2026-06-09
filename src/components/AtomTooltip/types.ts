export type AtomTooltipPlacement =
  | "top" | "top-start" | "top-end"
  | "bottom" | "bottom-start" | "bottom-end"
  | "left" | "left-start" | "left-end"
  | "right" | "right-start" | "right-end";

export type AtomTooltipTrigger = "hover" | "click" | "focus" | "manual";

export interface AtomTooltipProps {
  content?: string;
  placement?: AtomTooltipPlacement;
  trigger?: AtomTooltipTrigger;
  disabled?: boolean;
  delay?: number;
  maxWidth?: string;
  theme?: "dark" | "light";
  arrow?: boolean;
}

export interface AtomTooltipEmits {
  (e: "show"): void;
  (e: "hide"): void;
}
