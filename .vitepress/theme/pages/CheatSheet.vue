<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vitepress';
import TableOfContent from '../components/TableOfContent.vue';
import DocHeader from '../components/DocHeader.vue';
import DocFooter from '../components/DocFooter.vue';
import BackToTop from '../components/BackToTop.vue';
import FloatingToc from '../components/FloatingToc.vue';

const route = useRoute();
const pageName = computed(() => route.path.replace(/[./]+/g, '_').replace(/_html$/, ''));
</script>

<template>
  <div class="cheat-sheet">
    <div class="container">
      <div class="aside">
        <div class="aside-curtain" />

        <div class="aside-container">
          <div class="aside-content">
            <TableOfContent />
          </div>
        </div>
      </div>

      <div class="content">
        <div class="content-container">
          <main class="main">
            <DocHeader />
            <Content class="md-content" :class="[pageName]" />
            <DocFooter />
          </main>
        </div>
      </div>
    </div>

    <FloatingToc />
    <BackToTop />
  </div>
</template>

<style lang="scss" scoped>
.cheat-sheet {
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

.aside {
  position: relative;
  display: none;
  order: 2;
  flex-grow: 1;
  padding-left: 2rem;
  width: 100%;
  max-width: calc(var(--table-of-content-width) + 2rem);

  @include mq(lg) {
    display: block;
  }
}

.aside-container {
  position: fixed;
  top: 0;
  padding-top: calc(var(--global-header-height) + 3rem);
  width: var(--table-of-content-width);
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;
}

.aside-container::-webkit-scrollbar {
  display: none;
}

.aside-curtain {
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: var(--table-of-content-width);
  height: 2rem;
  background: linear-gradient(transparent, var(--surface-ground) 70%);
}

.aside-content {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - (var(--global-header-height) + 3rem));
  padding-bottom: 2rem;
}

.content {
  position: relative;
  margin: 0 auto;
  width: 100%;

  @include mq(lg) {
    .content {
      padding: 0 2rem 3rem;
    }
  }

  @include mq(xl) {
    .content {
      order: 1;
      margin: 0;
      min-width: 40rem;
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
