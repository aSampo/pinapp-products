'use client';

import { useInfiniteScroll } from '@/hooks/use-infinite-scroll';
import { useProductSearch } from '@/hooks/use-product-search';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import ProductCard from './product-card';
import { ProductListError } from './product-list-error';
import { ProductListSkeleton } from './skeletons';

export default function ProductList() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('q') || '';

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, refetch, isRefetching } = useProductSearch(searchTerm);

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    onLoadMore: fetchNextPage
  });

  if (status === 'pending') {
    return <ProductListSkeleton />;
  }

  if (status === 'error') {
    return <ProductListError isRefetching={isRefetching} refetch={refetch} />;
  }

  const allProducts = data.pages.flatMap((page) => page.products);
  if (allProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold">No se encontraron productos</h2>
        <p className="text-muted-foreground mt-2">Intenta con otra búsqueda</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div ref={loadMoreRef} className="py-8 flex justify-center">
        {isFetchingNextPage ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Cargando más productos...</span>
          </div>
        ) : allProducts.length > 0 && !hasNextPage ? (
          <p className="text-muted-foreground">No hay más productos para mostrar</p>
        ) : null}
      </div>
    </>
  );
}
