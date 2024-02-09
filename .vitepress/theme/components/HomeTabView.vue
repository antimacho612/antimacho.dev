<script setup lang="ts">
import { computed, nextTick } from 'vue';
import { watchDebounced } from '@vueuse/core';
import { useHomeTab } from '../composables/useHomeTab';
import { Post } from '../types';
import { Order, getPostsSortOptions, sortArrayOfObjects, PostsSortKey } from '../utils/sort';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import CategoryImage from './CategoryImage.vue';
import PostLinkCards from './PostLinkCards.vue';

interface Props {
  searchText: string;
  sortBy: PostsSortKey;
  order: Order;
}

const props = defineProps<Props>();

const { panelItems } = useHomeTab();

const sortOption = computed(() => getPostsSortOptions(props.sortBy, props.order));
const sortPosts = (posts: readonly Post[]) => sortArrayOfObjects(posts, sortOption.value);

watchDebounced(
  sortOption,
  () => {
    panelItems.value.forEach((item) => {
      item.filteredPosts = sortPosts(item.filteredPosts);
    });
  },
  { debounce: 200, maxWait: 400 }
);

watchDebounced(
  () => props.searchText,
  () => {
    if (props.searchText === '') {
      panelItems.value.forEach((item) => {
        item.filteredPosts = sortPosts(item.posts);
      });
    } else {
      const searchStr = props.searchText.toLocaleLowerCase();
      panelItems.value.forEach((item) => {
        const filtered = item.posts.filter((post) => post.title.toLocaleLowerCase().includes(searchStr));
        item.filteredPosts = sortPosts(filtered);
      });
    }
  },
  { debounce: 500, maxWait: 1000 }
);

// TODO: Fix
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
  <TabView scrollable class="home-tab-view" @tab-click="onTabClick">
    <TabPanel v-for="item in panelItems" :key="item.label">
      <template #header>
        <div class="tab-header">
          <CategoryImage :category="item.category" class="image" />
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
    background-color: var(--surface-ground);
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
