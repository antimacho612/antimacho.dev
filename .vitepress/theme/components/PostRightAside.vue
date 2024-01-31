<script setup lang="ts">
import TableOfContent from './TableOfContent.vue';
</script>

<template>
  <div class="post-right-aside">
    <div class="curtain" />

    <div class="container">
      <div class="content">
        <TableOfContent />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-right-aside {
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

.container {
  position: fixed;
  top: 0;
  padding-top: calc(var(--global-header-height) + 3rem);
  width: var(--table-of-content-width);
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.content {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - (var(--global-header-height) + 3rem));
  padding-bottom: 2rem;
}

.curtain {
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: var(--table-of-content-width);
  height: 2rem;
  background: linear-gradient(transparent, var(--surface-ground) 70%);
}
</style>
