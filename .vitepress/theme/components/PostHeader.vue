<script setup lang="ts">
import { useData } from 'vitepress';
import { formatDate, getCategoryFromPath } from '../utils/utils';
import CategoryImage from './CategoryImage.vue';

const { frontmatter, page } = useData();

const createdAt = new Date(frontmatter.value.createdAt ?? frontmatter.value.updatedAt ?? page.value.lastUpdated);
const createdAtISOString = createdAt.toISOString();

const updatedAt = new Date(frontmatter.value.updatedAt ?? page.value.lastUpdated);
const updatedAtISOString = updatedAt.toISOString();

const category = getCategoryFromPath(page.value.filePath);
</script>

<template>
  <div class="post-header">
    <div class="category">
      <CategoryImage :category="category" class="category-image" />
      <span class="category-label">{{ category }}</span>
    </div>
    <h1 class="title">{{ frontmatter.title }}</h1>
    <div class="info">
      <span>
        初回作成:<time :datetime="createdAtISOString" style="margin-left: 0.5rem">{{ formatDate(createdAt) }}</time>
      </span>
      <span>
        最終更新:<time :datetime="updatedAtISOString" style="margin-left: 0.5rem">{{ formatDate(updatedAt) }}</time>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.category {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;

  .category-image {
    --size: 1rem;
    flex-shrink: 0;
    width: var(--size);
    height: var(--size);
  }

  .category-label {
    flex-shrink: 0;
    color: var(--text-color-secondary);
    font-size: 0.875rem;
  }
}

.title {
  position: relative;
  margin-top: 0.25rem;
  margin-bottom: 0.5rem;
  font-size: 2rem;
  font-weight: 600;
  outline: none;
}

.info {
  display: flex;
  align-items: center;
  justify-content: end;
  column-gap: 1rem;
  color: var(--text-color-secondary);
  font-size: 0.9rem;
}
</style>
