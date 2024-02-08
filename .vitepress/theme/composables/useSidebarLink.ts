import { computed } from 'vue';
import { useData } from 'vitepress';
import { data as posts } from '../post.data';
import { SidebarLink } from '../types';
import { getCategoryFromPath } from '../utils/utils';
import { isActive } from '../utils/link';

export const useSidebarLink = () => {
  const { page } = useData();

  const getLinks = (category?: string): SidebarLink[] =>
    posts.filter((post) => post.category === category).map(({ title, url }) => ({ title, url }));

  const category = computed(() => getCategoryFromPath(page.value.filePath));
  const links = computed(() => getLinks(category.value));

  const isActiveLink = (path: string) => isActive(page.value.relativePath, path);

  return { category, links, isActiveLink };
};
