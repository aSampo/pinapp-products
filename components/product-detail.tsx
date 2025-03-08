import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { Product } from '@/lib/types';
import Image from 'next/image';

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="rounded-lg overflow-hidden">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          width={600}
          height={600}
          className="w-full h-auto object-cover"
          priority
        />
      </div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-muted-foreground mt-2">SKU: {product.sku}</p>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground uppercase tracking-wider text-xs">Categoría</span>
            <span className="font-medium mt-1">{product.category.name}</span>
          </div>
          <div className="h-8 w-px bg-border"></div>
          <div className="flex flex-col">
            <span className="text-muted-foreground uppercase tracking-wider text-xs">Marca</span>
            <span className="font-medium mt-1">{product.brand}</span>
          </div>
        </div>
        <p className="text-lg">{product.description}</p>
        <div>
          <p className="text-3xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-sm text-muted-foreground mt-1">{product.stock > 0 ? `${product.stock} unidades disponibles` : 'Sin stock'}</p>
        </div>
        <Separator />
        <div>
          <h2 className="text-xl font-semibold mb-4">Especificaciones</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Característica</TableHead>
                <TableHead>Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product.specifications.map((spec, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{spec.name}</TableCell>
                  <TableCell>{spec.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
