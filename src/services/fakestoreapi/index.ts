import { httpClient } from '#lib/httpClient';

export const apiOrigin = 'https://fakestoreapi.com';
export const productsEndpoint = `${apiOrigin}/products`;

type Product = {
  id: number, // cambiarlo a string
  title: string,
  price: number,
  description: string,
  category: string,
  image: string, // URL
  // rating: {
  //   rate: number,
  //   count: number,
  // }
}

type FormatedProduct = Product & {
  quantity: number,
}

function isProduct (obj: unknown): obj is Product {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'category' in obj && typeof obj.category === 'string' &&
    'description' in obj && typeof obj.description === 'string' &&
    'id' in obj && typeof obj.id === 'number' &&
    'image' in obj && typeof obj.image === 'string' &&
    'price' in obj && typeof obj.price === 'number' &&
    'title' in obj && typeof obj.title === 'string'
  );
} 

export async function getProducts (): Promise<FormatedProduct[]> {
  const products = await httpClient(productsEndpoint);
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
      quantity: 20,
    }
  });

  return formatedProduct;
}

// export async frunction getProducById (id: string) {}