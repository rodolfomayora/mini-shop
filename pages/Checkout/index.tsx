import React, { FC } from 'react';

import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useProduct, useCart, useRecord } from '../../context';
import { CartSummaryItem, Layout, PaymentForm } from '../../components';
import { colors, breakpoints } from '../../styles/config';

const MainTitle = styled.h1`
  margin-bottom: 40px;
`;

const SubTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const CheckoutContent = styled.div`
  display: flex;
  flex-direction: column;

  @media screen and (min-width: ${breakpoints.large}) {
    flex-direction: row-reverse;
  }
`;

const SummarySection = styled.section`
  @media screen and (min-width: ${breakpoints.large}) {
    width: 360px;
    margin-left: 40px;
  }

  @media screen and (min-width: ${breakpoints.extraLarge}) {
    width: 450px;
    margin-left: 60px;
  }
`;

const FormSection = styled.section`
  flex-grow: 1;
`;

const CartSummaryList = styled.ol`
  margin-bottom: 40px;

  & > * + * { border-top: solid 1px ${colors.black3}; }
`;

const TotalPriceLabel = styled.p`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 40px;
`;

const Checkout: FC = () => {

  const productContext = useProduct();
  const { discountProductsFromStok, productState } = productContext;
  const { productsById } = productState;

  const cartContext = useCart();
  const { cartState, emptyCart } = cartContext;
  const { subtotalPrice, cartItemsById, allCartItemsId } = cartState;
  const { totalCartItemsQuantity } = cartState;

  const recordContext = useRecord();
  const { addRecord } = recordContext;

  const router = useRouter();
  const redirect = router.push;

  const createCartProducList = (cartItemIds: Array<any>): Array<string> => {
    const getItemForList = (itemId: string) => {
      const product: any = productsById[itemId];
      const productQuantity: number = cartItemsById[itemId];
      return `${productQuantity} x ${product.name}`;
    }

    return cartItemIds.map(getItemForList);
  }

  const buyProducts = (values: any) => {
    const allValues: any = {
      ...values,
      products: createCartProducList(allCartItemsId),
      totalProducts: totalCartItemsQuantity,
      totalPrice: subtotalPrice,
    };
    addRecord(allValues);
    discountProductsFromStok(cartItemsById);
    redirect('/ShoppingRecord');
    emptyCart();
  }

  return (
    <Layout pageTitle="Checkout">
      <MainTitle>Check Out</MainTitle>

      <CheckoutContent>
        <SummarySection>
          <SubTitle>Cart Summary</SubTitle>
          <CartSummaryList>
          {allCartItemsId.map((cartItemId) => (
            <li key={cartItemId}>
              <CartSummaryItem cartItemId={cartItemId}/>
            </li>
          ))}
          </CartSummaryList>

          <TotalPriceLabel>{`Total: $${subtotalPrice.toFixed(2)}`}</TotalPriceLabel>
        </SummarySection>

        <FormSection>
          <SubTitle>Payment Form</SubTitle>
          <PaymentForm onClickSubmitAction={buyProducts}/>
        </FormSection>
      </CheckoutContent>
    </Layout>
  );
}

export default Checkout;