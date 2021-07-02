import React, { FC } from 'react';

import { useRouter } from 'next/router';

import { useProduct, useCart, useRecord } from '../../context';
import { CartSummaryItem, Layout, PaymentForm } from '../../components';
import {
  CartSummaryList,
  CheckoutContent,
  FormSection,
  MainTitle,
  SubTitle,
  SummarySection,
  TotalPriceLabel
} from './styles';

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