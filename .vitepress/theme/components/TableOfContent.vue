<script setup lang="ts">
import { onContentUpdated } from 'vitepress';
import { ref, shallowRef } from 'vue';
import { MenuItem, getHeaders, useActiveAnchor } from '../utils/toc';
import TableOfContentItem from './TableOfContentItem.vue';

const headers = shallowRef<MenuItem[]>([]);

onContentUpdated(() => {
  headers.value = getHeaders();
});

const container = ref();
const marker = ref();
useActiveAnchor(container, marker);
</script>

<template>
  <div class="table-of-content">
    <div ref="container" class="container" :class="{ 'has-outline': headers.length > 0 }" role="navigation">
      <div class="content">
        <div ref="marker" class="marker"></div>

        <div class="title" role="heading" aria-level="2">目次</div>

        <nav>
          <TableOfContentItem :headers="headers" root />
        </nav>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-of-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.container {
  display: none;

  &.has-outline {
    display: block;
  }
}

.content {
  position: relative;
  border-left: 2px solid var(--surface-border);
  padding-left: 1rem;
  padding-right: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.marker {
  --default-top: 1.75rem;
  --width: 4px;

  position: absolute;
  top: var(--default-top);
  left: calc(var(--width) * -1);
  z-index: 0;
  opacity: 0;
  width: var(--width);
  border-radius: 9999px;
  height: 2rem;
  background-color: var(--primary-color);
  transition:
    top var(--transition-duration) cubic-bezier(0, 1, 0.5, 1),
    background-color calc(var(--transition-duration) * 2),
    opacity var(--transition-duration);

  &::after {
    content: '';
    display: inline-block;
    margin-left: var(--width);
    width: calc(var(--table-of-content-width) - var(--width));
    height: 100%;
    background: linear-gradient(90deg, var(--highlight-bg) 70%, transparent);
  }
}

.title {
  font-size: 1rem;
  line-height: 2rem;
  font-weight: 600;
}
</style>
