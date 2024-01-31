<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import InputText from 'primevue/inputtext';

import SearchIcon from './icons/SearchIcon.vue';
import XMarkIcon from './icons/XMarkIcon.vue';

const props = withDefaults(defineProps<{ modelValue?: string }>(), { modelValue: '' });

const emits = defineEmits<{ 'update:modelValue': [value: string] }>();

const inputText = computed({
  get: () => props.modelValue,
  set: (value: string) => emits('update:modelValue', value),
});

const containerEl = ref<HTMLDivElement>();
let inputEl: HTMLInputElement | null;

onMounted(() => {
  if (containerEl.value) {
    inputEl = containerEl.value.querySelector<HTMLInputElement>('input');
  }
});

const onClickXMarkIcon = () => {
  emits('update:modelValue', '');
  inputEl?.focus();
};

const showXMarkIcon = computed(() => inputText.value !== '');

const focused = ref(false);
const onFocus = () => {
  focused.value = true;
  inputEl?.select();
};
</script>

<template>
  <div ref="containerEl" class="quick-search-input" :class="{ focused }">
    <span class="wrapper p-input-icon-left p-input-icon-right">
      <SearchIcon class="search-icon" />
      <XMarkIcon v-if="showXMarkIcon" class="x-mark-icon" @click="onClickXMarkIcon" />
      <InputText v-model="inputText" class="input-text" placeholder="検索" @focus="onFocus" @blur="focused = false" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.quick-search-input {
  --icon-size: 1.5rem;
}

.search-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0.75rem;
  margin: 0;
  width: var(--icon-size);
  height: var(--icon-size);
  color: var(--text-color-secondary);
  transition: color var(--transition-duration);
  z-index: 1;
}

.quick-search-input.focused .search-icon {
  color: var(--primary-color);
}

.wrapper {
  width: 100%;
}

.input-text {
  width: 100%;
  height: var(--quick-search-input-height);
  padding-top: 0;
  padding-bottom: 0;
  border-radius: 9999px;
}

.x-mark-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 0.75rem;
  margin: 0;
  width: var(--icon-size);
  height: var(--icon-size);
  color: var(--text-color-secondary);
  transition: color var(--transition-duration);
  cursor: pointer;
  z-index: 2;

  &:hover {
    color: var(--red-400);
  }
}
</style>
