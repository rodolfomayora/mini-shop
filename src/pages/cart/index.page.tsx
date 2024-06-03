import type { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { CartItem } from '#components/CartItem';
import { Layout } from '#components/Layout';
import { Button } from '#components/Button';
import { useCart } from '../../context';

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
    <p className="font-extrabold grid place-content-center w-full h-[40svh]">
      There are no products added to cart
    </p>
  );

  return (
    <Layout pageTitle="Cart">
      <h1 className="mt-0 mb-[40px] text-left text-[var(--color-black-2)]">
        CART
      </h1>

      <div className="grid gap-y-[40px]">
        <ul className="grid gap-y-[20px]">
          {productsToRender}
        </ul>
      
        <p className="
          py-[10px] px-[10px] rounded-[6px]
          text-[18px] font-semibold
          bg-[var(--color-white-2)] shadow-[0_1px_5px_3px_#b1b9d8]
        ">
          {`Total Price: $${subTotal}`}
        </p>

        <Button className="w-full"
          onClick={redirectToCheckout}
          disabled={isButtonEnable}
        >
          Go to Check out
        </Button>
      </div>
    </Layout>
  );
}

export default Cart;