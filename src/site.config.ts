/** サイト全体の設定。 */

export interface CategoryConfig {
  /** 一覧などに表示する名前。省略時はディレクトリ名をそのまま使う */
  label?: string;
  /**
   * 並び順の優先度。数字が大きいほど前に来る。
   * 未指定は 0 として扱い、同値ならカテゴリ名の昇順。
   */
  priority?: number;
  /** Iconify のアイコン名（例: 'logos:javascript'）。省略時は頭文字のバッジで代替する */
  icon?: string;
}

export const SITE = {
  title: 'antimacho.dev',
  description: 'antimacho の技術メモ',
  lang: 'ja',
  githubUrl: 'https://github.com/antimacho612/antimacho.dev/',
  /** 記事の「GitHub で編集する」リンク。:path はリポジトリルートからの相対パスに置換される */
  editLinkPattern: 'https://github.com/antimacho612/antimacho.dev/blob/main/:path',
  editLinkText: 'このページを GitHub で編集する',
} as const;

/**
 * カテゴリ設定。記事は src/content/posts/<カテゴリ名>/*.mdx に置き、
 * ディレクトリ名がそのままカテゴリ ID になる。ここに無いカテゴリも既定値で表示される。
 */
export const CATEGORIES: Record<string, CategoryConfig> = {
  JavaScript: { priority: 10, icon: 'logos:javascript' },
  HTML: { priority: 20, icon: 'logos:html-5' },
  CSS: { priority: 30, icon: 'logos:css' },
  TypeScript: {},
  General: { label: '一般', priority: -10, icon: 'heroicons:computer-desktop' },
};

export function getCategoryConfig(
  category: string
): Required<Pick<CategoryConfig, 'label' | 'priority'>> & Pick<CategoryConfig, 'icon'> {
  const config = CATEGORIES[category] ?? {};
  return {
    label: config.label ?? category,
    priority: config.priority ?? 0,
    icon: config.icon,
  };
}
