import { Skeleton } from '@/components/ui/skeleton';

export function ProductDetailSkeleton() {
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Skeleton className="aspect-square rounded-lg w-full" />
      <div className="space-y-6">
        <div>
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-5 w-1/4" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-20 w-full" />
        <div>
          <Skeleton className="h-10 w-32 mb-1" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-px w-full" />
        <div>
          <Skeleton className="h-8 w-40 mb-4" />
          <div className="space-y-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-6 w-1/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
