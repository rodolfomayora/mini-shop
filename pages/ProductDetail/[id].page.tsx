import React, { FC } from 'react';

import { useRouter } from 'next/router';

import { ImageWrapper, MainButton, Layout } from '../../components';
import { useProduct, useCart } from '../../context';
import {
  Description,
  DetailLayout,
  ImageContainer,
  InfoContainer,
  ProductDetailTitle,
} from './styles';

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