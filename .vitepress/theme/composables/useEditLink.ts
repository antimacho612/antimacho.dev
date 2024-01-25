import { computed } from 'vue';
import { useData } from 'vitepress';

export const useEditLink = () => {
  const { theme, page } = useData();

  return computed(() => {
    const { text = 'このページを編集する', pattern = '' } = theme.value.editLink || {};
    const url = typeof pattern === 'function' ? pattern(page.value) : pattern.replace(/:path/g, page.value.filePath);
    return { text, url };
  });
};
