import React, { FC } from 'react';
import ImageWrapper from '../ImageWrapper';
import { useProduct, useCart } from '../../context';
import {
  StyledCartSummaryItem,
  ImageContainer,
  InfoContainer,
  InfoLabel,
} from './styles';

type CartSummaryItemProps = {
  cartItemId: number | string
}

const CartSummaryItem: FC<CartSummaryItemProps> = ({ cartItemId }) => {

  const productContext = useProduct();
  const { productState } = productContext;
  const { products } = productState;
  const product = products.byId[cartItemId];
  
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
        <InfoLabel>{`${itemQuantityInCart} x ${product.title}`}</InfoLabel>
        <InfoLabel>{`Subtotal: $${subtotalPrice}`}</InfoLabel>
      </InfoContainer>
    </StyledCartSummaryItem>
  )
}

export default CartSummaryItem;