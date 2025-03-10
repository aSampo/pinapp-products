import ProductList from '@/components/product-list';
import SearchBar from '@/components/search-bar';
import { getProducts } from '@/lib/api';
import { Loader2 } from 'lucide-react';
import { Suspense } from 'react';

export default async function Home({ searchParams }: { searchParams: { q?: string } }) {
  const searchTerm = searchParams.q || '';
  const initialData = await getProducts(searchTerm, 1);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">PinApp - Productos</h1>
      <Suspense fallback={<Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}>
        <SearchBar />
        <ProductList initialData={initialData} searchTerm={searchTerm} />
      </Suspense>
    </main>
  );
}
