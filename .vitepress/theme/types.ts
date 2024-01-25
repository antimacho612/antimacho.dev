import { PageData } from 'vitepress';

export interface ThemeConfig {
  gitHubUrl?: string;
  outline?: {
    label?: string;
    level?: [number, number];
  };
  editLink?: {
    text?: string;
    pattern: string | ((payload: PageData) => string);
  };
  icons?: {
    [lang: string]: string;
  };
}

export interface CheatSheet {
  frontmatter: Record<string, any>;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  url: string;
}
