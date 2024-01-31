<script setup lang="ts">
import { Ref, inject, nextTick } from 'vue';
import { watchDebounced } from '@vueuse/core';
import { useHomeTab } from '../composables/useHomeTab';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import LangImage from './LangImage.vue';
import PostLinkCards from './PostLinkCards.vue';

const { panelItems } = useHomeTab();
const searchText = inject<Ref<string>>('searchText');

if (searchText) {
  watchDebounced(
    searchText,
    () => {
      if (searchText.value === '') {
        panelItems.value.forEach((item) => {
          item.filteredPosts = item.posts;
        });
      } else {
        const searchStr = searchText.value.toLocaleLowerCase();
        panelItems.value.forEach((item) => {
          item.filteredPosts = item.posts.filter((post) => post.title.toLocaleLowerCase().includes(searchStr));
        });
      }
    },
    { debounce: 500, maxWait: 1000 }
  );
}

const onTabClick = () => {
  nextTick(() => {
    const contentContainer = document.querySelector('#content-container');
    if (contentContainer) {
      const scrollY = window.scrollY;
      const { y } = contentContainer.getBoundingClientRect();
      window.scrollTo({ top: scrollY + y - 64, behavior: 'smooth' });
    }
  });
};
</script>

<template>
  <TabView scrollable class="home-tab-view vp-raw" @tab-click="onTabClick">
    <TabPanel v-for="item in panelItems" :key="item.label">
      <template #header>
        <div class="tab-header">
          <LangImage :lang="item.lang" class="image" />
          <span class="label">{{ item.label }} ({{ item.filteredPosts.length }})</span>
        </div>
      </template>

      <PostLinkCards v-if="item.filteredPosts.length" :posts="item.filteredPosts" />
      <div v-else class="no-post">該当する記事がありません🤨</div>
    </TabPanel>
  </TabView>
</template>

<style lang="scss" scoped>
.home-tab-view {
  width: 100%;

  :deep(.p-tabview-nav) {
    background: var(--surface-ground);
  }
  :deep(.p-tabview-header) {
    flex-shrink: 0;
  }

  :deep(.p-tabview-nav-container) {
    position: sticky;
    top: calc(var(--global-header-height) + var(--quick-search-input-height) + 2rem);
    z-index: var(--z-index-sticky-home-tabmenu);
  }

  :deep(.p-tabview-nav-link) {
    background: var(--surface-ground);
    padding: 0.75rem;
  }

  :deep(.p-tabview-panels) {
    background: var(--surface-ground);
    padding: 1.25rem 0;

    @include mq(md) {
      padding: 1.25rem;
    }
  }
}

.tab-header {
  display: flex;
  align-items: center;
  column-gap: 0.5rem;

  .image {
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
  }

  .label {
    flex-shrink: 0;
    line-height: 1.5rem;
  }
}

.no-post {
  width: 100%;
  font-size: 1.125rem;
  font-weight: 500;
}
</style>
