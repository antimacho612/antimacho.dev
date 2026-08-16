/**
 * コミット時に記事の frontmatter の日付を更新する（lint-staged から呼ばれる）。
 *
 * - createdAt が無ければ現在時刻を入れる（＝新規記事）
 * - createdAt が既にあれば updatedAt を現在時刻で上書きする
 *
 * 新規記事にいきなり updatedAt が付くと「更新」表示が出てしまうため、
 * 初回は createdAt だけを入れる。
 */
import fsAsync from 'fs/promises';
import grayMatter from 'gray-matter';

(async () => {
  const now = new Date();
  const local = new Date(now - now.getTimezoneOffset() * 6e4);
  const nowISO8601 = `${local.toISOString().slice(0, -5)}${local
    .toString()
    .match(/[-+]..../)[0]
    .replace(/(..)$/, ':$1')}`;

  const [, , ...filePaths] = process.argv;

  await Promise.all(
    filePaths.map(async (path) => {
      const file = grayMatter.read(path);
      const { data: frontmatter } = file;

      file.data = frontmatter.createdAt
        ? { ...frontmatter, updatedAt: nowISO8601 }
        : { ...frontmatter, createdAt: nowISO8601 };

      await fsAsync.writeFile(path, grayMatter.stringify(file));
    })
  );
})();
