import React, { FC } from 'react';

import { Layout, ProductPreview } from '../../components';
import { useProduct } from '../../context';
import {
  MainTitle,
  ProductGrid
} from './styles';

const Home: FC = () => {
  
  const productContext = useProduct();
  const { productState } = productContext;
  const { allProductsId } = productState;
  const areThereProducts: boolean = !!allProductsId.length;

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