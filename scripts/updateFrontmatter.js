import fsAsync from 'fs/promises';
import grayMatter from 'gray-matter';

(async () => {
  const now = new Date();
  const temp = new Date(now - now.getTimezoneOffset() * 6e4);
  const nowISO8601 = `${temp.toISOString().slice(0, -5)}${temp
    .toString()
    .match(/[-+]..../)[0]
    .replace(/(..)$/, ':$1')}`;

  const [, , ...mdFilePaths] = process.argv;
  mdFilePaths.forEach(async (path) => {
    const file = grayMatter.read(path);
    const { data: frontmatter } = file;

    file.data = {
      ...frontmatter,
      cratedAt: frontmatter.cratedAt ?? nowISO8601,
      updatedAt: nowISO8601,
    };

    const updatedFileContent = grayMatter.stringify(file);
    await fsAsync.writeFile(path, updatedFileContent);
  });
})();
