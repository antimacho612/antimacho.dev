/**
 * コミット時に記事の frontmatter の日付を更新する（lint-staged から呼ばれる）。
 *
 * - createdAt が無ければ今日の日付を入れる（＝新規記事）
 * - createdAt が既にあれば updatedAt を今日の日付で上書きする
 *
 * 日付は JST の YYYY-MM-DD 文字列に正規化して書き戻す。
 * YAML は無引用の日付を Date として読むため、そのまま書き戻すと毎回
 * `2026-08-16T00:00:00.000Z` のような表記に膨らんでしまう。
 */
import fsAsync from 'fs/promises';
import grayMatter from 'gray-matter';

/** Date | string | undefined → 'YYYY-MM-DD'（JST） */
function toDateString(value) {
  const date = value instanceof Date ? value : value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Tokyo' }).format(date);
}

(async () => {
  const today = toDateString(new Date());
  const [, , ...filePaths] = process.argv;

  await Promise.all(
    filePaths.map(async (path) => {
      const file = grayMatter.read(path);
      const { data: frontmatter } = file;

      file.data = frontmatter.createdAt
        ? { ...frontmatter, createdAt: toDateString(frontmatter.createdAt), updatedAt: today }
        : { ...frontmatter, createdAt: today };

      await fsAsync.writeFile(path, grayMatter.stringify(file));
    })
  );
})();
