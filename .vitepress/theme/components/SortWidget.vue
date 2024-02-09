<script setup lang="ts">
import { computed, ref } from 'vue';
import { MenuItem } from 'primevue/menuitem';
import { Order } from '../utils/sort';
import Button from 'primevue/button';
import Menu from 'primevue/menu';
import SortIcon from './icons/SortIcon.vue';

export type SortMenuItem = {
  label: string;
  sortBy: string;
  order: Order;
};

const sortBy = defineModel<string>('sortBy', { required: true });
const order = defineModel<Order>('order', { required: true });
const props = defineProps<{ items: SortMenuItem[] }>();

const buttonLabel = computed(
  () => props.items.find((item) => item.sortBy === sortBy.value && item.order === order.value)?.label
);

const menuEl = ref();
const onClickButton = (e: MouseEvent) => {
  menuEl.value?.toggle(e);
};

const onClickMenuItem = (item: MenuItem) => {
  sortBy.value = item.sortBy;
  order.value = item.order;
};
</script>

<template>
  <div class="sort-widget">
    <Button
      type="button"
      text
      rounded
      class="toggle-menu-button"
      aria-haspopup="true"
      aria-controls="overlay_menu"
      @click="onClickButton"
    >
      <SortIcon class="sort-icon" />
      <span class="label">{{ buttonLabel }}</span>
    </Button>
    <Menu ref="menuEl" id="overlay_menu" :model="items" :popup="true">
      <template #item="{ item, props }">
        <a
          v-ripple
          class="menu-item"
          :class="{ selected: item.sortBy === sortBy && item.order === order }"
          v-bind="props.action"
          @click="onClickMenuItem(item)"
        >
          {{ item.label }}
        </a>
      </template>
    </Menu>
  </div>
</template>

<style lang="scss" scoped>
.toggle-menu-button {
  width: 11rem;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  font-size: 0.9rem;

  .sort-icon {
    --size: 1.375rem;
    flex-shrink: 0;
    width: var(--size);
    height: var(--size);
  }

  .label {
    display: inline-block;
    flex: 1 0 auto;
    text-align: center;
  }
}

.menu-item {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;

  &.selected {
    color: var(--primary-color);
  }
}
</style>
