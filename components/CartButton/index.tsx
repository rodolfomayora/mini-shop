import React, { FC } from 'react';

import { useRouter } from 'next/router';

import { useCart } from '../../context';
import { StyledCartButton, Badge, CartIcon } from './styles';

const CartButton: FC = () => {
  const cartContext = useCart();
  const { cartState } = cartContext;
  const { totalCartItemsQuantity } = cartState;

  const router = useRouter();
  const redirect = router.push;
  const onHandleClick = () => redirect('/Cart');

  return (
    <StyledCartButton onClick={onHandleClick}>
      <CartIcon src="/images/svg/shoppingCart.svg"
        alt="Cart"
        width="20px"
        height="20px"
      />
      <Badge>{totalCartItemsQuantity}</Badge>
    </StyledCartButton>
  )
}

export default CartButton;