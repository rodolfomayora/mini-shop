import React, { FC, useEffect } from 'react';
import Link from 'next/link';
import { Layout } from '../../components';
import { useProduct, useCart } from '../../context';

const Cart: FC = () => {

  const cartContext = useCart();
  const { cartState, removeFromCart, emptyCart, addToCart, discountFromCart } = cartContext;
  const { allCartItemsId, cartItemsById } = cartState;
  const doestheCartHaveProducts: boolean = !!allCartItemsId.length;

  const productContext = useProduct();
  const { productState, discountProductsFromStok } = productContext;
  const { products } = productState;

  const totalPrice: number = allCartItemsId.reduce((total, itemId) => {
    const productPrice: number = products.byId[itemId].price;
    const productQuantityInCart: number = cartItemsById[itemId];
    const subtotal: number = productPrice * productQuantityInCart;
    return total + subtotal;
  }, 0)


  useEffect(() => {
    console.log('/////////////////////////');
    console.log(products.byId);
  },
  [products.byId])


  return (
    <Layout pageTitle={'Cart'}>
      <h1>CART</h1>

      <div>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </div>

      <button onClick={() => emptyCart()}>VACIAR CARRITO</button>

      <ol>
      {doestheCartHaveProducts && allCartItemsId.map((cartItemId: number) => {
        const product = products.byId[cartItemId];
        const productQuantityInCart: number = cartItemsById[cartItemId];

        return (
          <li key={cartItemId.toString()}>
            <div>{`Name: ${product.title}`}</div>
            <div>{`Quantity: ${productQuantityInCart}`}</div>
            <div>{`Price: $${product.price * productQuantityInCart}`}</div>

            <button onClick={() => addToCart(cartItemId)}>Increase</button>
            <button onClick={() => discountFromCart(cartItemId)}>Discount</button>
            <button onClick={() => removeFromCart(cartItemId)}>Remove</button>
          </li>
        )
      })}
      </ol>

      <hr />

      <p>{`TOTAL PRICE: $${totalPrice}`}</p>
    </Layout>
  )
}

export default Cart;