<script setup lang="ts">
import { useData, withBase } from 'vitepress';

const { theme } = useData();
</script>

<template>
  <div class="not-found">
    <p class="code">{{ theme.notFound?.code ?? '404' }}</p>

    <h1 class="title">ページが見つかりません😢</h1>

    <div class="action">
      <a class="link" :href="withBase('/')" aria-label="go to home">ホームに戻る</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  padding: 4rem 1.5rem 6rem;
  text-align: center;

  @include mq(md) {
    padding: 6rem 2rem 10.5rem;
  }
}

.code {
  color: var(--red-400);
  line-height: 4rem;
  font-size: 4rem;
  font-weight: 600;
}

.title {
  padding-top: 1rem;
  letter-spacing: 0.125rem;
  line-height: 1.25rem;
  font-size: 1.25rem;
  font-weight: 700;
}

.action {
  padding-top: 2rem;
}

.link {
  display: inline-block;
  border: 1px solid var(--primary-color);
  border-radius: 9999px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: var(--primary-color);
  transition:
    border-color var(--transition-duration),
    color var(--transition-duration);

  &:hover {
    border-color: var(--primary-color-2);
    color: var(--primary-color-2);
  }

  &:focus {
    border-color: var(--primary-color-2) !important;
    @include focused();
  }
}
</style>
