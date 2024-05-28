export type Product = {
  id: string,
  image: string
  name: string,
  description: string,
  price: number,
  quantity: number,
}

export type ProductsById = {
  [productId: string]: Product
}