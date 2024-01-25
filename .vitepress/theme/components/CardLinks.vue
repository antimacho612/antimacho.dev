<script setup lang="ts">
import { CheatSheet } from '../types';
import CardLink from './CardLink.vue';

defineProps<{ cheatSheets: CheatSheet[] }>();
</script>

<template>
  <div class="card-links">
    <CardLink
      v-for="cheatSheet in cheatSheets"
      :key="cheatSheet.url"
      :cheat-sheet="cheatSheet"
      img-src="/icons/javascript.svs"
    />
  </div>
</template>

<style lang="scss" scoped>
.card-links {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 2rem;
}
</style>
