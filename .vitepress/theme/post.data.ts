import { type ContentData, createContentLoader } from 'vitepress';
import { Post } from './types';

const getLangFromPath = (path: string) => {
  const matches = path.replace(/^\/posts/, '').match(/\/(.*?)\//);
  return matches ? matches[1] : undefined;
};

const contentDataToPostData = (contentData: ContentData): Post => {
  return {
    frontmatter: contentData.frontmatter,
    title: contentData.frontmatter.title ?? contentData.url.split('/').at(-1),
    lang: getLangFromPath(contentData.url),
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
    return data.map(contentDataToPostData);
  },
};

declare const data: Post[];
export { data };
