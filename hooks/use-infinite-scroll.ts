import { useEffect, useRef } from 'react';

interface UseInfiniteScrollOptions {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export function useInfiniteScroll({ hasNextPage, isFetchingNextPage, onLoadMore, threshold = 0.1 }: UseInfiniteScrollOptions) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loadMoreRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
            onLoadMore();
          }
        },
        { threshold }
      );

      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasNextPage, isFetchingNextPage, onLoadMore, threshold]);

  return loadMoreRef;
}
