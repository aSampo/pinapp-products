import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.sku}`}
      className="block h-full transition-transform hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
    >
      <Card className="h-full flex flex-col cursor-pointer p-0">
        <CardHeader className="p-0">
          <div className="aspect-square relative overflow-hidden rounded-t-lg">
            <Image
              src={product.image || '/placeholder.svg'}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform "
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <div className="flex items-start justify-between mb-2">
            <Badge variant="outline" className="mb-2">
              {product.category.name}
            </Badge>
            <span className="text-sm text-muted-foreground">{product.sku}</span>
          </div>
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
          <p className="font-bold text-lg">${product.price.toFixed(2)}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
