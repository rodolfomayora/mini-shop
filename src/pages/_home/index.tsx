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

  const productsToRender = allProductsId.map(setProductCards(productsById));

  const renderContent = areThereProducts ? (
    <ProductGrid>
      {productsToRender}
    </ProductGrid>
  ) : (
    <div className="font-extrabold grid place-content-center w-full h-[40svh]">
      Loading...
    </div>
  );

  return (
    <Layout pageTitle='Home'>
      <MainTitle>Products</MainTitle>
        {renderContent}
    </Layout>
  );
}

export default Home;