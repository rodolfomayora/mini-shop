import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../../context';
import { StyledCartButton, Badge, CartIcon } from './styles';

const CartButton: FC = () => {
  const cartContext = useCart();
  const { cartState } = cartContext;
  const { cartItemsById } = cartState;

  const getCartItemsQuantity = (items: object): number => {
    const allQuantities: Array<number> = Object.values(items);
    const sumQuantities = (acc: number, crr: number): number => acc + crr;
    const total: number = allQuantities.reduce(sumQuantities, 0);
    return total;
  }

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
      <Badge>{getCartItemsQuantity(cartItemsById)}</Badge>
    </StyledCartButton>
  )
}

export default CartButton;