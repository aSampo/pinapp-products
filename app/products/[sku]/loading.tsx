import { ProductDetailSkeleton } from '@/components/skeletons';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/">
        <Button variant="outline" className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al listado
        </Button>
      </Link>
      <ProductDetailSkeleton />
    </main>
  );
}
