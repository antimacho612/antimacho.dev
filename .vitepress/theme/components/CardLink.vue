<script setup lang="ts">
import { ref } from 'vue';
import { formatDate } from '../utils/utils';
import { normalizeLink } from '../utils/link';
import type { CheatSheet } from '../types';

const props = defineProps<{ cheatSheet: CheatSheet; imgSrc?: string }>();

const showImage = ref(!!props.imgSrc);
</script>

<template>
  <a class="cheat-sheet-card" :href="normalizeLink(cheatSheet.url)" :title="cheatSheet.title">
    <div class="header">
      <div class="title">
        {{ cheatSheet.frontmatter.title }}
      </div>
    </div>
    <div class="footer">
      <div class="left">
        <img
          v-if="showImage"
          :src="imgSrc"
          alt="language image"
          class="image"
          width="40"
          height="40"
          @error="showImage = false"
        />
      </div>
      <div class="right">
        <p>
          初回作成:
          <span style="margin-right: 0.5rem">
            {{ cheatSheet.createdAt ? formatDate(new Date(cheatSheet.createdAt)) : '不明' }}
          </span>
        </p>
        <p>
          最終更新:
          <span style="margin-right: 0.5rem">
            {{ cheatSheet.updatedAt ? formatDate(new Date(cheatSheet.updatedAt)) : '不明' }}
          </span>
        </p>
      </div>
    </div>
  </a>
</template>

<style lang="scss" scoped>
.cheat-sheet-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 7.5rem;
  width: 50%;
  padding: 0.5rem 1rem;
  overflow: hidden;
  background-color: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  cursor: pointer;
  transition: border-color 0.25s;

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
    .image {
      width: 2.5rem;
      height: 2.5rem;
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
