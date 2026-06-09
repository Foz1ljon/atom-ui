<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted, nextTick } from "vue";
import type { AtomEditorProps, AtomEditorEmits } from "./types";
import "./AtomEditor.scss";

defineOptions({ name: "AtomEditor" });

const props = withDefaults(defineProps<AtomEditorProps>(), {
  modelValue: "",
  placeholder: "Yozishni boshlang...",
  minHeight: "200px",
  maxHeight: "600px",
  disabled: false,
  readonly: false,
  error: false,
  showWordCount: true,
  showSource: true,
});

const emit = defineEmits<AtomEditorEmits>();

const editorRef = ref<HTMLDivElement | null>(null);
const sourceRef = ref<HTMLTextAreaElement | null>(null);
const isSourceMode = ref(false);
const showLinkDialog = ref(false);
const linkUrl = ref("");
const linkText = ref("");
const savedRange = ref<Range | null>(null);
const activeFormats = ref<Record<string, boolean>>({});

// Word & char count
const wordCount = computed(() => {
  const text = (props.modelValue ?? "").replace(/<[^>]*>/g, "").trim();
  return text ? text.split(/\s+/).length : 0;
});
const charCount = computed(() =>
  (props.modelValue ?? "").replace(/<[^>]*>/g, "").length,
);

const contentStyle = computed(() => ({
  minHeight: props.minHeight,
  maxHeight: props.maxHeight,
  overflow: "auto",
}));

const boxClass = computed(() => [
  "atom-editor__box",
  props.error && "atom-editor__box--error",
  (props.disabled || props.readonly) && "atom-editor__box--disabled",
]);

// Sync external model → editor
watch(
  () => props.modelValue,
  (val) => {
    if (!editorRef.value || isSourceMode.value) return;
    if (editorRef.value.innerHTML !== (val ?? "")) {
      editorRef.value.innerHTML = val ?? "";
    }
  },
);

function onInput() {
  if (!editorRef.value) return;
  const html = editorRef.value.innerHTML;
  emit("update:modelValue", html);
  emit("change", html);
  updateActiveFormats();
}

function onFocus(e: FocusEvent) {
  updateActiveFormats();
  emit("focus", e);
}

function onBlur(e: FocusEvent) {
  emit("blur", e);
}

// ──────────────── execCommand wrapper ────────────────
function exec(cmd: string, value?: string) {
  if (!editorRef.value) return;
  editorRef.value.focus();
  document.execCommand(cmd, false, value ?? "");
  onInput();
}

// ──────────────── Format state detection ────────────────
function updateActiveFormats() {
  activeFormats.value = {
    bold: document.queryCommandState("bold"),
    italic: document.queryCommandState("italic"),
    underline: document.queryCommandState("underline"),
    strikeThrough: document.queryCommandState("strikeThrough"),
    insertUnorderedList: document.queryCommandState("insertUnorderedList"),
    insertOrderedList: document.queryCommandState("insertOrderedList"),
    justifyLeft: document.queryCommandState("justifyLeft"),
    justifyCenter: document.queryCommandState("justifyCenter"),
    justifyRight: document.queryCommandState("justifyRight"),
    justifyFull: document.queryCommandState("justifyFull"),
  };
}

function onSelectionChange() {
  if (document.activeElement === editorRef.value) {
    updateActiveFormats();
  }
}

// ──────────────── Block format select ────────────────
function onBlockChange(e: Event) {
  const val = (e.target as HTMLSelectElement).value;
  if (val === "pre") {
    exec("formatBlock", "pre");
  } else {
    exec("formatBlock", val);
  }
  (e.target as HTMLSelectElement).blur();
}

// ──────────────── Link dialog ────────────────
function openLinkDialog() {
  const sel = window.getSelection();
  if (sel && sel.rangeCount) {
    savedRange.value = sel.getRangeAt(0).cloneRange();
    linkText.value = sel.toString();
  }
  linkUrl.value = "";
  showLinkDialog.value = true;
  nextTick(() => {
    const inp = document.querySelector(".atom-editor__link-dialog input") as HTMLInputElement;
    inp?.focus();
  });
}

function insertLink() {
  if (!linkUrl.value.trim()) {
    showLinkDialog.value = false;
    return;
  }
  const url = linkUrl.value.trim().startsWith("http")
    ? linkUrl.value.trim()
    : `https://${linkUrl.value.trim()}`;

  if (editorRef.value) {
    editorRef.value.focus();
    const sel = window.getSelection();
    if (savedRange.value && sel) {
      sel.removeAllRanges();
      sel.addRange(savedRange.value);
    }
    if (sel && sel.toString()) {
      exec("createLink", url);
    } else {
      const a = `<a href="${url}" target="_blank">${linkText.value || url}</a>`;
      exec("insertHTML", a);
    }
  }
  showLinkDialog.value = false;
}

function cancelLink() {
  showLinkDialog.value = false;
}

