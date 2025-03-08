import type { Product } from './types';

//TODO config env
const API_URL = 'https://pinapp-products-api.onrender.com';

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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    let url = `${API_URL}/products?_page=${page}&_limit=${limit}`;

    if (searchTerm) url += `&q=${encodeURIComponent(searchTerm)}`;

    const res = await fetch(url, {
      signal: controller.signal,
      next: { revalidate: 60 },
      headers: {
        Accept: 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

    clearTimeout(timeoutId);

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
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error(error instanceof Error ? error.message : 'Error fetching products.');
  }
}
