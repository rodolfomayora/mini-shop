import React, { FC } from 'react';

import styled from 'styled-components';

import { Layout, ProductPreview } from '../../components';
import { useProduct } from '../../context';
import { breakpoints } from '../../styles/config';

export const ProductGrid = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 40px;

  @media screen and (min-width: ${breakpoints.small}) {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 50px 25px;
  }

  @media screen and (min-width: ${breakpoints.small}) {
    grid-gap: 50px;
  }

  @media screen and (min-width: ${breakpoints.large}) {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 40px;
  }

  @media screen and (min-width: ${breakpoints.extraLarge}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const MainTitle = styled.h1`
  margin-bottom: 40px;
  text-align: center;
`;

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