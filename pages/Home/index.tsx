import React, { FC, useEffect } from 'react';

import { Layout, ProductPreview } from '../../components';
import { useProduct } from '../../context';
import { ProductGrid, MainTitle } from './styles';

const Home: FC = () => {
  
  const productContext = useProduct();
  const { productState, addProducts } = productContext;
  const { didContextMount, allProductsId, productsById } = productState;
  const areThereProducts: boolean = !!allProductsId.length;
  useEffect(() => {
    // Initialize List one time
    if (!didContextMount) addProducts();
  });

  return (
    <Layout pageTitle={'Home'}>
      <MainTitle>Products</MainTitle>

      <ProductGrid>
      {areThereProducts && allProductsId.map((productId: string) => (
        <li key={productId}>
          <ProductPreview productId={productId}/>
        </li>
      ))}
      </ProductGrid>
    </Layout>
  );
}

export default Home;