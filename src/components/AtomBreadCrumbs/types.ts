import type { VNode } from "vue";

export interface BreadCrumbItem {
  label: string;
  href?: string;
  icon?: VNode;
  disabled?: boolean;
}

export interface AtomBreadCrumbsProps {
  items: BreadCrumbItem[];
  separator?: string;
}

export interface AtomBreadCrumbsEmits {
  (e: "click", item: BreadCrumbItem, index: number): void;
}
