type ProductCardProps = {
  productId: string,
  productImage: string,
  productName: string,
  productQuantity: number,
  productPrice: number,
  addToCart: (productId: string) => void,
}

export default ProductCardProps;