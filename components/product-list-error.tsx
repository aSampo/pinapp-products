import { Loader2, RefreshCw } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';

interface ProductErrorProps {
  error: Error;
  isRefetching: boolean;
  onRetry: () => void;
}

export function ProductListError({ error, isRefetching, onRetry }: ProductErrorProps) {
  return (
    <Alert variant="destructive" className="my-8">
      <AlertTitle className="flex items-center gap-2">Error al cargar productos</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-4">{error.message || 'Ha ocurrido un error al cargar los productos.'}</p>
        <Button onClick={onRetry} variant="outline" disabled={isRefetching} className="flex items-center gap-2">
          {isRefetching ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
          Reintentar
        </Button>
      </AlertDescription>
    </Alert>
  );
}
