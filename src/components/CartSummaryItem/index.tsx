import Image from 'next/image';
import { useProduct } from '#context/product';
import { useCart } from '#context/cart';

type Props = {
  cartItemId: string,
}

export function CartSummaryItem ({ cartItemId }: Props) {

  const productContext = useProduct();
  const { productState } = productContext;
  const { productsById } = productState;
  const product = productsById[cartItemId];
  
  const cartContext = useCart();
  const { cartState } = cartContext;
  const { cartItemsById } = cartState;
  
  const itemQuantityInCart = cartItemsById[cartItemId];
  const subtotalPrice = (product.price * itemQuantityInCart).toFixed(2);

  return (
    <article className="
      flex gap-x-[10px] p-[10px]
      bg-[--color-white-2] rounded-[6px]
      shadow-[0_0_4px_-1px_#b1b9d8]
    ">
      <Image className="
          w-[50px] aspect-square p-[4px]
          object-contain object-center
        "
        src={product.image}
        alt={product.name}
        width="50"
        height="50"
      />
      <div className="grid gap-y-[10px]">
        <p className="line-clamp-1 text-[16px]">
          {`${itemQuantityInCart} x ${product.name}`}
        </p>
        <p className="font-semibold text-[16px]">
          {`Subtotal: $${subtotalPrice}`}
        </p>
      </div>
    </article>
  )
}