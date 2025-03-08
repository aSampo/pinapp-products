'use client';

import { Input } from '@/components/ui/input';
import { useQueryClient } from '@tanstack/react-query';
import { Loader2, Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SearchBar() {
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

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        {isSearching ? <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" /> : <Search className="h-4 w-4 text-muted-foreground" />}
      </div>
      <Input
        type="text"
        placeholder="Buscar por SKU o nombre del producto..."
        className="pl-10 pr-10"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
