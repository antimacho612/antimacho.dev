import { Post } from '../types';

export type Order = 'Asc' | 'Desc';

export type SortOption<T> = {
  key: keyof Partial<T>;
  order?: Order;
};

export const sortArrayOfObjects = <T>(array: readonly T[], sortOptions: SortOption<T>[]) => {
  const compareFn = (a: T, b: T): number => {
    let collator: Intl.Collator | undefined;

    for (const opt of sortOptions) {
      const [first, second] = opt.order !== 'Desc' ? [a[opt.key], b[opt.key]] : [b[opt.key], a[opt.key]];

      if (first !== second) {
        if (typeof first === 'number' && typeof second === 'number') {
          return first - second;
        }

        if (typeof first === 'string' && typeof second === 'string') {
          if (!collator) collator = new Intl.Collator('ja');
          return collator.compare(first, second);
        }

        if (first !== undefined) return -1;
        if (second !== undefined) return 1;

        return 0;
      }
    }

    return 0;
  };

  return [...array].sort(compareFn);
};

export type PostsSortKey = 'Title' | 'CreatedAt' | 'UpdatedAt';

export const getPostsSortOptions = (key: PostsSortKey, order: Order): SortOption<Post>[] => {
  switch (key) {
    case 'Title':
      return [{ key: 'title', order }];
    case 'CreatedAt':
      return [{ key: 'createdAt', order }, { key: 'title' }];
    case 'UpdatedAt':
      return [{ key: 'updatedAt', order }, { key: 'title' }];
  }
};
