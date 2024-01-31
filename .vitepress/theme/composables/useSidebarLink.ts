import { computed } from 'vue';
import { useData } from 'vitepress';
import { data as posts } from '../post.data';
import { SidebarLink } from '../types';
import { getLangFromPath } from '../utils/utils';
import { isActive } from '../utils/link';

export const useSidebarLink = () => {
  const { page } = useData();

  const getLinks = (lang?: string): SidebarLink[] =>
    posts.filter((post) => post.lang === lang).map(({ title, url }) => ({ title, url }));

  const lang = computed(() => getLangFromPath(page.value.filePath));
  const links = computed(() => getLinks(lang.value));

  const isActiveLink = (path: string) => isActive(page.value.relativePath, path);

  return { lang, links, isActiveLink };
};
