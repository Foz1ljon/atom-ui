<script setup lang="ts">
import { Teleport, TransitionGroup } from "vue";
import { useMessage } from "./useMessage";
import "./AtomMessage.scss";

defineOptions({ name: "AtomMessage" });

const { messages, remove } = useMessage();

const icons: Record<string, string> = {
  info: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M8 7v4M8 5h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  success: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M5 8l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  warning: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2L14 13H2L8 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M8 6v3M8 11h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  error: `<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5"/><path d="M10 6L6 10M6 6l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
};
</script>

<template>
  <Teleport to="body">
    <div class="atom-message-container" aria-live="polite">
      <TransitionGroup name="atom-message" tag="div" style="display: contents">
        <div
          v-for="msg in messages"
          :key="msg.id"
          :class="['atom-message', `atom-message--${msg.type}`]"
          role="alert"
        >
          <span class="atom-message__icon" v-html="icons[msg.type]" />
          <span class="atom-message__content">{{ msg.content }}</span>
          <button
            v-if="msg.closeable"
            class="atom-message__close"
            type="button"
            aria-label="Close"
            @click="remove(msg.id)"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M10.5 3.5l-7 7M3.5 3.5l7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
