<script setup lang="ts">
import { ref, computed } from "vue";
import type { AtomPaginationProps, AtomPaginationEmits } from "./types";
import "./AtomPagination.scss";

defineOptions({ name: "AtomPagination" });

const props = withDefaults(defineProps<AtomPaginationProps>(), {
  current: 1,
  pageSize: 10,
  pageSizes: () => [10, 20, 50, 100],
  showSizeChanger: false,
  showTotal: false,
  showJumper: false,
  disabled: false,
  simple: false,
});

const emit = defineEmits<AtomPaginationEmits>();

const jumperInput = ref("");

const totalPages = computed(() =>
  Math.max(1, Math.ceil(props.total / props.pageSize))
);

const visiblePages = computed(() => {
  const total = totalPages.value;
  const cur = props.current;

  const raw: (number | "...")[] =
    total <= 7
      ? Array.from({ length: total }, (_, i) => i + 1)
      : (() => {
          const pages: (number | "...")[] = [1];
          const left = Math.max(2, cur - 2);
          const right = Math.min(total - 1, cur + 2);
          if (left > 2) pages.push("...");
          for (let i = left; i <= right; i++) pages.push(i);
          if (right < total - 1) pages.push("...");
          pages.push(total);
          return pages;
        })();

  return raw.map((page, i) => ({ page, key: `${i}-${page}` }));
});

function go(page: number) {
  if (props.disabled) return;
  const p = Math.max(1, Math.min(totalPages.value, page));
  if (p === props.current) return;
  emit("update:current", p);
  emit("change", p, props.pageSize);
}

function prev() { go(props.current - 1); }
function next() { go(props.current + 1); }

function onSizeChange(e: Event) {
  const size = Number((e.target as HTMLSelectElement).value);
  emit("update:pageSize", size);
  const newCurrent = Math.min(props.current, Math.ceil(props.total / size));
  emit("update:current", newCurrent);
  emit("change", newCurrent, size);
}

function onJumper(e: KeyboardEvent) {
  if (e.key !== "Enter") return;
  const page = parseInt(jumperInput.value);
  if (!isNaN(page)) {
    go(page);
    jumperInput.value = "";
  }
}
</script>

<template>
  <div :class="['atom-pagination', disabled && 'atom-pagination--disabled']">
    <!-- Total display -->
    <span v-if="showTotal" class="atom-pagination__total">
      Total {{ total }} items
    </span>

    <!-- Simple mode -->
    <template v-if="simple">
      <button class="atom-pagination__btn" :disabled="current <= 1" @click="prev">‹</button>
      <span class="atom-pagination__simple">
        <span>{{ current }}</span>
        <span>/</span>
        <span>{{ totalPages }}</span>
      </span>
      <button class="atom-pagination__btn" :disabled="current >= totalPages" @click="next">›</button>
    </template>

    <!-- Full mode -->
    <template v-else>
      <button class="atom-pagination__btn" :disabled="current <= 1" @click="prev" aria-label="Previous">‹</button>

      <template v-for="item in visiblePages" :key="item.key">
        <button
          v-if="item.page !== '...'"
          :class="['atom-pagination__btn', item.page === current && 'atom-pagination__btn--active']"
          @click="go(item.page as number)"
        >
          {{ item.page }}
        </button>
        <span v-else class="atom-pagination__btn atom-pagination__btn--ellipsis">•••</span>
      </template>

      <button class="atom-pagination__btn" :disabled="current >= totalPages" @click="next" aria-label="Next">›</button>
    </template>

    <!-- Page size changer -->
    <select
      v-if="showSizeChanger"
      class="atom-pagination__sizer"
      :value="pageSize"
      @change="onSizeChange"
    >
      <option v-for="s in pageSizes" :key="s" :value="s">{{ s }} / page</option>
    </select>

    <!-- Jumper -->
    <label v-if="showJumper" class="atom-pagination__jumper">
      Go to
      <input
        v-model="jumperInput"
        type="number"
        min="1"
        :max="totalPages"
        @keydown="onJumper"
      />
    </label>
  </div>
</template>
