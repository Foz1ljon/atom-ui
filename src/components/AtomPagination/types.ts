export interface AtomPaginationProps {
  total: number;
  current?: number;
  pageSize?: number;
  pageSizes?: number[];
  showSizeChanger?: boolean;
  showTotal?: boolean;
  showJumper?: boolean;
  disabled?: boolean;
  simple?: boolean;
}

export interface AtomPaginationEmits {
  (e: "update:current", page: number): void;
  (e: "update:pageSize", size: number): void;
  (e: "change", page: number, size: number): void;
}
