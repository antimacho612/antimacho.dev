<script lang="ts" setup>
import { computed } from 'vue';
import { normalizeLink, isExternalLink } from '../utils/link';

const props = defineProps<{
  tag?: string;
  href?: string;
  noIcon?: boolean;
  target?: string;
  rel?: string;
}>();

const tag = computed(() => props.tag ?? (props.href ? 'a' : 'span'));
const isExternal = computed(() => props.href && isExternalLink(props.href));
</script>

<template>
  <component
    :is="tag"
    class="VPLink"
    :class="{
      link: href,
      'vp-external-link-icon': isExternal,
      'no-icon': noIcon,
    }"
    :href="href ? normalizeLink(href) : undefined"
    :target="target ?? (isExternal ? '_blank' : undefined)"
    :rel="rel ?? (isExternal ? 'noreferrer' : undefined)"
  >
    <slot />
  </component>
</template>
