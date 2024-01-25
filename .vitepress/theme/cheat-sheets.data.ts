import { type ContentData, createContentLoader } from 'vitepress';
import { CheatSheet } from './types';

const contentDataToCheatSheetData = (contentData: ContentData): CheatSheet => {
  return {
    frontmatter: contentData.frontmatter,
    title: contentData.frontmatter.title,
    createdAt: contentData.frontmatter.createdAt ?? contentData.frontmatter.updatedAt,
    updatedAt: contentData.frontmatter.updatedAt ?? contentData.frontmatter.createdAt,
    url: contentData.url,
  };
};

const loader = createContentLoader('cheat-sheets/*/*.md');

export default {
  ...loader,
  async load() {
    const data = await loader.load();
    return data.map(contentDataToCheatSheetData);
  },
};

declare const data: CheatSheet[];
export { data };
