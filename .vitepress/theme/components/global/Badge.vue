<script setup lang="ts">
withDefaults(defineProps<{ text?: string; type?: 'default' | 'primary' | 'info' | 'tip' | 'warning' | 'danger' }>(), {
  type: 'default',
});
</script>

<template>
  <div class="badge" :class="type">
    <slot>{{ text }}</slot>
  </div>
</template>

<style lang="scss" scoped>
.badge {
  display: inline-block;
  margin-left: 0.125rem;
  padding: 0 0.625rem;
  line-height: 1.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--severity-default);
  background-color: var(--severity-default-soft);
  border: 1px solid var(--severity-default);
  border-radius: 9999px;
  transform: translateY(-0.125rem);

  &.info {
    color: var(--severity-info);
    background-color: var(--severity-info-soft);
    border-color: var(--severity-info);
  }

  &.tip {
    color: var(--severity-tip);
    background-color: var(--severity-tip-soft);
    border-color: var(--severity-tip);
  }

  &.warning {
    color: var(--severity-warning);
    background-color: var(--severity-warning-soft);
    border-color: var(--severity-warning);
  }

  &.danger {
    color: var(--severity-danger);
    background-color: var(--severity-danger-soft);
    border-color: var(--severity-danger);
  }
}
</style>
