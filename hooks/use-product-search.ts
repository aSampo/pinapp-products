import { getProducts } from '@/lib/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useProductSearch(searchTerm: string) {
  const query = useInfiniteQuery({
    queryKey: ['products', searchTerm],
    queryFn: ({ pageParam = 1 }) => getProducts(searchTerm, pageParam as number),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => (lastPage.hasMore ? allPages.length + 1 : undefined)
  });

  return query;
}
