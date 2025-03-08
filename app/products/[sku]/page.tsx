import ProductDetail from '@/components/product-detail';
import { Button } from '@/components/ui/button';
import { getProductBySku } from '@/lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
export const dynamic = 'force-dynamic';

export default async function ProductPage({ params }: { params: { sku: string } }) {
  const product = await getProductBySku(params.sku);

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al listado
        </Button>
      </Link>

      <ProductDetail product={product} />
    </main>
  );
}
