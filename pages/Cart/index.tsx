import React, { FC } from 'react';

import styled from 'styled-components';

import { useRouter } from 'next/router';
import { useCart } from '../../context';
import {
  CartItem,
  Layout,
  MainButton,
} from '../../components';

import { breakpoints, colors } from '../../styles/config';

const MainTitle = styled.h1`
  margin-bottom: 40px;
`;

const CartContent = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${breakpoints.extraLarge}) {
    flex-direction: row;
  }
`;

const NoProductsMessage = styled.p`
  font-weight: 600;
  text-align: center;
`;

const CartList = styled.ol`
  flex-grow: 1;
  margin-bottom: 40px;

  & > * + * { margin-top: 20px; }
`;

const CartSummary = styled.div`
  @media screen and (min-width: ${breakpoints.extraLarge}) {
    width: 400px;
    margin-left: 40px;
  }
`;

export const TotalPriceLabel = styled.p`
  background-color: ${colors.white2};
  border-radius: 4px;
  padding: 10px 20px;
  box-shadow: ${colors.shadow};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 40px;
`;

const Cart: FC = () => {

  const cartContext = useCart();
  const { cartState } = cartContext;
  const { allCartItemsId, subtotalPrice } = cartState;
  const doesTheCartHaveProducts: boolean = !!allCartItemsId.length;
  const isButtonEnable: boolean = !doesTheCartHaveProducts;

  const router = useRouter();
  const redirect = router.push;
  const redirectToCheckout = () => redirect('/Checkout');

  return (
    <Layout pageTitle={'Cart'}>
      <MainTitle>CART</MainTitle>

      <CartContent>
        <CartList>
        {doesTheCartHaveProducts ? allCartItemsId.map((cartItemId: string) => (
          <li key={cartItemId}>
            <CartItem cartItemId={cartItemId} />
          </li>
        )) : (
          <NoProductsMessage>
            There are no products in the shopping carts
          </NoProductsMessage>
        )}
        </CartList>
      
        <CartSummary>
          <TotalPriceLabel>
            {`Total Price: $${subtotalPrice.toFixed(2)}`}
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