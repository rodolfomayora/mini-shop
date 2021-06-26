import React, { FC } from 'react';
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

  const cartContext = useCart();
  const { cartState, removeFromCart, addToCart, discountFromCart } = cartContext;
  const { cartItemsById } = cartState;
  const productQuantityInCart: number = cartItemsById[cartItemId];
  const subtotal: string = (currentProduct.price * productQuantityInCart).toFixed(2);
  const onClickAddToCart = () => addToCart(cartItemId);
  const onClickDiscountFromCart = () => discountFromCart(cartItemId);
  const onClickRemoveFromCart = () => removeFromCart(cartItemId);

  const router = useRouter();
  const redirect = router.push;
  const onClickRedirect = () => redirect(`/ProductDetail/${cartItemId}`);

  return (
    <StyledCartItem>
      <ImageContainer>
        <ImageWrapper productImage={currentProduct.image}/>
      </ImageContainer>

      <InfoContainer>
        <ProducName>{currentProduct.name}</ProducName>

        <p>{`Price: $${currentProduct.price.toFixed(2)}`}</p>

        <p>{`Subtotal: $${subtotal}`}</p>

        <CounterBlock>

          <ActionButton onClick={onClickRemoveFromCart}>
            <ButtonIcon
              src={'/images/svg/cross.svg'}
              alt={'plus'}
              width="10px"
              height="10px"
            />
          </ActionButton>

          <ActionButton wide onClick={onClickRedirect}>
            Detail
          </ActionButton>

          <ActionButton onClick={onClickDiscountFromCart}>
            <ButtonIcon
              src={'/images/svg/minus.svg'}
              alt={'plus'}
              width="10px"
              height="10px"
            />
          </ActionButton>

          <Counter>{productQuantityInCart}</Counter>

          <ActionButton onClick={onClickAddToCart}>
            <ButtonIcon
              src={'/images/svg/plus.svg'}
              alt={'plus'}
              width="10px"
              height="10px"
            />
          </ActionButton>
        </CounterBlock>
      </InfoContainer>
    </StyledCartItem>
  )
}

export default CartItem;