export type AtomSkeletonVariant = "text" | "rect" | "circle";

export interface AtomSkeletonProps {
  variant?: AtomSkeletonVariant;
  width?: string;
  height?: string;
  lines?: number;
  animated?: boolean;
  rounded?: boolean;
}
