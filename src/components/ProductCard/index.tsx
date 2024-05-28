import React, { FC, memo } from 'react';

import { useRouter } from 'next/router';

import { ImageWrapper, MainButton } from '../../components';
import ProductCardProps from './types';
import {
  AvailabilityTag,
  InfoWrapper,
  ProductTitle,
  ProductPrice,
  StyledProductCard,
} from './styles';

const ProductCard: FC<ProductCardProps> = props => {

  const {
    productId,
    productImage,
    productName,
    productPrice,
    productQuantity,
    addToCart,
  } = props;

  const formatedPrice: string = productPrice.toFixed(2);
  const areThereNotProductInStock: boolean = !productQuantity;

  const handleAddToCart = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    addToCart(productId);
  }

  const router = useRouter();
  const redirect = router.push;
  const onClickRedirect = () => redirect(`/product/${productId}`);

  return (
    <StyledProductCard onClick={onClickRedirect}>
      {areThereNotProductInStock && (
        <AvailabilityTag>No disponible</AvailabilityTag>
      )}
      <ImageWrapper productImage={productImage}/>
      <InfoWrapper>
        <ProductTitle>{productName}</ProductTitle>
        <ProductPrice>{`$${formatedPrice}`}</ProductPrice>
        <MainButton outline>View Detail</MainButton>
        <MainButton onClickAction={handleAddToCart}>
          Add to cart
        </MainButton>
      </InfoWrapper>
    </StyledProductCard>
  );
}

export default memo(ProductCard);