import React, { FC, useEffect } from 'react';

import { useRouter } from 'next/router';
import styled from 'styled-components';

import { ImageWrapper, MainButton, Layout } from '../../components';
import { useProduct, useCart } from '../../context';
import { breakpoints } from '../../styles/config';

const ProductDetailTitle = styled.h1`
  margin-bottom: 40px;
`;

const DetailLayout = styled.div`
  display: flex;
  flex-direction: column;
  
  @media screen and (min-width: ${breakpoints.medium}) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  margin-bottom: 40px;
  overflow: hidden;
  border-radius: 4px;

  @media screen and (min-width: ${breakpoints.medium}) {
    flex-basis: 50%;
    margin-bottom: 0;
    margin-right: 40px;
  }
`;

const InfoContainer = styled.div`

  & > * + * { margin-top: 20px; }

  @media screen and (min-width: ${breakpoints.medium}) {
    flex-basis: 50%;
  }
`;

const Description = styled.p`
  line-height: 26px;
  word-spacing: 4px
`;


const ProductDetail: FC = () => {

  const router = useRouter();
  const { query, push: redirect } = router;
  const { id } = query;
  const productId: string = id?.toString();

  const productContext = useProduct();
  const { productState } = productContext;
  const { productsById } = productState;
  const product = productsById[productId];

  const cartContext = useCart();
  const { addToCart } = cartContext;
  const onClickAddToCart = () => addToCart(productId);
  const onClickGoToCart = () => redirect('/Cart');

  return (
    <Layout pageTitle="Product Detail">
      <ProductDetailTitle>{product?.name ?? ''}</ProductDetailTitle>
      <DetailLayout>
        <ImageContainer>
          <ImageWrapper productImage={product?.image ?? ''}/>
        </ImageContainer>

        <InfoContainer>
          <Description>Description:{product?.description  ?? ''}</Description>
          <p>Available: {product?.quantity  ?? ''}</p>
          <p>{`Price: $${product?.price}`}</p>
          <MainButton outline onClickAction={onClickGoToCart}>Go to cart</MainButton>
          <MainButton onClickAction={onClickAddToCart}>Add to cart</MainButton>
        </InfoContainer>
      </DetailLayout>
    </Layout>
  );
}

export default ProductDetail;