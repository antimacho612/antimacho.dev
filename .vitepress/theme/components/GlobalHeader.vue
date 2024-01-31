<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import { useWindowScroll } from '@vueuse/core';
import { normalizeLink } from '../utils/link';
import Button from 'primevue/button';
import AppearanceSwitch from './AppearanceSwitch.vue';
import GitHubIcon from './icons/GitHubIcon.vue';
import Bars3Icon from './icons/Bars3Icon.vue';

defineProps<{ hasSidebar: boolean }>();

defineEmits<{ clickMenuButton: [e: MouseEvent] }>();

const { site, page, theme } = useData();

const { y } = useWindowScroll();
const isSticky = computed(() => y.value > 50);
const isHome = computed(() => page.value.relativePath === 'index.md');
</script>

<template>
  <header class="global-header" :class="{ 'is-home': isHome, 'is-sticky': isSticky }">
    <div class="body">
      <div class="left">
        <Button v-if="hasSidebar" text rounded class="menu-button" @click="$emit('clickMenuButton', $event)">
          <template #icon><Bars3Icon /></template>
        </Button>
        <a class="title" :href="normalizeLink('/')" tabindex="-1">{{ site.title }}</a>
      </div>

      <div class="right">
        <AppearanceSwitch />

        <template v-if="theme.gitHubUrl">
          <div class="separator" />
          <a
            :href="theme.gitHubUrl"
            title="GitHub"
            aria-label="github"
            target="_blank"
            rel="noopener"
            class="github-link"
          >
            <GitHubIcon class="github-icon" />
          </a>
        </template>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.global-header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: var(--global-header-height);
  padding: 0 2rem 0 1rem;
  background-color: var(--surface-ground);
  border-bottom: 1px solid transparent;
  z-index: var(--z-index-global-header);
  white-space: nowrap;
  pointer-events: none;
  transition:
    background-color 0.4s,
    border-color 0.4s;

  &.is-sticky:not(.is-home) {
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    background-color: var(--global-header-sticky-bg-color);
    border-color: var(--surface-border);
  }
}

.body {
  width: 100%;
  height: var(--global-header-height);
  display: flex;
  justify-content: space-between;
  pointer-events: none;

  :deep(*) {
    pointer-events: auto;
  }
}

.menu-button {
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;

  svg {
    width: 2rem;
    height: 2rem;
  }
}

.title {
  flex-shrink: 0;
  margin-left: 1rem;
  display: flex;
  align-items: center;
  font-size: 1.375rem;
  font-weight: 600;
  height: var(--global-header-height);
  background: var(--title-gradient);
  background: var(--title-gradient-webkit);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border-radius: 12px;
}

.left {
  flex-shrink: 0;
  display: flex;
  align-items: center;
}

.right {
  flex-grow: 1;
  height: var(--global-header-height);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: end;
  pointer-events: none;
}

.separator {
  margin: 0 1rem;
  width: 1px;
  height: 24px;
  background-color: var(--surface-border);
}

.github-link {
  --size: 2rem;
  width: var(--size);
  height: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: var(--text-color-secondary);
  transition: color 0.5s;

  &:hover {
    color: var(--text-color);
  }

  &:focus {
    @include focused();
  }

  > .github-icon {
    --size: 1.5rem;
    width: var(--size);
    height: var(--size);
    fill: currentColor;
  }
}
</style>