// ──────────────── Image ────────────────
function insertImage() {
  const url = window.prompt("Rasm URL manzilini kiriting:");
  if (url) {
    exec("insertHTML", `<img src="${url}" alt="rasm" />`);
  }
}

// ──────────────── Code block ────────────────
function insertCodeBlock() {
  exec("insertHTML", "<pre><code>// kod shu yerga</code></pre><p><br></p>");
}

// ──────────────── HR ────────────────
function insertHr() {
  exec("insertHTML", "<hr/><p><br></p>");
}

// ──────────────── Source mode toggle ────────────────
function toggleSourceMode() {
  if (!isSourceMode.value) {
    // switch to source
    isSourceMode.value = true;
    nextTick(() => {
      if (sourceRef.value) {
        sourceRef.value.value = props.modelValue ?? "";
        sourceRef.value.style.height = `${Math.max(200, sourceRef.value.scrollHeight)}px`;
      }
    });
  } else {
    // switch back to WYSIWYG
    const html = sourceRef.value?.value ?? "";
    emit("update:modelValue", html);
    emit("change", html);
    isSourceMode.value = false;
    nextTick(() => {
      if (editorRef.value) editorRef.value.innerHTML = html;
    });
  }
}

function onSourceInput() {
  if (!sourceRef.value) return;
  const html = sourceRef.value.value;
  emit("update:modelValue", html);
  emit("change", html);
}

// ──────────────── Click outside link dialog ────────────────
function onDocClick(e: MouseEvent) {
  const dlg = document.querySelector(".atom-editor__link-dialog");
  if (dlg && !dlg.contains(e.target as Node)) showLinkDialog.value = false;
}

// ──────────────── Paste handler ────────────────
function onPaste(e: ClipboardEvent) {
  e.preventDefault();
  const html = e.clipboardData?.getData("text/html");
  const text = e.clipboardData?.getData("text/plain") ?? "";
  document.execCommand("insertHTML", false, html || text.replace(/\n/g, "<br>"));
  onInput();
}

onMounted(() => {
  document.addEventListener("selectionchange", onSelectionChange);
  document.addEventListener("mousedown", onDocClick);
  if (editorRef.value) editorRef.value.innerHTML = props.modelValue ?? "";
});

onUnmounted(() => {
  document.removeEventListener("selectionchange", onSelectionChange);
  document.removeEventListener("mousedown", onDocClick);
});
</script>

