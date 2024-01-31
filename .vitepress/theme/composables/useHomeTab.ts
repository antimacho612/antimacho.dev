import { ref } from 'vue';
import { data as posts } from '../post.data';
import { HomeTabPanelItem } from '../types';

export const useHomeTab = () => {
  const panelItems = ref<HomeTabPanelItem[]>([
    { label: '全て', posts, filteredPosts: posts },
    ...posts.reduce((items, post) => {
      const found = items.find((item) => item.lang === post.lang);
      if (found) {
        found.posts.push(post);
        found.filteredPosts.push(post);
      } else {
        items.push({ label: post.lang ?? '未分類', lang: post.lang, posts: [post], filteredPosts: [post] });
      }
      return items;
    }, new Array<HomeTabPanelItem>()),
  ]);

  return { panelItems };
};
