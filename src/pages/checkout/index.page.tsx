import useCheckout from './useCheckout';
import { PaymentForm } from '#components/PaymentForm';
import { CartSummaryItem } from '#components/CartSummaryItem';
import { Layout } from '#components/Layout';

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
      <h1 className="mt-0 mb-[40px] text-left text-[36px] text-[--color-black-2]">
        Check Out
      </h1>
      <div className="
        flex flex-col gap-[40px]
        md:flex-row-reverse
      ">
        <section className="
          grid content-start gap-y-[20px]
          md:w-[300px]
          lg:w-[450px]
        ">
          <h2 className="text-[22px] font-semibold">Cart Summary</h2>
          <ul className="grid gap-y-[20px]">
            {cartItemsToRender}
          </ul>

          <p className="text-[22px] font-semibold">
            {totalPrice}
          </p>
        </section>

        <section className="
          grow
          grid content-start gap-y-[20px]
          pt-[40px] border-solid border-t-[1px] border-[--color-black-3]
          md:pt-0 md:border-none
        ">
          <h2 className="text-[22px] font-semibold">Payment Form</h2>
          <PaymentForm onClickSubmitAction={buyProducts}/>
        </section>
      </div>
    </Layout>
  );
}

export default Checkout;