<template>
  <div class="atom-editor">
    <label v-if="label" class="atom-editor__label">{{ label }}</label>

    <div :class="boxClass">
      <!-- ───────── Toolbar ───────── -->
      <div class="atom-editor__toolbar" @mousedown.prevent>
        <!-- History -->
        <div class="atom-editor__group">
          <button type="button" class="atom-editor__btn" title="Orqaga (Ctrl+Z)" @click="exec('undo')">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M3 7a5 5 0 1 0 1-3H2V2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button type="button" class="atom-editor__btn" title="Oldinga (Ctrl+Y)" @click="exec('redo')">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M12 7a5 5 0 1 1-1-3H13V2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>

        <!-- Block format -->
        <div class="atom-editor__group">
          <select class="atom-editor__select" title="Matn formati" @change="onBlockChange">
            <option value="p">Paragraph</option>
            <option value="h1">H1 - Sarlavha</option>
            <option value="h2">H2 - Sarlavha</option>
            <option value="h3">H3 - Sarlavha</option>
            <option value="h4">H4 - Sarlavha</option>
            <option value="blockquote">Blockquote</option>
          </select>
        </div>

        <!-- Text format -->
        <div class="atom-editor__group">
          <button
            type="button" class="atom-editor__btn" title="Qalin (Ctrl+B)"
            :class="activeFormats.bold && 'atom-editor__btn--active'"
            @click="exec('bold')"
          ><b>B</b></button>
          <button
            type="button" class="atom-editor__btn" title="Kursiv (Ctrl+I)"
            :class="activeFormats.italic && 'atom-editor__btn--active'"
            @click="exec('italic')"
          ><i>I</i></button>
          <button
            type="button" class="atom-editor__btn" title="Tagiga chiziq (Ctrl+U)"
            :class="activeFormats.underline && 'atom-editor__btn--active'"
            @click="exec('underline')"
          ><u>U</u></button>
          <button
            type="button" class="atom-editor__btn" title="O'chirilgan"
            :class="activeFormats.strikeThrough && 'atom-editor__btn--active'"
            @click="exec('strikeThrough')"
          ><s>S</s></button>
        </div>

        <!-- Lists -->
        <div class="atom-editor__group">
          <button
            type="button" class="atom-editor__btn" title="Tartibsiz ro'yxat"
            :class="activeFormats.insertUnorderedList && 'atom-editor__btn--active'"
            @click="exec('insertUnorderedList')"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="2.5" cy="4" r="1.2" fill="currentColor"/>
              <circle cx="2.5" cy="7.5" r="1.2" fill="currentColor"/>
              <circle cx="2.5" cy="11" r="1.2" fill="currentColor"/>
              <path d="M6 4h7M6 7.5h7M6 11h7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </button>
          <button
            type="button" class="atom-editor__btn" title="Tartibli ro'yxat"
            :class="activeFormats.insertOrderedList && 'atom-editor__btn--active'"
            @click="exec('insertOrderedList')"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 2.5h1.5V6H2M2 9h1.2a.8.8 0 0 1 0 1.6H2m0 0h1.5V12H2" stroke="currentColor" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6 4h7M6 7.5h7M6 11h7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- Alignment -->
        <div class="atom-editor__group">
          <button
            type="button" class="atom-editor__btn" title="Chap tekislash"
            :class="activeFormats.justifyLeft && 'atom-editor__btn--active'"
            @click="exec('justifyLeft')"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 3h11M2 6h8M2 9h11M2 12h6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </button>
          <button
            type="button" class="atom-editor__btn" title="Markazga tekislash"
            :class="activeFormats.justifyCenter && 'atom-editor__btn--active'"
            @click="exec('justifyCenter')"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 3h11M3.5 6h8M2 9h11M4.5 12h6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </button>
          <button
            type="button" class="atom-editor__btn" title="O'ng tekislash"
            :class="activeFormats.justifyRight && 'atom-editor__btn--active'"
            @click="exec('justifyRight')"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 3h11M5 6h8M2 9h11M7 12h6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </button>
          <button
            type="button" class="atom-editor__btn" title="To'liq tekislash"
            :class="activeFormats.justifyFull && 'atom-editor__btn--active'"
            @click="exec('justifyFull')"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 3h11M2 6h11M2 9h11M2 12h11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- Insert -->
        <div class="atom-editor__group">
          <button type="button" class="atom-editor__btn" title="Havola qo'shish" @click="openLinkDialog">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M6.5 8.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5L7 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M8.5 6.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5L8 12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </button>
          <button type="button" class="atom-editor__btn" title="Havolani olib tashlash" @click="exec('unlink')">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M6.5 8.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5L7 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-dasharray="2 1"/>
              <path d="M2 2l11 11" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </button>
          <button type="button" class="atom-editor__btn" title="Rasm qo'shish" @click="insertImage">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <rect x="1.5" y="2.5" width="12" height="10" rx="1.5" stroke="currentColor" stroke-width="1.4"/>
              <circle cx="5" cy="5.5" r="1" fill="currentColor"/>
              <path d="M1.5 10.5l3-3 2.5 2.5 2-2 4 4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button type="button" class="atom-editor__btn" title="Kod bloki" @click="insertCodeBlock">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M5 5L2 7.5 5 10M10 5l3 2.5L10 10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button type="button" class="atom-editor__btn" title="Gorizontal chiziq" @click="insertHr">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M2 7.5h11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <!-- Source toggle -->
        <div v-if="showSource" class="atom-editor__group">
          <button
            type="button"
            class="atom-editor__btn atom-editor__btn--source"
            :class="isSourceMode && 'atom-editor__btn--active'"
            title="HTML kodini ko'rish"
            @click="toggleSourceMode"
          >
            &lt;/&gt;
          </button>
        </div>

        <!-- Link dialog -->
        <div v-if="showLinkDialog" class="atom-editor__link-dialog" @mousedown.stop>
          <input
            v-model="linkUrl"
            placeholder="https://example.com"
            @keyup.enter="insertLink"
            @keyup.escape="cancelLink"
          />
          <div class="atom-editor__link-dialog-actions">
            <button type="button" class="atom-editor__link-dialog-ok" @click="insertLink">OK</button>
            <button type="button" class="atom-editor__link-dialog-cancel" @click="cancelLink">Bekor</button>
          </div>
        </div>
      </div>

      <!-- ───────── WYSIWYG content ───────── -->
      <div
        v-show="!isSourceMode"
        ref="editorRef"
        class="atom-editor__content"
        contenteditable="true"
        :data-placeholder="placeholder"
        :style="contentStyle"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @keydown.tab.prevent="exec('insertHTML', '&nbsp;&nbsp;&nbsp;&nbsp;')"
        @paste.prevent="onPaste"
      /><!-- ───────── HTML source textarea ───────── -->
      <textarea
        v-show="isSourceMode"
        ref="sourceRef"
        class="atom-editor__source"
        :style="contentStyle"
        spellcheck="false"
        @input="onSourceInput"
      />

      <!-- Footer -->
      <div v-if="showWordCount" class="atom-editor__footer">
        <span>{{ wordCount }} so'z</span>
        <span>{{ charCount }} belgi</span>
      </div>
    </div>

    <span v-if="error && errorMessage" class="atom-editor__error">{{ errorMessage }}</span>
    <span v-else-if="hint" class="atom-editor__hint">{{ hint }}</span>
  </div>
</template>
