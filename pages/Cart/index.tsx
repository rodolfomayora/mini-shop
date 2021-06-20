import React, { FC } from 'react';
import Link from 'next/link';
import { Layout } from '../../components';

const Cart: FC = () => {

  return (
    <Layout pageTitle={'Cart'}>
      <h1>CART</h1>

      <Link href="/">
        <a>Back to home</a>
      </Link>

    </Layout>
  )
}

export default Cart;