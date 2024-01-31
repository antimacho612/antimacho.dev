import { PageData } from 'vitepress';

export interface ThemeConfig {
  gitHubUrl?: string;
  tableOfContent?: {
    label?: string;
    levelRange?: [number, number];
  };
  editLink?: {
    text?: string;
    pattern: string | ((payload: PageData) => string);
  };
  langImages?: {
    [lang: string]: string;
  };
}

export interface Post {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  frontmatter: Record<string, any>;
  title: string;
  lang?: string;
  createdAt?: string;
  updatedAt?: string;
  url: string;
}

export type SidebarLink = {
  title: string;
  url: string;
};

export type HomeTabPanelItem = {
  label: string;
  lang?: string;
  posts: Post[];
  filteredPosts: Post[];
};
