const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** サイト内リンクに base（/antimacho.dev）を付ける。 */
export function withBase(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BASE}${normalized}`;
}
