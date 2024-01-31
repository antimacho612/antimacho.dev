<script setup lang="ts">
import { Post } from '../types';
import PostLinkCard from './PostLinkCard.vue';

defineProps<{ posts: Post[] }>();
</script>

<template>
  <div class="post-link-cards">
    <PostLinkCard v-for="post in posts" :key="post.url" :post="post" />
  </div>
</template>

<style lang="scss" scoped>
.post-link-cards {
  width: 100%;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(1, 1fr);

  @include mq(md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @include mq(xl) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
