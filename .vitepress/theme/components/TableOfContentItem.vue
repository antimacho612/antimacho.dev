<script setup lang="ts">
import { type MenuItem } from '../utils/toc';

defineProps<{
  headers: MenuItem[];
  root?: boolean;
}>();

const onClick = ({ target: el }: Event) => {
  const id = (el as HTMLAnchorElement).href!.split('#')[1];
  const heading = document.getElementById(decodeURIComponent(id));
  heading?.focus({ preventScroll: true });
};
</script>

<template>
  <ul class="table-of-content-item" :class="root ? 'root' : 'nested'">
    <li v-for="{ children, link, title } in headers" :key="link">
      <a class="link" :href="link" :title="title" @click="onClick">{{ title }}</a>
      <TableOfContentItem v-if="children?.length" :headers="children" />
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.table-of-content-item {
  &.root {
    position: relative;
    z-index: 1;
  }

  &.nested {
    padding-right: 1rem;
    padding-left: 1rem;
  }
}

.link {
  display: block;
  line-height: 2rem;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--text-color-secondary);
  border-radius: var(--border-radius);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.5s;

  &:hover,
  &.active {
    color: var(--text-color);
    transition: color var(--transition-duration);
  }

  &:focus-visible {
    @include focused();
  }
}
</style>
