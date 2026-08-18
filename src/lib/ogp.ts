import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * ページの OGP メタタグを取得する。
 *
 * ビルド時に外部サイトへ fetch するため、結果は cache/og/ 配下にキャッシュする
 * （dev のたびに再取得しない、ビルド時に対象サイトが落ちていても失敗させないため）。
 * 取得に失敗した場合は例外を投げず、空オブジェクトを返す。
 */

export interface Ogp {
  title?: string;
  description?: string;
  imageUrl?: string;
}

const CACHE_DIR = path.join(process.cwd(), 'cache', 'og');
const FETCH_TIMEOUT_MS = 5000;
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36';

function cachePath(url: string): string {
  const hash = createHash('sha256').update(url).digest('hex');
  return path.join(CACHE_DIR, `${hash}.json`);
}

async function readCache(url: string): Promise<Ogp | undefined> {
  try {
    const raw = await readFile(cachePath(url), 'utf-8');
    return JSON.parse(raw) as Ogp;
  } catch {
    return undefined;
  }
}

async function writeCache(url: string, ogp: Ogp): Promise<void> {
  try {
    await mkdir(CACHE_DIR, { recursive: true });
    await writeFile(cachePath(url), JSON.stringify(ogp), 'utf-8');
  } catch {
    // キャッシュへの書き込みに失敗してもビルドは継続する
  }
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'");
}

function extractMetaContent(html: string, key: string): string | undefined {
  const attr = `(?:property|name)=["']${key}["']`;
  const content = `content=["']([^"']*)["']`;
  const patterns = [new RegExp(`<meta[^>]*${attr}[^>]*${content}`, 'i'), new RegExp(`<meta[^>]*${content}[^>]*${attr}`, 'i')];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) return decodeHtmlEntities(match[1].trim());
  }
  return undefined;
}

function extractTitleTag(html: string): string | undefined {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? decodeHtmlEntities(match[1].trim()) : undefined;
}

function resolveUrl(maybeRelative: string, base: string): string | undefined {
  try {
    return new URL(maybeRelative, base).href;
  } catch {
    return undefined;
  }
}

async function fetchOgpFromNetwork(url: string): Promise<Ogp> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    let response: Response;
    try {
      response = await fetch(url, {
        signal: controller.signal,
        headers: { 'User-Agent': USER_AGENT, Accept: 'text/html' },
      });
    } finally {
      clearTimeout(timeout);
    }

    const contentType = response.headers.get('content-type') ?? '';
    if (!response.ok || !contentType.includes('text/html')) return {};

    const html = await response.text();

    const title = extractMetaContent(html, 'og:title') ?? extractTitleTag(html);
    const description = extractMetaContent(html, 'og:description') ?? extractMetaContent(html, 'description');
    const rawImage = extractMetaContent(html, 'og:image');
    const imageUrl = rawImage ? resolveUrl(rawImage, url) : undefined;

    return { title, description, imageUrl };
  } catch (error: unknown) {
    console.warn(`[LinkCard] OGP の取得に失敗しました: ${url} (${error instanceof Error ? error.message : error})`);
    return {};
  }
}

export async function fetchOgp(url: string): Promise<Ogp> {
  const cached = await readCache(url);
  if (cached) return cached;

  const ogp = await fetchOgpFromNetwork(url);
  await writeCache(url, ogp);
  return ogp;
}
