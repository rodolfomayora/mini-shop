import React, { FC } from 'react';

import { useProduct, useCart } from '../../context';
import ImageWrapper from '../ImageWrapper';
import {
  ImageContainer,
  InfoContainer,
  InfoLabel,
  SubtotalPrice,
  StyledCartSummaryItem,
} from './styles';

type CartSummaryItemProps = {
  cartItemId: string
}

const CartSummaryItem: FC<CartSummaryItemProps> = ({ cartItemId }) => {

  const productContext = useProduct();
  const { productState } = productContext;
  const { productsById } = productState;
  const product = productsById[cartItemId];
  
  const cartContext = useCart();
  const { cartState } = cartContext;
  const { cartItemsById } = cartState;
  
  const itemQuantityInCart = cartItemsById[cartItemId];
  const subtotalPrice = (product.price * itemQuantityInCart).toFixed(2);

  return (
    <StyledCartSummaryItem>
      <ImageContainer>
        <ImageWrapper productImage={product.image}/>
      </ImageContainer>

      <InfoContainer>
        <InfoLabel>{`${itemQuantityInCart} x ${product.name}`}</InfoLabel>
        <SubtotalPrice>{`Subtotal: $${subtotalPrice}`}</SubtotalPrice>
      </InfoContainer>
    </StyledCartSummaryItem>
  )
}

export default CartSummaryItem;