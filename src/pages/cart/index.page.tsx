import type { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { CartItem } from '#components/CartItem';
import { Layout } from '#components/Layout';
import { Button } from '#components/Button';
import { useCart } from '../../context';
import {
  MainTitle,
  CartContent,
  CartList,
  CartSummary,
  NoProductsMessage,
  TotalPriceLabel,
} from './styles';

function Cart () {

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
    <Layout pageTitle="Cart">
      <MainTitle>CART</MainTitle>

      <CartContent>
        <CartList>
          {productsToRender}
        </CartList>
      
        <CartSummary>
          <TotalPriceLabel>
            {`Total Price: $${subTotal}`}
          </TotalPriceLabel>

          <Button className="w-full"
            onClick={redirectToCheckout}
            disabled={isButtonEnable}
          >
            Go to Check out
          </Button>
        </CartSummary>
      </CartContent>
    </Layout>
  );
}

export default Cart;