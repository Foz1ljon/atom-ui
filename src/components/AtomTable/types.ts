export type AtomTableSize = "sm" | "md" | "lg";
export type AtomTableAlign = "left" | "center" | "right";
export type AtomTableSortOrder = "asc" | "desc" | null;

export interface AtomTableColumn<T = Record<string, unknown>> {
  key: string;
  title: string;
  width?: string | number;
  minWidth?: string | number;
  align?: AtomTableAlign;
  sortable?: boolean;
  fixed?: "left" | "right";
  render?: (row: T, index: number) => unknown;
}

export interface AtomTableProps<T = Record<string, unknown>> {
  columns: AtomTableColumn<T>[];
  data?: T[];
  rowKey?: string;
  loading?: boolean;
  skeletonRows?: number;
  size?: AtomTableSize;
  bordered?: boolean;
  striped?: boolean;
  hoverable?: boolean;
  emptyText?: string;
  maxHeight?: string;
}

export interface AtomTableEmits<T = Record<string, unknown>> {
  (e: "row-click", row: T, index: number): void;
  (e: "sort-change", key: string, order: AtomTableSortOrder): void;
}

export interface SortState {
  key: string;
  order: AtomTableSortOrder;
}
