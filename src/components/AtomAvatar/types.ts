export type AtomAvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AtomAvatarShape = "circle" | "square";
export type AtomAvatarStatus = "online" | "offline" | "busy" | "away";

export interface AtomAvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: AtomAvatarSize;
  shape?: AtomAvatarShape;
  status?: AtomAvatarStatus;
  color?: string;
}
