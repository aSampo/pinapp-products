'use client';

import { Input } from '@/components/ui/input';
import { Loader2, Search } from 'lucide-react';
import { useSearchBar } from '../hooks/use-search-bar';

export default function SearchBar() {
  const { searchTerm, isSearching, setSearchTerm } = useSearchBar();

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
