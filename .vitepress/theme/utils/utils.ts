import { useData } from 'vitepress';
import { ThemeConfig } from '../types';
import { ensureStartingSlash } from './link';

export const formatDate = (date: Date, includeTime = false) => {
  let str;

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  str = `${year}/${month}/${day}`;

  if (includeTime) {
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getHours().toString().padStart(2, '0');
    str += ` ${hour}:${minute}`;
  }

  return str;
};

export const getLangFromPath = (path: string) => {
  const matches = path.replace(/^\/posts/, '').match(/\/(.*?)\//);
  return matches ? matches[1] : undefined;
};

export const getLangImage = (lang?: string): string | undefined => {
  if (!lang) {
    return undefined;
  }

  const { theme } = useData<ThemeConfig>();
  if (!theme.value.langImages || !theme.value.langImages[lang]) {
    return undefined;
  }

  return ensureStartingSlash(theme.value.langImages[lang]);
};

export const getDomainFromUrl = (url: string) => {
  let result;
  let match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?=]+)/im);
  if (match) {
    result = match[1];
    match = result.match(/^[^.]+\.(.+\..+)$/);
    if (match) {
      result = match[1];
    }
  }
  return result;
};
