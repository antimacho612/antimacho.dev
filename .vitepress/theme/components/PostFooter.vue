<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import { useEditLink } from '../composables/useEditLink';
import Link from './Link.vue';
import EditIcon from './icons/EditIcon.vue';

const { theme } = useData();
const editLink = useEditLink();
const hasEditLink = computed(() => theme.value.editLink);
</script>

<template>
  <footer v-if="hasEditLink" class="post-footer">
    <div class="edit-info">
      <Link class="edit-link-anchor" :href="editLink.url" :no-icon="true">
        <EditIcon class="edit-link-icon" aria-label="edit icon" />
        {{ editLink.text }}
      </Link>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.post-footer {
  margin-top: 4rem;
  padding-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.edit-link-anchor {
  display: flex;
  align-items: center;
  border: 0;
  line-height: 2rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--primary-color);
  transition: color var(--transition-duration);

  &:hover {
    text-decoration: underline;
  }
}

.edit-link-icon {
  --size: 1.25rem;
  margin-right: 0.25rem;
  width: var(--size);
  height: var(--size);
  fill: currentColor;
}
</style>
