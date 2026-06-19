export type AtomFileListType = "text" | "picture";

export interface AtomFileUploadProps {
  /** Selected files (v-model). */
  modelValue?: File[];
  /** Native accept filter, e.g. "image/*,.pdf". */
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  /** Max size per file in bytes. */
  maxSize?: number;
  /** Max number of files allowed. */
  maxCount?: number;
  /** "text" = list with names, "picture" = thumbnail grid. */
  listType?: AtomFileListType;
  /** Main text shown inside the drop zone. */
  dropText?: string;
  /** Secondary hint shown under the drop zone. */
  hint?: string;
  showFileList?: boolean;
}

export interface AtomFileUploadEmits {
  (e: "update:modelValue", files: File[]): void;
  (e: "change", files: File[]): void;
  (e: "remove", file: File, index: number): void;
  (e: "exceed-size", file: File): void;
  (e: "exceed-count", files: File[]): void;
}
