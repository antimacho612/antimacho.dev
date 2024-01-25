<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';

import SunIcon from './icons/SunIcon.vue';
import MoonIcon from './icons/MoonIcon.vue';

const { isDark } = useData();

const title = computed(() => (isDark.value ? 'ライトモードに切り替え' : 'ダークモードに切り替え'));
</script>

<template>
  <button
    type="button"
    :title="title"
    class="appearance-switch"
    :class="{ 'is-dark': isDark }"
    role="switch"
    :aria-checked="isDark"
    @click="isDark = !isDark"
  >
    <span class="check">
      <span class="icon">
        <MoonIcon v-if="isDark" class="moon-icon" />
        <SunIcon v-else class="sun-icon" />
      </span>
    </span>
  </button>
</template>

<style lang="scss" scoped>
.appearance-switch {
  --height: 1.75rem;

  position: relative;
  border-radius: 9999px;
  display: block;
  width: 3.5rem;
  height: var(--height);
  flex-shrink: 0;
  border: 1px solid var(--surface-border);
  background-color: var(--surface-100);
  cursor: pointer;
  transition: border-color var(--transition-duration);

  &:hover {
    border-color: var(--primary-color);
  }

  &:focus {
    @include focused-input();
  }
}

.check {
  --size: calc(var(--height) - 4px);

  position: absolute;
  top: 1px;
  left: 1px;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background-color: var(--surface-0);
  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 1px 2px rgba(0, 0, 0, 0.06);
  transition: transform var(--transition-duration) !important;
}

.appearance-switch.is-dark .check {
  transform: translateX(var(--height));
}

.icon {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;

  :deep(svg) {
    --size: calc(var(--height) - 10px);

    position: absolute;
    top: 3px;
    left: 3px;
    width: var(--size);
    height: var(--size);
    fill: var(--text-color-secondary);
  }
}

.dark .icon svg {
  fill: var(--text-color);
  transition: opacity var(--transition-duration) !important;
}
</style>
