import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * 記事コレクション。
 *
 * ファイルは src/content/posts/<カテゴリ>/<スラッグ>.mdx に置く。
 * ディレクトリ名がカテゴリ、ファイル名がスラッグになり、そのまま
 * /posts/<カテゴリ>/<スラッグ> の URL になる。index への登録は不要。
 */
const posts = defineCollection({
  loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    /** 記事タイトル。一覧・OGP・<title> に使う */
    title: z.string(),
    /** 一覧カードに出る 1〜2 行の説明 */
    summary: z.string().optional(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    /** true の記事はビルド対象から外れる */
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
