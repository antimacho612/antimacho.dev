export const getLangFromPath = (path: string) => {
  const matches = path.replace(/^\/cheat-sheets/, '').match(/\/(.*?)\//);
  return matches ? matches[1] : undefined;
};
