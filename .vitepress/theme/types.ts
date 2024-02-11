import { PageData } from 'vitepress';

export interface Category {
  label?: string;
  /**
   * カテゴリの並びの優先度（e.g. ホーム画面のタブメニュー）
   * 数字が大きいカテゴリが前に来る
   * 無指定の場合は優先度`0`として扱われる
   * 負数を指定すれば後ろに持って行くことができる
   * 同じ数字のカテゴリはカテゴリ名の昇順で並ぶ
   */
  priority?: number;
  imageSrc?: string;
}

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
  categories?: {
    [key: string]: Category;
  };
}

export interface Post {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  frontmatter: Record<string, any>;
  title: string;
  category?: string;
  createdAt?: string;
  updatedAt?: string;
  url: string;
}

export type SidebarLink = {
  title: string;
  url: string;
};
