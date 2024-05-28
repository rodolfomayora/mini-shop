import React, { FC, ReactNode } from 'react';

import { useRouter } from 'next/router';
import { useCart } from '../../context';
import {
  CartItem,
  Layout,
  MainButton,
} from '../../components';
import {
  MainTitle,
  CartContent,
  CartList,
  CartSummary,
  NoProductsMessage,
  TotalPriceLabel,
} from './styles';

const Cart: FC = () => {

  const cartContext = useCart();
  const { cartState } = cartContext;
  const { allCartItemsId, subtotalPrice } = cartState;
  const subTotal: string = subtotalPrice.toFixed(2);
  const doesCartHasProducts: boolean = !!allCartItemsId.length;
  const isButtonEnable: boolean = !doesCartHasProducts;

  const router = useRouter();
  const redirect = router.push;
  const redirectToCheckout = () => redirect('/checkout');

  const setCartItems = (cartItemId: string): ReactNode => (
    <li key={cartItemId}>
      <CartItem cartItemId={cartItemId} />
    </li>
  );

  const productsToRender = doesCartHasProducts ? allCartItemsId.map(setCartItems) : (
    <NoProductsMessage>
      There are no products in the shopping carts
    </NoProductsMessage>
  );

  return (
    <Layout pageTitle={'Cart'}>
      <MainTitle>CART</MainTitle>

      <CartContent>
        <CartList>
          {productsToRender}
        </CartList>
      
        <CartSummary>
          <TotalPriceLabel>
            {`Total Price: $${subTotal}`}
          </TotalPriceLabel>

          <MainButton
            disabled={isButtonEnable}
            onClickAction={redirectToCheckout}
          >
            Go to Check out
          </MainButton>
        </CartSummary>
      </CartContent>
    </Layout>
  );
}

export default Cart;