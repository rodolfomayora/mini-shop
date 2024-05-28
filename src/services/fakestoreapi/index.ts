// API documentation: https://fakestoreapi.com

import { httpClient } from '#lib/httpClient';

export const apiOrigin = 'https://fakestoreapi.com';
export const productsPath = `${apiOrigin}/products`;

type Product = {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string, // URL
  rating: {
    rate: number,
    count: number,
  }
}

type FormatedProduct = Product & {
  quantity: number,
}

// Type Guard function for expected schema from API
function isProduct (obj: unknown): obj is Product {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'category' in obj && typeof obj.category === 'string' &&
    'description' in obj && typeof obj.description === 'string' &&
    'id' in obj && typeof obj.id === 'number' &&
    'image' in obj && typeof obj.image === 'string' &&
    'price' in obj && typeof obj.price === 'number' &&
    'title' in obj && typeof obj.title === 'string' &&
    'rating' in obj && typeof obj.rating === 'object'
  );
} 

// export async function getProducts ({ limit, offset }): Promise<FormatedProduct[]> {
export async function getProducts (): Promise<FormatedProduct[]> {
  const products = await httpClient(productsPath);
  if (!Array.isArray(products)) throw new Error();
  const formatedProduct = products.map((product) => {
    if (!isProduct(product)) throw new Error();
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: { ...product.rating },
      quantity: 20,
    }
  });
  return formatedProduct;
}

export async function getProductById (id: string): Promise<FormatedProduct> {
  const product = await httpClient(`${productsPath}/${id}`);
  if (!isProduct(product)) throw new Error();
  const formatedProduc = {
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.image,
    rating: { ...product.rating },
    quantity: 20,
  }
  return formatedProduc;
}