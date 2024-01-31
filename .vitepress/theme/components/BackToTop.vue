<script setup lang="ts">
import { computed } from 'vue';
import { useWindowScroll } from '@vueuse/core';

import Button from 'primevue/button';
import ChevronDoubleUpIcon from './icons/ChevronDoubleUpIcon.vue';

const { y } = useWindowScroll();
const showButton = computed(() => y.value >= 50);
</script>

<template>
  <Button rounded text raised class="back-to-top-button" :class="{ show: showButton }" @click="y = 0">
    <template #icon><ChevronDoubleUpIcon /></template>
  </Button>
</template>

<style lang="scss" scoped>
.back-to-top-button {
  --size: 3.5rem;
  --icon-size: 2.25rem;

  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: var(--size);
  height: var(--size);
  background-color: var(--surface-50);
  z-index: var(--z-index-back-to-top);
  display: flex;
  visibility: hidden;
  opacity: 0;
  transition:
    opacity var(--transition-duration),
    visibility var(--transition-duration);

  @include mq(lg) {
    &.show {
      visibility: visible;
      opacity: 1;
    }
  }

  svg {
    width: var(--icon-size);
    height: var(--icon-size);
    transition: color var(--transition-duration);
  }

  &:hover svg {
    color: var(--primary-color-2);
  }
}
</style>
