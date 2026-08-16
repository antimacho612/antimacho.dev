import { z } from 'astro/zod';
import type { SandboxSources } from './sandbox';

/**
 * src/demos/ 配下のデモを自動収集する。
 *
 * src/demos/<id>/
 *   index.html   … マークアップ（必須）
 *   style.css    … スタイル（任意）
 *   script.js    … スクリプト（任意）
 *   demo.json    … タイトルや高さなどの設定（任意）
 *
 * ファイルを置くだけで <Demo id="<id>" /> から使える。index への登録は不要。
 * `_` で始まるディレクトリは収集対象外（テンプレート置き場）。
 */

const demoMetaSchema = z.object({
  /** 図のキャプションとして下に表示する説明 */
  title: z.string().optional(),
  /** プレビューの高さ(px)。未指定なら中身の高さに追従する */
  height: z.number().optional(),
  defaultTab: z.enum(['preview', 'html', 'css', 'js']).optional(),
  editable: z.boolean().optional(),
  /** 本文幅を超えて左右に広げる */
  bleed: z.boolean().optional(),
});

export type DemoMeta = z.infer<typeof demoMetaSchema>;

export interface Demo extends SandboxSources {
  id: string;
  meta: DemoMeta;
}

const rawFiles = import.meta.glob('/src/demos/**/*.{html,css,js}', {
  query: '?raw',
  eager: true,
  import: 'default',
}) as Record<string, string>;

const metaFiles = import.meta.glob('/src/demos/**/demo.json', {
  eager: true,
  import: 'default',
}) as Record<string, unknown>;

/** /src/demos/foo/bar/index.html → { id: 'foo/bar', file: 'index.html' } */
function parsePath(path: string): { id: string; file: string } | undefined {
  const relative = path.replace('/src/demos/', '');
  const segments = relative.split('/');
  const file = segments.pop();
  if (!file || segments.length === 0) return undefined;
  // _ 始まりのディレクトリは収集しない
  if (segments.some((segment) => segment.startsWith('_'))) return undefined;
  return { id: segments.join('/'), file };
}

function buildRegistry(): Map<string, Demo> {
  const registry = new Map<string, Demo>();

  const ensure = (id: string): Demo => {
    const existing = registry.get(id);
    if (existing) return existing;
    const demo: Demo = { id, html: '', css: '', js: '', meta: {} };
    registry.set(id, demo);
    return demo;
  };

  for (const [path, content] of Object.entries(rawFiles)) {
    const parsed = parsePath(path);
    if (!parsed) continue;

    const demo = ensure(parsed.id);
    if (parsed.file === 'index.html') demo.html = content;
    else if (parsed.file === 'style.css') demo.css = content;
    else if (parsed.file === 'script.js') demo.js = content;
  }

  for (const [path, content] of Object.entries(metaFiles)) {
    const parsed = parsePath(path);
    if (!parsed) continue;

    const result = demoMetaSchema.safeParse(content);
    if (!result.success) {
      throw new Error(`${path} の内容が不正です: ${result.error.issues.map((i) => i.message).join(', ')}`);
    }
    ensure(parsed.id).meta = result.data;
  }

  return registry;
}

const registry = buildRegistry();

export function getDemo(id: string): Demo {
  const demo = registry.get(id);
  if (!demo) {
    const available = [...registry.keys()].sort().join(', ') || '（1 つもありません）';
    throw new Error(
      `デモ "${id}" が見つかりません。src/demos/${id}/index.html を作成してください。現在あるデモ: ${available}`
    );
  }
  return demo;
}

export function getDemoIds(): string[] {
  return [...registry.keys()].sort();
}
