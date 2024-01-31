<script setup lang="ts">
withDefaults(defineProps<{ values: string[] }>(), { values: () => [] });
</script>

<template>
  <div class="key-combination">
    <Key v-for="(value, index) in values" :key="index" :value="value" />
  </div>
</template>

<style lang="scss" scoped>
.key-combination {
  position: relative;
  display: inline-block;

  .key + .key {
    margin-left: 1.25rem;

    &::before {
      content: '+';
      position: absolute;
      top: 50%;
      left: calc(-1.25rem + -1px);
      width: 1.25rem;
      text-align: center;
      transform: translateY(-50%);
    }
  }
}
</style>
