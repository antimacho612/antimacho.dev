import { getCollection, type CollectionEntry } from 'astro:content';
import { getCategoryConfig } from '../site.config';
import { withBase } from './url';

export type PostEntry = CollectionEntry<'posts'>;

export interface Post {
  entry: PostEntry;
  /** ディレクトリ名そのまま。表示に使う（例: CSS, JavaScript） */
  category: string;
  /** URL に使う小文字のカテゴリ（例: css, javascript） */
  categorySlug: string;
  /** カテゴリを除いたスラッグ */
  slug: string;
  /** base 込みのサイト内 URL */
  url: string;
  title: string;
  summary?: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface CategoryGroup {
  category: string;
  categorySlug: string;
  label: string;
  iconSrc?: string;
  url: string;
  posts: Post[];
}

/**
 * glob ローダーは id をスラッグ化する（= 小文字になる）ため、
 * 表示用のカテゴリ名は元のディレクトリ名を filePath から取り直す。
 */
function toPost(entry: PostEntry): Post {
  const [categorySlug = '', ...rest] = entry.id.split('/');
  const category = entry.filePath?.match(/posts\/([^/]+)\//)?.[1] ?? categorySlug;
  const { createdAt, updatedAt, title, summary, tags } = entry.data;

  return {
    entry,
    category,
    categorySlug,
    slug: rest.join('/'),
    url: withBase(`/posts/${entry.id}`),
    title,
    summary,
    createdAt,
    updatedAt: updatedAt ?? createdAt,
    tags,
  };
}

export function categoryUrl(categorySlug: string): string {
  return withBase(`/categories/${categorySlug}`);
}

/** 新しい順（同着はタイトル昇順）に並べる。 */
function byCreatedAtDesc(a: Post, b: Post): number {
  const diff = b.createdAt.getTime() - a.createdAt.getTime();
  return diff !== 0 ? diff : a.title.localeCompare(b.title, 'ja');
}

/**
 * 公開記事の一覧。draft は本番ビルドでのみ除外する
 * （開発中は下書きも確認できたほうが都合がよいため）。
 */
export async function getPosts(): Promise<Post[]> {
  const entries = await getCollection('posts', ({ data }) => import.meta.env.DEV || !data.draft);
  return entries.map(toPost).sort(byCreatedAtDesc);
}

/**
 * カテゴリごとにまとめる。カテゴリの並びは site.config の priority 降順、
 * 同値ならカテゴリ名の昇順。
 */
export function groupByCategory(posts: Post[]): CategoryGroup[] {
  const groups = new Map<string, Post[]>();
  for (const post of posts) {
    const list = groups.get(post.category);
    if (list) list.push(post);
    else groups.set(post.category, [post]);
  }

  return [...groups.entries()]
    .map(([category, categoryPosts]) => {
      const { label, priority, iconSrc } = getCategoryConfig(category);
      const categorySlug = categoryPosts[0]!.categorySlug;
      return {
        category,
        categorySlug,
        label,
        iconSrc,
        url: categoryUrl(categorySlug),
        priority,
        posts: categoryPosts,
      };
    })
    .sort((a, b) => b.priority - a.priority || a.category.localeCompare(b.category, 'ja'))
    .map(({ priority: _priority, ...group }) => group);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    timeZone: 'Asia/Tokyo',
  }).format(date);
}
