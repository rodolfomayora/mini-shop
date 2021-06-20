import React, { FC, useEffect } from 'react';
import Link from 'next/link';

import { Layout } from '../../components';
import { useProduct, useCart } from '../../context';
import sampleProducts from '../../data/products.json';

const Home: FC = () => {

  const productContext = useProduct();
  const { productState, addProducts } = productContext
  const { didContextMount, products } = productState;
  const { allIds, byId } = products;
  useEffect(() => {
    // Initialize List one time
    if (!didContextMount) addProducts(sampleProducts);
  },
  [didContextMount]);

  const cartContext = useCart();
  const { cartState, addToCart } = cartContext;

  useEffect(() => {
    console.log(cartState);
  },
  [cartState])

  return (
    <Layout pageTitle={'Home'}>
      <h1>Home</h1>

      <Link href="/Cart">
        <a>Cart Page</a>
      </Link>

      <ul>
      {!!allIds.length && allIds.map((productId: any) => (
        <li key={productId.toString()}>
          <div>{byId[productId]?.title}</div>
          <button
            onClick={() => addToCart(productId)}
          >
            add to cart
          </button>
        </li>
      ))}
      </ul>
    </Layout>
  )
}

export default Home;