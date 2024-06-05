import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCart } from '#context/cart';;

/* dark theme backup: badge
  ${({ theme }) => theme.dark && css`
    background-color: ${colors.dark.black};
  `}
*/

export function CartButton () {
  const cartContext = useCart();
  const { cartState } = cartContext;
  const { totalCartItemsQuantity } = cartState;
  const is100Producs = totalCartItemsQuantity > 99;
  const quantityToRender = is100Producs
    ? '+99'
    : totalCartItemsQuantity
    ;

  const router = useRouter();
  const redirect = router.push;
  const onHandleClick = () => redirect('/cart');

  return (
    <button type="button"
      className="relative bg-transparent cursor-pointer"
      onClick={onHandleClick}
      aria-label="Open Cart Page"  
    >
      <Image className="size-[18px]"
        src="/images/svg/shoppingCart.svg"
        alt="Cart icon"
        width="18"
        height="18"
      />
      <div className="
        absolute top-[100%] start-0 z-1
        translate-x-[-45%] translate-y-[-54%]
        grid place-items-center
        text-[--color-white] text-[12px] 
        rounded-full bg-[--color-black-3]
        min-w-[20px] aspect-square pb-[1px]
      ">
        {quantityToRender}
      </div>
    </button>
  )
}