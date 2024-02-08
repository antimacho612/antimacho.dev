import { ref } from 'vue';
import { data as posts } from '../post.data';
import { HomeTabPanelItem } from '../types';

export const useHomeTab = () => {
  const panelItems = ref<HomeTabPanelItem[]>([
    { label: '全て', posts, filteredPosts: posts },
    ...posts.reduce((items, post) => {
      const found = items.find((item) => item.category === post.category);
      if (found) {
        found.posts.push(post);
        found.filteredPosts.push(post);
      } else {
        items.push({ label: post.category ?? '未分類', category: post.category, posts: [post], filteredPosts: [post] });
      }
      return items;
    }, new Array<HomeTabPanelItem>()),
  ]);

  return { panelItems };
};
