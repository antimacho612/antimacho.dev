<script setup lang="ts">
import { ref } from 'vue';
import { getLangImage } from '../utils/utils';

const props = defineProps<{ lang?: string }>();

const src = getLangImage(props.lang);
const show = ref(!!src);
</script>

<template>
  <img v-if="show" :src="src" :alt="`${lang} image`" class="lang-image" @error="show = false" />
</template>

<style scoped>
.lang-image {
  object-fit: contain;
  border-radius: 4px;
}
</style>
