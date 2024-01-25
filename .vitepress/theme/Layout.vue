<script setup lang="ts">
import { useData } from 'vitepress';
import { useDark } from './composables/useDark';

import GlobalHeader from './components/GlobalHeader.vue';
import NotFound from './pages/NotFound.vue';
import Home from './pages/Home.vue';
import CheatSheet from './pages/CheatSheet.vue';

const { page } = useData();

useDark();
</script>

<template>
  <div class="layout">
    <GlobalHeader />

    <div id="content" class="content">
      <NotFound v-if="page.isNotFound" />
      <Home v-else-if="page.relativePath === 'index.md'" />
      <CheatSheet v-else />
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
}
</style>
