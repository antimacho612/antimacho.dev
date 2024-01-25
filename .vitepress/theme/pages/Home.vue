<script setup lang="ts">
import { ref } from 'vue';
import { onContentUpdated } from 'vitepress';
import { data as cheatSheets } from '../cheat-sheets.data';
import { getLangFromPath } from '../utils/grouping';

import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
import QuickSearchInput from '../components/QuickSearchInput.vue';
import CardLinks from '../components/CardLinks.vue';

const searchText = ref('');

const groups = ref([]);

const resolveGroup = () => {
  groups.value = cheatSheets.reduce((acc, cur) => {
    const lang = getLangFromPath(cur.url);
    const found = acc.find((group) => group.lang === lang);

    if (found) {
      found.cheatSheets.push(cur);
    } else {
      acc.push({
        lang,
        cheatSheets: [cur],
      });
    }

    return acc;
  }, []);
};

// const currentGroup = computed(() => cheatSheets);

resolveGroup();

onContentUpdated(() => {});
</script>

<template>
  <div class="home">
    <div class="title-container">
      <h1 class="title">My Cheat Sheets</h1>
    </div>
    <div class="content-container">
      <QuickSearchInput v-model="searchText" class="quick-search" />

      <div class="list">
        <TabView scrollable class="tab-view">
          <TabPanel>
            <template #header>
              <div class="tab-header">
                <span style="line-height: 1.5rem">すべて ({{ cheatSheets.length }})</span>
              </div>
            </template>

            <CardLinks :cheat-sheets="cheatSheets" />
          </TabPanel>

          <TabPanel>
            <template #header>
              <div class="tab-header">
                <img
                  src="/icons/javascript.svg"
                  alt=""
                  width="24"
                  height="24"
                  style="flex-shrink: 0; width: 1.5rem; height: 1.5rem"
                />
                <span style="flex-shrink: 0; line-height: 1.5rem">JavaScript (1)</span>
              </div>
            </template>

            <CardLinks :cheat-sheets="cheatSheets" />
          </TabPanel>
        </TabView>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 2rem 6rem;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.quick-search {
  width: 100%;
  max-width: 600px;
}

.list {
  width: 100%;
}

.tab-view {
  :deep(.p-tabview-nav) {
    background: var(--surface-ground);
  }
  :deep(.p-tabview-header) {
    flex-shrink: 0;
  }
  :deep(.p-tabview-nav-link) {
    background: var(--surface-ground);
    padding: 0.75rem;
  }
  :deep(.p-tabview-panels) {
    background: var(--surface-ground);
  }
}

.tab-header {
  display: flex;
  align-items: center;
  column-gap: 0.25rem;
}
</style>
