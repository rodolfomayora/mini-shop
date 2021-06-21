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
  const areThereProducts: boolean = !!allIds.length;
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
      {areThereProducts && allIds.map((productId: any) => {
        const product = byId[productId];
        return (
          <li key={productId.toString()}>
            <div>{`Name : ${product.title}`}</div>
            <div>{`Price: $${product.price}`}</div>
            <button
              onClick={() => addToCart(productId)}
            >
              add to cart
            </button>
          </li>
        )
      })}
      </ul>
    </Layout>
  )
}

export default Home;