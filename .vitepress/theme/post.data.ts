import { type ContentData, createContentLoader } from 'vitepress';
import { Post } from './types';
import { sortArrayOfObjects } from './utils/sort';

const getCategoryFromPath = (path: string): string | undefined => {
  const matches = path.replace(/^\/posts/, '').match(/\/(.*?)\//);
  return matches ? matches[1] : undefined;
};

const contentDataToPostData = (contentData: ContentData): Post => {
  return {
    frontmatter: contentData.frontmatter,
    title: contentData.frontmatter.title ?? contentData.url.split('/').at(-1),
    category: getCategoryFromPath(contentData.url),
    createdAt: contentData.frontmatter.createdAt ?? contentData.frontmatter.updatedAt,
    updatedAt: contentData.frontmatter.updatedAt ?? contentData.frontmatter.createdAt,
    url: contentData.url,
  };
};

const loader = createContentLoader('posts/*/*.md');

export default {
  ...loader,
  async load() {
    const data = await loader.load();
    const posts = data.map(contentDataToPostData);
    return sortArrayOfObjects(posts, [{ key: 'createdAt', order: 'Desc' }, { key: 'title' }]);
  },
};

declare const data: Post[];
export { data };
