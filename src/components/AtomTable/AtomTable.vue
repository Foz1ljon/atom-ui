<script setup lang="ts">
import { ref, computed, h } from "vue";
import type { AtomTableProps, AtomTableEmits, SortState } from "./types";
import AtomSkeleton from "../AtomSkeleton/AtomSkeleton.vue";
import "./AtomTable.scss";

defineOptions({ name: "AtomTable" });

const props = withDefaults(defineProps<AtomTableProps>(), {
  data: () => [],
  rowKey: "id",
  loading: false,
  skeletonRows: 5,
  size: "md",
  bordered: false,
  striped: false,
  hoverable: true,
  emptyText: "No data",
});

const emit = defineEmits<AtomTableEmits>();

const sort = ref<SortState>({ key: "", order: null });

function toggleSort(key: string) {
  if (sort.value.key !== key) {
    sort.value = { key, order: "asc" };
  } else if (sort.value.order === "asc") {
    sort.value.order = "desc";
  } else {
    sort.value = { key: "", order: null };
  }
  emit("sort-change", sort.value.key, sort.value.order);
}

const sortedData = computed(() => {
  if (!sort.value.key || !sort.value.order) return props.data ?? [];
  return [...(props.data ?? [])].sort((a, b) => {
    const av = (a as Record<string, unknown>)[sort.value.key];
    const bv = (b as Record<string, unknown>)[sort.value.key];
    const cmp = String(av ?? "").localeCompare(String(bv ?? ""), undefined, {
      numeric: true,
    });
    return sort.value.order === "asc" ? cmp : -cmp;
  });
});

function colWidth(w: string | number | undefined): string | undefined {
  if (w === undefined) return undefined;
  return typeof w === "number" ? `${w}px` : w;
}
</script>

<template>
  <div
    :class="[
      'atom-table',
      `atom-table--${size}`,
      bordered && 'atom-table--bordered',
      striped && 'atom-table--striped',
      hoverable && 'atom-table--hoverable',
      false && 'atom-table--row-clickable',
    ]"
    :style="maxHeight ? { maxHeight, overflowY: 'auto' } : {}"
  >
    <table class="atom-table__inner">
      <colgroup>
        <col
          v-for="col in columns"
          :key="col.key"
          :style="colWidth(col.width) ? { width: colWidth(col.width) } : {}"
        />
      </colgroup>

      <thead class="atom-table__thead">
        <tr>
          <th
            v-for="col in columns"
            :key="col.key"
            :class="[
              'atom-table__th',
              col.align && `atom-table__th--${col.align}`,
              col.sortable && 'atom-table__th--sortable',
            ]"
            @click="col.sortable && toggleSort(col.key)"
          >
            {{ col.title }}
            <span v-if="col.sortable" class="atom-table__sort-icon">
              <span
                class="up"
                :class="sort.key === col.key && sort.order === 'asc' ? 'active' : ''"
              />
              <span
                class="down"
                :class="sort.key === col.key && sort.order === 'desc' ? 'active' : ''"
              />
            </span>
          </th>
        </tr>
      </thead>

      <tbody class="atom-table__tbody">
        <!-- Skeleton loading rows -->
        <template v-if="loading">
          <tr v-for="r in skeletonRows" :key="`sk-${r}`" class="atom-table__tr">
            <td
              v-for="col in columns"
              :key="col.key"
              class="atom-table__td"
            >
              <AtomSkeleton variant="rect" :height="'16px'" :animated="true" />
            </td>
          </tr>
        </template>

        <!-- Actual data rows -->
        <template v-else-if="sortedData.length > 0">
          <tr
            v-for="(row, idx) in sortedData"
            :key="(row as Record<string, unknown>)[rowKey] as string ?? idx"
            class="atom-table__tr"
            @click="emit('row-click', row as never, idx)"
          >
            <td
              v-for="col in columns"
              :key="col.key"
              :class="['atom-table__td', col.align && `atom-table__td--${col.align}`]"
            >
              <template v-if="col.render">
                <component :is="h('span', {}, [col.render(row as never, idx) as never])" />
              </template>
              <template v-else>
                {{ (row as Record<string, unknown>)[col.key] }}
              </template>
            </td>
          </tr>
        </template>

        <!-- Empty state -->
        <template v-else>
          <tr>
            <td :colspan="columns.length" class="atom-table__empty">
              <slot name="empty">{{ emptyText }}</slot>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>
