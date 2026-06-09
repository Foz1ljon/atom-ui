export type AtomCardShadow = "none" | "sm" | "md" | "lg";
export type AtomCardPadding = "none" | "sm" | "md" | "lg";

export interface AtomCardProps {
  shadow?: AtomCardShadow;
  padding?: AtomCardPadding;
  bordered?: boolean;
  hoverable?: boolean;
  radius?: "sm" | "md" | "lg";
}
