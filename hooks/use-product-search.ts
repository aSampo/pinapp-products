import { getProducts } from '@/lib/api';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Product } from '../lib/types';

export function useProductSearch(
  searchTerm: string,
  initialData: {
    products: Product[];
    hasMore: boolean;
    total: number;
  }
) {
  return useInfiniteQuery({
    queryKey: ['products', searchTerm],
    queryFn: ({ pageParam = 1 }) => getProducts(searchTerm, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => (lastPage.hasMore ? allPages.length + 1 : undefined),
    initialData: initialData
      ? {
          pages: [initialData],
          pageParams: [1]
        }
      : undefined
  });
}
