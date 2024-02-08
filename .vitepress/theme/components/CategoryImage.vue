<script setup lang="ts">
import { ref } from 'vue';
import { getCategoryImage } from '../utils/utils';

const props = defineProps<{ category?: string }>();

const src = getCategoryImage(props.category);
const show = ref(!!src);
</script>

<template>
  <img v-if="show" :src="src" :alt="`${category} image`" class="category-image" @error="show = false" />
</template>

<style scoped>
.category-image {
  object-fit: contain;
  border-radius: 4px;
}
</style>
