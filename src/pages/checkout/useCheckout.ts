import { useRouter } from 'next/router';

import { useProduct, useCart, useRecord } from '../../context';

const useCheckout = () => {

  const productContext = useProduct();
  const { discountProductsFromStok, productState } = productContext;
  const { productsById } = productState;

  const cartContext = useCart();
  const { cartState, resetCart } = cartContext;
  const { subtotalPrice, cartItemsById, allCartItemsId } = cartState;
  const subTotal: string = subtotalPrice.toFixed(2);
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
    redirect('/record');
    resetCart();
  }

  return {
    allCartItemsId,
    subTotal,
    buyProducts,
  }
}

export default useCheckout;