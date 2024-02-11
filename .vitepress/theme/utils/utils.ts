import { useData, withBase } from 'vitepress';
import { Category, ThemeConfig } from '../types';
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

export const getCategoryConfig = (category?: string): Category | undefined => {
  if (!category) {
    return undefined;
  }

  const { theme } = useData<ThemeConfig>();
  if (!theme.value.categories) {
    return undefined;
  }

  return theme.value.categories[category];
};

export const getCategoryLabel = (category?: string): string => {
  if (!category) return '未分類';
  const categoryConfig = getCategoryConfig(category);
  return categoryConfig?.label ?? category;
};

export const getCategoryImage = (category?: string): string | undefined => {
  const categoryConfig = getCategoryConfig(category);
  const categoryImageSrc = categoryConfig?.imageSrc;
  return categoryImageSrc ? withBase(ensureStartingSlash(categoryImageSrc)) : undefined;
};
