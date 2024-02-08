import { useData, withBase } from 'vitepress';
import { ThemeConfig } from '../types';
import { ensureStartingSlash } from './link';

export const formatDate = (date: Date, includeTime = false): string => {
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

export const getCategoryFromPath = (path: string): string | undefined => {
  const matches = path.replace(/^\/posts/, '').match(/\/(.*?)\//);
  return matches ? matches[1] : undefined;
};

export const getCategoryImage = (category?: string): string | undefined => {
  if (!category) {
    return undefined;
  }

  const { theme } = useData<ThemeConfig>();
  if (!theme.value.categories) {
    return undefined;
  }

  const categoryConfig = theme.value.categories[category];
  if (!categoryConfig) {
    return undefined;
  }

  const categoryImageSrc = categoryConfig.imageSrc;
  if (!categoryImageSrc) {
    return undefined;
  }

  return withBase(ensureStartingSlash(categoryImageSrc));
};
