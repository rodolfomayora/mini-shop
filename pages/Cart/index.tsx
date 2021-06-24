import React, { FC } from 'react';
import Link from 'next/Link';
import { Layout } from '../../components';
import { useProduct, useCart } from '../../context';
import { MainTitle } from './styles';

const Cart: FC = () => {

  const cartContext = useCart();
  const { cartState, removeFromCart, emptyCart, addToCart, discountFromCart } = cartContext;
  const { allCartItemsId, cartItemsById, subtotalPrice } = cartState;
  const doestheCartHaveProducts: boolean = !!allCartItemsId.length;
  const isButtonEnable: boolean = !doestheCartHaveProducts;

  const productContext = useProduct();
  const { productState } = productContext;
  const { products } = productState;

  return (
    <Layout pageTitle={'Cart'}>
      <MainTitle>CART</MainTitle>

      <hr />

      <button onClick={() => emptyCart()}>VACIAR CARRITO</button>

      <hr />

      <ol>
      {doestheCartHaveProducts ? allCartItemsId.map((cartItemId: number) => {
        const product = products.byId[cartItemId];
        const productQuantityInCart: number = cartItemsById[cartItemId];

        return (
          <li key={cartItemId.toString()}>
            <div>{`Name: ${product.title}`}</div>
            <div>{`Quantity: ${productQuantityInCart}`}</div>
            <div>{`Price: $${(product.price * productQuantityInCart).toFixed(2)}`}</div>

            <button onClick={() => addToCart(cartItemId)}>Increase</button>
            <button onClick={() => discountFromCart(cartItemId)}>Discount</button>
            <button onClick={() => removeFromCart(cartItemId)}>Remove</button>
          </li>
        )
      }) : (
        <p>There are no products in the shopping carts</p>
      )}
      </ol>

      <hr />

      <p>{`TOTAL PRICE: $${subtotalPrice.toFixed(2)}`}</p>

      <hr />

      
        <Link href="/Checkout">
          <button disabled={isButtonEnable}>
            <a>Go to Check out</a>
          </button>
        </Link>
    </Layout>
  )
}

export default Cart;