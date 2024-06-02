import useCheckout from './useCheckout';
import { CartSummaryItem, PaymentForm } from '../../components';
import { Layout } from '#components/Layout';
import {
  CartSummaryList,
  CheckoutContent,
  FormSection,
  MainTitle,
  SubTitle,
  SummarySection,
  TotalPriceLabel,
} from './styles';

function Checkout () {

  const { allCartItemsId, buyProducts, subTotal } = useCheckout();
  const cartItemsToRender = allCartItemsId.map((cartItemId) => (
    <li key={cartItemId}>
      <CartSummaryItem cartItemId={cartItemId}/>
    </li>
  ));
  const totalPrice = `Total: $${subTotal}`;
  
  return (
    <Layout pageTitle="Checkout">
      <MainTitle>Check Out</MainTitle>

      <CheckoutContent>
        <SummarySection>
          <SubTitle>Cart Summary</SubTitle>
          <CartSummaryList>
            {cartItemsToRender}
          </CartSummaryList>

          <TotalPriceLabel>
            {totalPrice}
          </TotalPriceLabel>
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