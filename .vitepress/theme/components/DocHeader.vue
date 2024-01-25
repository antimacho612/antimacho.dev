<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import { formatDate } from '../utils/utils';

const { frontmatter, page } = useData();

const createdAt = computed(
  () => new Date(frontmatter.value.createdAt ?? frontmatter.value.updatedAt ?? page.value.lastUpdated)
);
const createdAtISOString = computed(() => createdAt.value.toISOString());

const updatedAt = computed(() => new Date(frontmatter.value.updatedAt ?? page.value.lastUpdated));
const updatedAtISOString = computed(() => updatedAt.value.toISOString());
</script>

<template>
  <div class="doc-header">
    <h1 class="title">{{ frontmatter.title }}</h1>
    <div class="page-info">
      <span>
        初回作成:<time :datetime="createdAtISOString" style="margin-left: 0.5rem">{{ formatDate(createdAt) }}</time>
      </span>
      <span>
        最終更新:<time :datetime="updatedAtISOString" style="margin-left: 0.5rem">{{ formatDate(updatedAt) }}</time>
      </span>
    </div>
  </div>
</template>

<style scoped>
.title {
  position: relative;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  font-weight: 600;
  outline: none;
}

.page-info {
  display: flex;
  align-items: center;
  justify-content: end;
  column-gap: 1rem;
  color: var(--text-color-secondary);
  font-size: 0.9rem;
}
</style>
