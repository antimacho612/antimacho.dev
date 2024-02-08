<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { inBrowser } from 'vitepress';
import { useMediaQuery, useScrollLock } from '@vueuse/core';
import { useSidebarLink } from '../composables/useSidebarLink';
import Link from './Link.vue';
import CategoryImage from './CategoryImage.vue';

const props = defineProps<{ open: boolean }>();

defineEmits<{ clickBackdrop: [e: MouseEvent]; clickLink: [e: MouseEvent] }>();

const { category, links, isActiveLink } = useSidebarLink();

const isScreenXL = useMediaQuery('(min-width: 1200px)');
const sidebarEl = ref<HTMLElement | undefined>();
const isScrollLocked = useScrollLock(inBrowser ? document.body : null);
const showBackdrop = computed(() => props.open && !isScreenXL.value);

watch(
  [showBackdrop, sidebarEl],
  () => {
    if (showBackdrop.value) {
      isScrollLocked.value = true;
      sidebarEl.value?.focus();
    } else {
      isScrollLocked.value = false;
    }
  },
  { immediate: true, flush: 'post' }
);
</script>

<template>
  <aside ref="sidebarEl" class="sidebar" :class="{ open }">
    <Teleport to="body">
      <div v-if="showBackdrop" class="backdrop" @click="$emit('clickBackdrop', $event)" />
    </Teleport>

    <nav class="nav" tabindex="-1">
      <div class="category">
        <CategoryImage :category="category" class="category-image" />
        <span class="category-label">{{ category }}</span>
      </div>
      <div class="links">
        <Link
          v-for="link in links"
          :key="link.url"
          :href="link.url"
          class="link"
          :class="{ 'is-current': isActiveLink(link.url) }"
          @click="$emit('clickLink', $event)"
        >
          {{ link.title }}
        </Link>
      </div>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  top: var(--global-header-height);
  bottom: 0;
  left: 0;
  width: var(--sidebar-width);
  background-color: var(--surface-ground);
  z-index: var(--z-index-sidebar);
  padding: 0 1rem 1rem;
  overflow: hidden auto;
  opacity: 0;
  transform: translateX(-100%);
  transition:
    opacity calc(var(--transition-duration, 0.2s) * 2),
    transform var(--transition-duration, 0.2s) ease;
  overscroll-behavior: contain;

  &.open {
    opacity: 1;
    visibility: visible;
    transform: translateX(0);
    box-shadow: var(--shadow-3);
  }

  @include mq(xl) {
    &.open {
      box-shadow: none;
    }
  }
}

.backdrop {
  position: fixed;
  inset: var(--global-header-height) 0 0;
  background-color: var(--maskbg);
  z-index: var(--z-index-backdrop);
  transition: opacity calc(var(--transition-duration, 0.2s) * 2);

  &.fade-enter-from,
  &.fade-leave-to {
    opacity: 0;
  }

  &.fade-leave-active {
    transition-duration: var(--transition-duration, 0.2s);
  }
}

.category {
  position: sticky;
  top: 0;
  padding: 0.75rem 0;
  background-color: var(--surface-ground);
  display: flex;
  align-items: center;
  gap: 0.25rem;

  .category-image {
    --size: 1.25rem;
    flex-shrink: 0;
    width: var(--size);
    height: var(--size);
  }

  .category-label {
    font-size: 1.125rem;
    font-weight: 500;
  }
}

.links {
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 2px;

  .link {
    font-size: 1rem;
    font-weight: 400;
    padding: 0.5rem 0;
    color: var(--text-color-secondary);
    border-radius: var(--border-radius);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color var(--transition-duration);

    &:hover {
      color: var(--text-color);
    }

    &:focus-visible {
      @include focused();
    }

    &.is-current {
      color: var(--primary-color);
    }
  }
}
</style>
