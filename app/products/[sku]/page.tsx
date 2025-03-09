import ProductDetail from '@/components/product-detail';
import { Button } from '@/components/ui/button';
import { getProductBySku } from '@/lib/api';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
export const dynamic = 'force-dynamic';

type Params = { sku: string };

export default async function ProductPage(props: { params: Params }) {
  const params = props.params;

  if (!params.sku) {
    notFound();
  }

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

export async function generateMetadata({ params }: { params: Params }) {
  const product = await getProductBySku(params.sku);

  if (!product) {
    return {
      title: 'Producto no encontrado',
      description: 'El producto que buscas no existe'
    };
  }

  return {
    title: `${product.name} | PinApp Products`,
    description: product.description,
    openGraph: {
      images: [{ url: product.image }]
    }
  };
}
