<script setup lang="ts">
defineProps<{
  title?: string;
  code?: string;
}>();
</script>

<template>
  <div class="demo-block">
    <div v-if="title" class="demo-block__title">{{ title }}</div>

    <div class="demo-block__preview">
      <slot />
    </div>

    <!-- Named slot (new pattern: markdown code fences) -->
    <details v-if="$slots.code" class="demo-block__details">
      <summary class="demo-block__summary">View code</summary>
      <div class="demo-block__code-slot">
        <slot name="code" />
      </div>
    </details>

    <!-- Code prop (legacy pattern: raw string) -->
    <details v-else-if="code" class="demo-block__details">
      <summary class="demo-block__summary">View code</summary>
      <pre class="demo-block__pre"><code>{{ code }}</code></pre>
    </details>
  </div>
</template>

<style scoped>
.demo-block {
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  margin: 16px 0 24px;
  background: var(--vp-c-bg);
}

.demo-block__title {
  padding: 10px 16px;
  font-weight: 600;
  font-size: 13px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

.demo-block__preview {
  padding: 24px 20px;
}

.demo-block__details {
  border-top: 1px solid var(--vp-c-divider);
}

.demo-block__summary {
  cursor: pointer;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 500;
  user-select: none;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  list-style: none;
  display: flex;
  align-items: center;
  gap: 6px;
}

.demo-block__summary::before {
  content: "</>";
  font-family: monospace;
  opacity: 0.6;
}

.demo-block__code-slot :deep(div[class*="language-"]) {
  margin: 0;
  border-radius: 0;
}

.demo-block__pre {
  margin: 0;
  padding: 16px;
  overflow: auto;
  background: var(--vp-code-block-bg, #0f172a);
  color: #e2e8f0;
  font-size: 13px;
  line-height: 1.6;
}
</style>
