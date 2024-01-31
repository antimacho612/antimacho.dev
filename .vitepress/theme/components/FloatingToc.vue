<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import { onContentUpdated, useData } from 'vitepress';
import { onClickOutside, onKeyStroke } from '@vueuse/core';
import { MenuItem, getHeaders } from '../utils/toc';
import { ThemeConfig } from '../types';
import Button from 'primevue/button';
import TableOfContentItem from './TableOfContentItem.vue';
import Bars3Icon from './icons/Bars3Icon.vue';
import XMarkIcon from './icons/XMarkIcon.vue';

const { theme } = useData<ThemeConfig>();

const open = ref(false);

const container = ref<HTMLDivElement>();
onClickOutside(
  container,
  () => {
    open.value = false;
  },
  { ignore: ['.floating-toc button'] }
);

onKeyStroke('Escape', () => {
  open.value = false;
});

onContentUpdated(() => {
  open.value = false;
});

const onClickFloatingButton = () => {
  open.value = !open.value;
};

const onClickItem = () => {
  open.value = false;
};

const onClickBackToTopButton = () => {
  open.value = false;
};

const headers = shallowRef<MenuItem[]>([]);
onContentUpdated(() => {
  headers.value = getHeaders(theme.value.tableOfContent);
});
</script>

<template>
  <div class="floating-toc">
    <Button rounded text raised class="toggle-button" @click="onClickFloatingButton">
      <template #icon>
        <XMarkIcon v-if="open" />
        <Bars3Icon v-else />
      </template>
    </Button>

    <div v-if="open" ref="container" class="container">
      <div v-if="headers.length" class="outline">
        <TableOfContentItem :headers="headers" @click="onClickItem" />
      </div>
      <div class="footer">
        <a href="#" class="back-to-top" @click="onClickBackToTopButton">ページの先頭へ</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.floating-toc {
  position: fixed;
  bottom: 1.5rem;
  left: 1.5rem;
  right: 1.5rem;
  width: calc(100vw - 3rem);
  z-index: var(--z-index-floating-toc);

  @include mq(lg) {
    display: hidden;
    visibility: hidden;
  }
}

.container {
  position: absolute;
  bottom: 4.5rem;
  width: 100%;
  height: fit-content;
  max-height: calc(100vh - 12rem);
  display: flex;
  flex-direction: column;
  background-color: var(--surface-50);
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-3);
}

.toggle-button {
  --size: 3.5rem;
  --icon-size: 2.25rem;

  position: absolute;
  bottom: 0;
  right: 0;
  width: var(--size);
  height: var(--size);
  background-color: var(--surface-50);

  svg {
    width: var(--icon-size);
    height: var(--icon-size);
    transition: color var(--transition-duration);
  }

  &:hover svg {
    color: var(--primary-color-2);
  }
}

.outline {
  flex-shrink: 1;
  padding: 0.5rem 0;
  overflow: hidden auto;
  border-bottom: 1px solid var(--surface-300);
}

.footer {
  flex-shrink: 0;
  height: 2.75rem;
  padding: 0.375rem 1rem;
}

.back-to-top {
  display: block;
  width: 100%;
  font-size: 1rem;
  font-weight: 500;
  line-height: 2rem;
  color: var(--primary-color);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: color var(--transition-duration);

  &:hover {
    color: var(--primary-color-2);
  }

  &:focus {
    @include focused-input();
  }
}
</style>
