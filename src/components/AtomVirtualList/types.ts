export interface AtomVirtualListProps<T = unknown> {
  /** Full data set — only the visible window is rendered. */
  items: T[];
  /** Fixed height of every row, in pixels. */
  itemHeight: number;
  /** Scroll container height (number = px, or any CSS length). */
  height?: number | string;
  /** Extra rows rendered above/below the viewport to smooth scrolling. */
  buffer?: number;
  /** Field on each item used as the :key (falls back to index). */
  keyField?: string;
}

export interface AtomVirtualListEmits {
  (e: "scroll", scrollTop: number): void;
  (e: "reach-bottom"): void;
}
