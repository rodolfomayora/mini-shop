import React, { FC, useCallback, useMemo } from 'react';

import { useRouter } from 'next/router';

import { useProduct, useCart } from '../../context';
import { ImageWrapper } from '../../components';
import {
  ActionButton,
  ButtonIcon,
  Counter,
  CounterBlock,
  InfoContainer,
  ImageContainer,
  ProducName,
  StyledCartItem,
} from './styles';

type CartItemProps = {
  cartItemId: string
}

const CartItem: FC<CartItemProps> = ({ cartItemId }) => {

  const productContext = useProduct();
  const { productState } = productContext;
  const { productsById } = productState;
  const currentProduct = productsById[cartItemId];
  const formatedPrice: string = currentProduct.price.toFixed(2);

  const cartContext = useCart();
  const { cartState, removeFromCart, addToCart, discountFromCart } = cartContext;
  const { cartItemsById } = cartState;
  const productQuantityInCart: number = cartItemsById[cartItemId];
  const subtotal: string = (currentProduct.price * productQuantityInCart).toFixed(2);

  const router = useRouter();
  const redirect = router.push;
  const onClickRedirect = useCallback(() => {
    return redirect(`/product/${cartItemId}`);
  },
  [cartItemId, redirect]);

  return useMemo(() => (
    <StyledCartItem>
      <ImageContainer>
        <ImageWrapper productImage={currentProduct.image}/>
      </ImageContainer>

      <InfoContainer>
        <ProducName>{currentProduct.name}</ProducName>
        <p>{`Price: $${formatedPrice}`}</p>
        <p>{`Subtotal: $${subtotal}`}</p>

        <CounterBlock>
          <ActionButton onClick={() => removeFromCart(cartItemId)}>
            <ButtonIcon
              src={'/images/svg/cross.svg'}
              alt={'cross'}
              width="10px"
              height="10px" />
          </ActionButton>

          <ActionButton wide onClick={onClickRedirect}>
            Detail
          </ActionButton>

          <ActionButton onClick={() => discountFromCart(cartItemId)}>
            <ButtonIcon
              src={'/images/svg/minus.svg'}
              alt={'minus'}
              width="10px"
              height="10px" />
          </ActionButton>

          <Counter>{productQuantityInCart}</Counter>

          <ActionButton onClick={() => addToCart(cartItemId)}>
            <ButtonIcon
              src={'/images/svg/plus.svg'}
              alt={'plus'}
              width="10px"
              height="10px" />
          </ActionButton>
        </CounterBlock>
      </InfoContainer>
    </StyledCartItem>
  ),
  [
    cartItemId,
    currentProduct.name,
    currentProduct.image,
    formatedPrice,
    productQuantityInCart,
    subtotal,
    removeFromCart,
    addToCart,
    discountFromCart,
    onClickRedirect,
  ]);
}

export default CartItem;