import { AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import { Button } from './ui/button';

interface ProductErrorProps {
  isRefetching: boolean;
  refetch: () => void;
}

export function ProductListError({ isRefetching, refetch }: ProductErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-destructive/10 text-destructive rounded-full p-3 mb-4">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h2 className="text-xl font-semibold mb-4"> No se pudieron cargar los productos. Intenta nuevamente.</h2>
      <Button onClick={() => refetch()} disabled={isRefetching} className="flex items-center gap-2">
        {isRefetching ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
        Reintentar
      </Button>
    </div>
  );
}
