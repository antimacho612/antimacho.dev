<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vitepress';

import PostRightAside from '../components/PostRightAside.vue';
import PostHeader from '../components/PostHeader.vue';
import PostFooter from '../components/PostFooter.vue';
import BackToTop from '../components/BackToTop.vue';
import FloatingToc from '../components/FloatingToc.vue';

defineProps<{ isSidebarCollapsed: boolean }>();

const route = useRoute();
const pageName = computed(() => route.path.replace(/[./]+/g, '_').replace(/_html$/, ''));
</script>

<template>
  <div class="post">
    <div class="container">
      <PostRightAside />

      <div class="content" :class="{ 'has-sidebar': isSidebarCollapsed }">
        <div class="content-container">
          <main class="main">
            <PostHeader />
            <Content class="md-content" :class="[pageName]" />
            <PostFooter />
          </main>
        </div>
      </div>
    </div>

    <FloatingToc />
    <BackToTop />
  </div>
</template>

<style lang="scss" scoped>
.post {
  width: 100%;
  padding: 2rem 1.5rem 5.5rem;

  @include mq(lg) {
    padding: 3rem 2rem 0;

    .container {
      display: flex;
      justify-content: center;
    }
  }
}

.container {
  margin: 0 auto;
  width: 100%;
}

.content {
  position: relative;
  margin: 0 auto;
  width: 100%;

  @include mq(lg) {
    padding: 0 2rem 3rem;
  }

  @include mq(xl) {
    order: 1;
    margin: 0;
    min-width: 40rem;
    transition: padding-left var(--transition-duration);

    &.has-sidebar {
      padding-left: var(--sidebar-width);
    }
  }
}

.content-container {
  margin: 0 auto;
}

.main {
  display: block;
}
</style>
