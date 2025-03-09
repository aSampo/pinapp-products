import type { Product } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(
  searchTerm?: string,
  page = 1,
  limit = 12
): Promise<{
  products: Product[];
  hasMore: boolean;
  total: number;
}> {
  try {
    let url = `${API_URL}/products?_page=${page}&_limit=${limit}`;

    if (searchTerm) url += `&q=${encodeURIComponent(searchTerm)}`;

    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

    if (!res.ok) {
      throw new Error(`Error fetching products. Status code: ${res.status}. ${res.statusText}`);
    }

    const products: Product[] = await res.json();

    const totalCountHeader = res.headers.get('X-Total-Count');
    const total = totalCountHeader ? Number.parseInt(totalCountHeader, 10) : products.length;

    const hasMore = page * limit < total;

    return {
      products,
      hasMore,
      total
    };
  } catch (error: unknown) {
    console.error('Error fetching products:', error);
    throw new Error(error instanceof Error ? error.message : 'Error desconocido');
  }
}

export async function getProductBySku(sku: string): Promise<Product | null> {
  try {
    const url = `${API_URL}/products?sku=${encodeURIComponent(sku)}`;

    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

    if (!res.ok) {
      throw new Error(`Error fetching product with SKU ${sku}. Status code: ${res.status} ${res.statusText}`);
    }

    const products: Product[] = await res.json();

    if (products.length > 0) {
      return products[0];
    }

    return null;
  } catch (error: unknown) {
    console.error(`Error fetching product with SKU ${sku}:`, error);
    throw new Error(error instanceof Error ? error.message : 'Error desconocido');
  }
}
