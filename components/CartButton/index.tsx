import React, { FC } from 'react';
import { useCart } from '../../context';

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

  return (
    <span>
      ShoppingCartCount: {getCartItemsQuantity(cartItemsById)}
    </span>
  )
}

export default CartButton;