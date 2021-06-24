import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import { Layout } from '../../components';
import { useProduct, useCart, useRecord } from '../../context';
import { MainTitle } from './styles';

const Checkout: FC = () => {

  const productContext = useProduct();
  const { discountProductsFromStok } = productContext;

  const cartContext = useCart();
  const { cartState, emptyCart } = cartContext;
  const { subtotalPrice, cartItemsById } = cartState;

  const recordContext = useRecord();
  const { addRecord } = recordContext;

  const router = useRouter();
  const redirect = router.push;

  const buyProducts = (values: any) => {
    addRecord(values);
    discountProductsFromStok(cartItemsById);
    redirect('/ShoppingRecord');
    emptyCart();
  }

  return (
    <Layout pageTitle="Checkout">
      <MainTitle>Check Out</MainTitle>

      <section>
        <h2>Cart Summary</h2>
        {/* <div>lista de productos</div> */}
        <div>{`Subtotal: $${subtotalPrice}`}</div>
      </section>

      <hr />

      <Formik
        initialValues={{
          email: '',
          name: '',
          lastname: '',
          address: '',
          reseption: ''
        }}

        onSubmit={buyProducts}
      >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit
      }) => (
        <form onSubmit={handleSubmit}>
          <p>
            <label htmlFor="email">Email:</label>
            <input id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </p>

          <p>
            <label htmlFor="name">Name:</label>
            <input id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </p>

          <p>
            <label htmlFor="lastname">Lastname:</label>
            <input id="lastname"
              name="lastname"
              type="text"
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </p>

          <p>
            <label htmlFor="address">Address:</label>
            <input id="address"
              name="address"
              type="text"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </p>

          <button type="submit">BUY</button>
        </form>
      )}
      </Formik>

    </Layout>
  )
}

export default Checkout;