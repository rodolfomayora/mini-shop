import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../../context';
import {
  CartItem,
  Layout,
  MainButton,
} from '../../components';
import {
  CartContent,
  CartList,
  CartSummary,
  MainTitle,
  NoProductsMessage,
  TotalPriceLabel,
} from './styles';

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
            {`TOTAL PRICE: $${subtotalPrice.toFixed(2)}`}
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
  )
}

export default Cart;