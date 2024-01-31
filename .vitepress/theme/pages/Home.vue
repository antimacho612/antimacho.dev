<script setup lang="ts">
import { provide, ref } from 'vue';
import { useData } from 'vitepress';
import QuickSearchInput from '../components/QuickSearchInput.vue';
import HomeTabView from '../components/HomeTabView.vue';

const { site } = useData();

const searchText = ref('');
provide('searchText', searchText);
</script>

<template>
  <div class="home">
    <div class="title-container">
      <h1 class="title">{{ site.title }}</h1>
    </div>
    <div id="content-container" class="content-container">
      <div class="quick-search-input-container">
        <QuickSearchInput v-model="searchText" class="quick-search" />
      </div>
      <HomeTabView />
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

.quick-search-input-container {
  width: 100%;
  padding: 1rem 0;
  background-color: var(--surface-ground);
  position: sticky;
  top: var(--global-header-height);
  z-index: var(--z-index-sticky-quick-search-input);
}

.quick-search {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
</style>
