export type AtomMessageType = "info" | "success" | "warning" | "error";

export interface AtomMessageItem {
  id: number;
  type: AtomMessageType;
  content: string;
  duration: number;
  closeable: boolean;
}
