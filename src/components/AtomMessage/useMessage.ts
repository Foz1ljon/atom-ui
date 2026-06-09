import { reactive } from "vue";
import type { AtomMessageItem, AtomMessageType } from "./types";

const messages = reactive<AtomMessageItem[]>([]);
let nextId = 0;

function add(
  type: AtomMessageType,
  content: string,
  duration = 3000,
  closeable = true
): number {
  const id = nextId++;
  messages.push({ id, type, content, duration, closeable });
  if (duration > 0) {
    setTimeout(() => remove(id), duration);
  }
  return id;
}

function remove(id: number) {
  const idx = messages.findIndex((m) => m.id === id);
  if (idx !== -1) messages.splice(idx, 1);
}

function clear() {
  messages.splice(0, messages.length);
}

export function useMessage() {
  return {
    messages,
    info: (content: string, duration?: number) =>
      add("info", content, duration),
    success: (content: string, duration?: number) =>
      add("success", content, duration),
    warning: (content: string, duration?: number) =>
      add("warning", content, duration),
    error: (content: string, duration?: number) =>
      add("error", content, duration),
    remove,
    clear,
  };
}
