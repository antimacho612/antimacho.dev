<script setup lang="ts">
withDefaults(defineProps<{ value: string }>(), { value: '' });
</script>

<template>
  <div class="key">{{ value }}</div>
</template>

<style lang="scss" scoped>
.key {
  position: relative;
  display: inline-block;
  font-family: var(--font-family-mono);
  font-size: 0.85rem;
  padding: 0.175rem 0.25rem;
  color: var(--text-color);
  background-color: var(--surface-200);
  border: 1px solid var(--surface-border);
  border-radius: var(--border-radius);
}
</style>
