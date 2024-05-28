import React, { FC } from 'react';

import useCheckout from './useCheckout';
import { CartSummaryItem, Layout, PaymentForm } from '../../components';
import {
  CartSummaryList,
  CheckoutContent,
  FormSection,
  MainTitle,
  SubTitle,
  SummarySection,
  TotalPriceLabel,
} from './styles';

const Checkout: FC = () => {

  const { allCartItemsId, buyProducts, subTotal } = useCheckout();

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

          <TotalPriceLabel>{`Total: $${subTotal}`}</TotalPriceLabel>
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