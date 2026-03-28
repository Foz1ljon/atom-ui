<script setup lang="ts">
defineProps<{
  code: string;
  title?: string;
}>();

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code);
    copied.value = true;

    setTimeout(() => {
      copied.value = false;
    }, 1500);
  } catch (error) {
    console.error("Copy failed:", error);
  }
}
</script>

<template>
  <div class="demo-block">
    <div v-if="title" class="demo-block__title">{{ title }}</div>

    <div class="demo-block__preview">
      <slot />
    </div>

    <details class="demo-block__details">
      <summary class="demo-block__summary">Code</summary>

      <pre class="demo-block__pre"><code>{{ code }}</code></pre>
    </details>
  </div>
</template>

<style module>
.demo-block {
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  overflow: hidden;
  margin: 16px 0;
  background: #fff;
}

.demo-block__title {
  padding: 12px 16px;
  font-weight: 600;
  border-bottom: 1px solid #e5e7eb;
  background: #fafafa;
}

.demo-block__preview {
  padding: 20px;
}

.demo-block__details {
  border-top: 1px solid #e5e7eb;
}

.demo-block__summary {
  cursor: pointer;
  padding: 12px 16px;
  font-weight: 500;
  user-select: none;
  background: #fafafa;
}

.demo-block__pre {
  margin: 0;
  padding: 16px;
  overflow: auto;
  background: #0f172a;
  color: #e2e8f0;
  font-size: 13px;
  line-height: 1.6;
}
</style>
