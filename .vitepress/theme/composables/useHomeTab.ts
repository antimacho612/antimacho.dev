import { ref } from 'vue';
import { useData } from 'vitepress';
import { data as posts } from '../post.data';
import { HomeTabPanelItem, ThemeConfig } from '../types';
import { sortArrayOfObjects } from '../utils/sort';

export const useHomeTab = () => {
  const panelItems = ref<HomeTabPanelItem[]>([{ label: '全て', posts: [...posts], filteredPosts: [...posts] }]);

  const { theme } = useData<ThemeConfig>();
  const categoriesConfig = theme.value.categories;

  const categorizedPosts = posts.reduce((items, post) => {
    const found = items.find((item) => item.category === post.category);
    if (found) {
      found.posts.push(post);
      found.filteredPosts.push(post);
    } else {
      const categoryConfig = post.category ? categoriesConfig?.[post.category] : undefined;

      // ラベル
      let label = post.category ?? '未分類';
      if (post.category && categoryConfig) {
        label = categoryConfig.label ?? post.category;
      }

      items.push({
        label,
        category: post.category,
        categoryPriority: categoryConfig?.priority ?? 0,
        posts: [post],
        filteredPosts: [post],
      });
    }
    return items;
  }, new Array<HomeTabPanelItem>());

  panelItems.value.push(
    ...sortArrayOfObjects(categorizedPosts, [{ key: 'categoryPriority', order: 'Desc' }, { key: 'label' }])
  );

  return { panelItems };
};
