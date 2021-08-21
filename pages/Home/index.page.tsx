import React, { FC, ReactNode } from 'react';

import { Layout, ProductCard } from '../../components';
import { useCart, useProduct } from '../../context';
import { ProductsById } from '../../models/productContext';
import {
  MainTitle,
  ProductGrid
} from './styles';

const Home: FC = () => {
  
  const productContext = useProduct();
  const { productState } = productContext;
  const { allProductsId, productsById } = productState;
  const areThereProducts: boolean = !!allProductsId.length;

  const cartContext = useCart();
  const { addToCart } = cartContext;

  const setProductCards = (productsById: ProductsById) => {
    return (productId: string): ReactNode => {
      const product = productsById[productId];
      return (
        <li key={productId}>
          <ProductCard
            productId={productId}
            productImage={product.image}
            productName={product.name}
            productPrice={product.price}
            productQuantity={product.quantity}
            addToCart={addToCart} />
        </li>
      );
    }
  }

  return (
    <Layout pageTitle='Home'>
      <MainTitle>Products</MainTitle>
      <ProductGrid>
      {areThereProducts && allProductsId.map(setProductCards(productsById))}
      </ProductGrid>
    </Layout>
  );
}

export default Home;