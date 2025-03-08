import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Producto no encontrado</h1>
      <p className="text-muted-foreground text-lg mb-8">El producto que estás buscando no existe</p>
      <Link href="/">
        <Button>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al listado de productos
        </Button>
      </Link>
    </div>
  );
}
