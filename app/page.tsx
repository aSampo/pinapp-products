import ProductList from '@/components/product-list';
import SearchBar from '@/components/search-bar';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">PinApp - Productos</h1>
      <Suspense fallback={<Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}>
        <SearchBar />
        <ProductList />
      </Suspense>
    </main>
  );
}
