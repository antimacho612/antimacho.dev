<script setup lang="ts">
import { ref } from 'vue';
import { useData } from 'vitepress';
import { Order, PostsSortKey } from '../utils/sort';
import QuickSearchInput from '../components/QuickSearchInput.vue';
import SortWidget, { type SortMenuItem } from '../components/SortWidget.vue';
import HomeTabView from '../components/HomeTabView.vue';

const { site } = useData();

const searchText = ref('');

const SORT_OPTIONS: SortMenuItem[] = [
  { label: 'タイトルの昇順', sortBy: 'Title', order: 'Asc' },
  { label: 'タイトルの降順', sortBy: 'Title', order: 'Desc' },
  { label: '作成日が新しい順', sortBy: 'CreatedAt', order: 'Desc' },
  { label: '作成日が古い順', sortBy: 'CreatedAt', order: 'Asc' },
  { label: '更新日が新しい順', sortBy: 'UpdatedAt', order: 'Desc' },
  { label: '更新日が古い順', sortBy: 'UpdatedAt', order: 'Asc' },
];
const sortBy = ref<PostsSortKey>('CreatedAt');
const order = ref<Order>('Desc');
</script>

<template>
  <div class="home">
    <div class="title-container">
      <h1 class="title">{{ site.title }}</h1>
    </div>
    <div id="content-container" class="content-container">
      <div class="actions-container">
        <div></div>
        <QuickSearchInput v-model="searchText" class="quick-search" />
        <SortWidget v-model:sortBy="sortBy" v-model:order="order" :items="SORT_OPTIONS" />
      </div>

      <HomeTabView :searchText="searchText" :sortBy="sortBy" :order="order" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem 5.5rem;

  @include mq(lg) {
    padding: 3rem 2rem 0;
  }
}

.title-container {
  width: 100%;
  display: flex;
  justify-content: center;

  .title {
    display: inline-block;
    padding-bottom: 2rem;
    font-size: 2.5rem;
    font-weight: bold;
    background: var(--title-gradient);
    background: var(--title-gradient-webkit);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @include mq(md) {
      font-size: 4rem;
    }

    @include mq(lg) {
      font-size: 5rem;
    }
  }
}

.content-container {
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.actions-container {
  width: 100%;
  padding: 1rem 0;
  display: grid;
  grid-template-columns: 0 1fr 11rem;
  @include mq(lg) {
    grid-template-columns: 11rem 1fr 11rem;
  }
  column-gap: 0.5rem;
  background-color: var(--surface-ground);
  position: sticky;
  top: var(--global-header-height);
  z-index: var(--z-index-sticky-quick-search-input);

  .quick-search {
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
  }

  .sort-widget {
    margin-right: auto;
  }
}
</style>
