<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import { useDark } from './composables/useDark';
import { useSidebar } from './composables/useSidebar';
import GlobalHeader from './components/GlobalHeader.vue';
import Sidebar from './components/Sidebar.vue';
import NotFound from './pages/NotFound.vue';
import Home from './pages/Home.vue';
import Post from './pages/Post.vue';

const { page } = useData();

useDark();

const {
  isOpen: isSidebarOpen,
  hasSidebar,
  isBackdropVisible,
  close: closeSidebar,
  toggle: toggleSidebar,
} = useSidebar();
const isContentInert = computed(() => hasSidebar.value && isBackdropVisible.value);
</script>

<template>
  <div class="layout">
    <GlobalHeader :has-sidebar="hasSidebar" @click-menu-button="toggleSidebar()" />

    <Sidebar v-if="hasSidebar" :open="isSidebarOpen" @click-backdrop="closeSidebar()" />

    <div id="content" class="content" :inert="isContentInert">
      <NotFound v-if="page.isNotFound" />
      <Home v-else-if="page.relativePath === 'index.md'" />
      <Post v-else :is-sidebar-collapsed="isSidebarOpen" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  width: 100%;
  max-width: 100%;
  flex-grow: 1;
  flex-shrink: 0;
  padding-top: var(--global-header-height);
  margin: var(--vp-layout-top-height, 0px) auto 0;
  transition: padding-left var(--transition-duration);
}
</style>
