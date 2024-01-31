import { computed, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';
import { useData } from 'vitepress';
import { useMediaQuery } from '@vueuse/core';

export const useSidebar = () => {
  const { page } = useData();

  const isOpen = ref(false);

  const hasSidebar = computed(() => !page.value.isNotFound && page.value.relativePath !== 'index.md');

  const isScreenXL = useMediaQuery('(min-width: 1200px)');
  const isBackdropVisible = computed(() => isOpen.value && !isScreenXL.value);

  watch(isScreenXL, () => {
    if (!isScreenXL.value) {
      isOpen.value = false;
    }
  });

  const open = () => {
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  const toggle = () => (isOpen.value ? close() : open());

  let triggerElement: HTMLButtonElement | undefined;
  watchEffect(() => {
    triggerElement = isBackdropVisible.value ? (document.activeElement as HTMLButtonElement) : undefined;
  });

  onMounted(() => {
    window.addEventListener('keyup', onEscape);
  });

  onUnmounted(() => {
    window.removeEventListener('keyup', onEscape);
  });

  const onEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && isBackdropVisible.value) {
      close();
      triggerElement?.focus();
    }
  };

  return { isOpen, hasSidebar, isBackdropVisible, open, close, toggle };
};
