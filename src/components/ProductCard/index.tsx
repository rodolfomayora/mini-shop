import Image from 'next/image';
import { useRouter } from 'next/router';
import { Button } from '#components/Button';
import { ButtonOutlined } from '#components/ButtonOutlined';

type Props = {
  productId: string,
  productImage: string,
  productName: string,
  productQuantity: number,
  productPrice: number,
  addToCart: (productId: string) => void,
}

/* dark theme backup

export const StyledProductCard = styled.article`
  ${({ theme }) => theme.dark && css`
    box-shadow: ${colors.dark.shadow};
    background-color: ${colors.dark.blue1};
  `}
`;

export const AvailabilityTag = styled.div`
  ${({ theme }) => theme.dark && css`
    background-color: ${colors.dark.red};
  `}
`;

export const ProductTitle = styled.h3`
  ${({ theme }) => theme.dark && css`
    color: ${colors.dark.blue3};
  `}
`;

export const ProductPrice = styled.p`
  ${({ theme }) => theme.dark && css`
    color: ${colors.dark.white};
  `}
`;
*/

export function ProductCard ({
  productId,
  productImage,
  productName,
  productPrice,
  productQuantity,
  addToCart,
}: Props) {

  const formatedPrice = `$${productPrice.toFixed(2)}`;

  const handleAddToCart = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    addToCart(productId);
  }

  const router = useRouter();
  const redirect = router.push;
  const onClickRedirect = () => redirect(`/product/${productId}`);

  const areThereProductInStock = productQuantity === 0;
  const renderAvailabilityTag = areThereProductInStock
    ? (
      <div className="
        absolute z-10 top-0 left-0 w-full
        leading-[40px] text-center font-semibold text-[var(--color-white)]
        bg-[var(--color-red)]
        opacity-90
      ">
        Not Available
      </div>
    ) : null 

  return (
    <div className="group
        relative rounded-[6px] shadow-[0_1px_5px_3px_#b1b9d8]
        bg-[var(--color-white-2)] overflow-hidden cursor-pointer
      "
      onClick={onClickRedirect}
    >
      {renderAvailabilityTag}
      <Image className="
          w-full aspect-square p-[16px]
          object-contain object-center
        "
        src={productImage}
        alt={productName}
        width="300"
        height="300"
        priority
      />
      <div className=" grid grid-rows-[1fr] auto-rows-auto gap-y-[16px] p-[16px]">
        <h3 className="
          h-[46px] text-[20px] font-semibold line-clamp-2
          transition-colors duration-400 ease-linear
          group-hover:text-[var(--color-marine-blue)]
        ">
          {productName}
        </h3>
        <p className="font-extrabold">{formatedPrice}</p>
        <ButtonOutlined className="w-full" onClick={handleAddToCart}>
          Add to cart
        </ButtonOutlined>
        <Button className="w-full
          group-hover:bg-[var(--color-marine-blue)] 
        ">
          View Detail
        </Button>
      </div>
    </div>
  );
}