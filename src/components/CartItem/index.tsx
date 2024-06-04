import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useProduct } from '#context/product';
import { useCart } from '#context/cart';
import { ButtonAction } from './ButtonAction';

type Props = {
  cartItemId: string,
}

/* dark theme backup:
  CartItem:
  ${({ theme }) => theme.dark && css`
    color: ${colors.dark.white};
    box-shadow: ${colors.dark.shadow};
    background-color: ${colors.dark.blue1};
  `}

  ProducName:
  ${({ theme }) => theme.dark && css`
    color: ${colors.dark.blue3};
  `}

  ButtonAction:
  ${({ theme }) => theme.dark && css`
    background-color: ${colors.dark.blue2};
    &:hover { background-color: ${colors.dark.blue5}; }
  `}
*/

export function CartItem ({ cartItemId }: Props) {

  const productContext = useProduct();
  const { productState } = productContext;
  const { productsById } = productState;
  const currentProduct = productsById[cartItemId];
  const formatedPrice = currentProduct.price.toFixed(2);

  const cartContext = useCart();
  const { cartState, removeFromCart, addToCart, discountFromCart } = cartContext;
  const { cartItemsById } = cartState;
  const productQuantityInCart: number = cartItemsById[cartItemId];
  const subtotal: string = (currentProduct.price * productQuantityInCart).toFixed(2);

  const router = useRouter();
  const redirect = router.push;
  const onClickRedirect = useCallback(() => {
    return redirect(`/product/${cartItemId}`);
  },
  [cartItemId, redirect]);

  return useMemo(() => (
    <article className="
      grid gap-[20px]
      p-[20px] rounded-[6px]
      bg-[var(--color-white-2)]
      shadow-[0_1px_5px_3px_#b1b9d8]
      md:grid-cols-[180px_1fr]
    ">
      <Image className="
          w-full aspect-square
          object-contain object-center
        "
        src={currentProduct.image}
        alt={currentProduct.name}
        width="300"
        height="300"
      />
      <div className="grid gap-y-[10px] grid-rows-[1fr]">
        <h3 className="h-[46px] text-[22px] font-bold line-clamp-2">
          {currentProduct.name}
        </h3>
        <div className="inline-grid grid-cols-[auto_1fr] gap-[10px]">
          <span>Price</span><span>{`: $${formatedPrice}`}</span>
          <span>Subtotal</span><span>{`: $${subtotal}`}</span>
        </div>
        <menu className="flex items-center gap-x-[10px]">
          <li>
            <ButtonAction onClick={() => removeFromCart(cartItemId)}>
              <Image className="object-cover object-center h-[16px]"
                src="/images/svg/cross.svg"
                alt="cross"
                width="16"
                height="16"
              />
            </ButtonAction>
          </li>
          <li className="w-full">
            <ButtonAction className="w-full" onClick={onClickRedirect}>
              Detail
            </ButtonAction>
          </li>
          <li>
            <ButtonAction onClick={() => discountFromCart(cartItemId)}>
              <Image className="object-cover object-center h-[14px]"
                src="/images/svg/minus.svg"
                alt="minus"
                width="14"
                height="14"
              />
            </ButtonAction>
          </li>
          <li>
            <span className="inline-block min-w-[40px] px-[8px] text-center text-[18px]">
              {productQuantityInCart}
            </span>
          </li>
          <li>
            <ButtonAction onClick={() => addToCart(cartItemId)}>
              <Image className="object-cover object-center h-[14px]"
                src="/images/svg/plus.svg"
                alt="plus"
                width="14"
                height="14"
              />
            </ButtonAction>
          </li>
        </menu>
      </div>
    </article>
  ),
  [
    cartItemId,
    currentProduct.name,
    currentProduct.image,
    formatedPrice,
    productQuantityInCart,
    subtotal,
    removeFromCart,
    addToCart,
    discountFromCart,
    onClickRedirect,
  ]);
}