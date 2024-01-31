import { data as posts } from '../post.data';
import { ensureStartingSlash, normalizePath } from './link';

export const findPostData = (path: string) => {
  path = normalizePath(ensureStartingSlash(path));
  return posts.find((post) => normalizePath(post.url) === path);
};
