import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UseSearchResult {
  searchTerm: string;
  isSearching: boolean;
  setSearchTerm: (term: string) => void;
}

export function useSearchBar(): UseSearchResult {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const initialQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchTerm === initialQuery) return;

    setIsSearching(true);
    const timer = setTimeout(() => {
      updateSearchParams(searchTerm);
      setIsSearching(false);
    }, 500);

    return () => {
      clearTimeout(timer);
      setIsSearching(false);
    };
  }, [searchTerm, initialQuery]);

  const updateSearchParams = (term: string) => {
    const params = new URLSearchParams(searchParams);

    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    queryClient.cancelQueries({ queryKey: ['products'] });
    queryClient.removeQueries({ queryKey: ['products'] });

    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    searchTerm,
    isSearching,
    setSearchTerm
  };
}
