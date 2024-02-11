<script setup lang="ts">
import type { Post } from '../types';
import { formatDate, getCategoryLabel } from '../utils/utils';
import { normalizeLink } from '../utils/link';
import CategoryImage from './CategoryImage.vue';

const props = defineProps<{ post: Post }>();
const categoryLabel = getCategoryLabel(props.post.category);
</script>

<template>
  <a class="post-link-card" :href="normalizeLink(post.url)" :title="post.title">
    <div class="header">
      <div class="title">
        {{ post.title }}
      </div>
    </div>
    <div class="footer">
      <div class="left">
        <CategoryImage :category="post.category" class="image" />
        <span class="category">{{ categoryLabel }}</span>
      </div>
      <div class="right">
        <p>
          初回作成:
          <span style="margin-right: 0.5rem">
            {{ post.createdAt ? formatDate(new Date(post.createdAt)) : '不明' }}
          </span>
        </p>
        <p>
          最終更新:
          <span style="margin-right: 0.5rem">
            {{ post.updatedAt ? formatDate(new Date(post.updatedAt)) : '不明' }}
          </span>
        </p>
      </div>
    </div>
  </a>
</template>

<style lang="scss" scoped>
.post-link-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 7.5rem;
  padding: 0.5rem 1rem;
  overflow: hidden;
  background-color: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  cursor: pointer;
  transition: border-color var(--transition-duration);

  &:hover {
    border-color: var(--primary-color);
  }

  &:focus {
    outline: none;
    outline-offset: 0;
    box-shadow: var(--focus-ring);
    border-color: var(--primary-color);
  }
}

.header {
  display: flex;
  align-items: center;
  height: 3.5rem;

  .title {
    font-size: 1.125rem;
    font-weight: 500;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
    overflow: hidden;
  }
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    height: 2.5rem;
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    column-gap: 0.5rem;

    .image {
      flex-shrink: 0;
      width: 1.75rem;
      height: 1.75rem;
    }

    .category {
      color: var(--text-color-secondary);
      font-size: 0.9rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    color: var(--text-color-secondary);
    font-size: 0.875rem;
  }
}
</style>
