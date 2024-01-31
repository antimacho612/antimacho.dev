<script setup lang="ts">
import { getDomainFromUrl } from '../../utils/utils';

interface Props {
  url: string;
  label: string;
  imageUrl?: string;
  description?: string;
}
const props = defineProps<Props>();

const domain = getDomainFromUrl(props.url);
</script>

<template>
  <a :href="url" rel="noreferrer" target="_blank" class="link-card" :title="label">
    <img :src="imageUrl" :alt="label" class="thumbnail" />
    <div class="main">
      <div class="upper">
        <div class="title">{{ label }}</div>
        <p class="description">{{ description }}</p>
      </div>
      <div class="bottom">
        <img
          :src="`https://www.google.com/s2/u/0/favicons?domain=${getDomainFromUrl(props.url)}`"
          :alt="domain"
          class="domain-thumbnail"
        />
        <div class="domain-name">{{ domain }}</div>
      </div>
    </div>
  </a>
</template>

<style lang="scss" scoped>
.link-card {
  --height: 6rem;
  display: flex;
  width: 95%;
  height: var(--height);
  margin: 1rem auto;
  text-decoration: none;
  background-color: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: var(--border-radius);
  overflow: hidden;
  transition: border-color var(--transition-duration);

  &:hover {
    border-color: var(--primary-color);
  }

  &:focus {
    outline: none;
    outline-offset: 0;
    box-shadow: var(--focus-ring);
    border-color: var(--primary-color);
  }
}

.thumbnail {
  flex-shrink: 0;
  width: var(--height);
  height: var(--height);
  border-radius: var(--border-radius);
  object-fit: cover;
}

.main {
  flex: 1 1 auto;
  padding: 0.5rem 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .upper {
    flex: 1 0 auto;
    width: 100%;
  }

  .bottom {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}

.title {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-color) !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.description {
  margin: 0;
  padding-left: 0.5rem;
  font-size: 0.85rem;
  font-weight: normal;
  line-height: 1.2rem;
  color: var(--text-color-secondary) !important;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.domain-thumbnail {
  width: 1.125rem;
  height: 1.125rem;
  margin-right: 0.25rem;
  object-fit: cover;
}

.domain-name {
  color: var(--text-color) !important;
  font-size: 0.85rem;
  font-weight: normal;
  line-height: 1.4rem;
}
</style>
