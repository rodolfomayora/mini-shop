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
    <div className="
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
        width={300}
        height={300}
      />
      <div className="grid grid-rows-[1fr] auto-rows-auto gap-y-[16px] p-[16px]">
        <h3 className="h-[46px] text-[20px] font-semibold line-clamp-2">
          {productName}
        </h3>
        <p className="font-extrabold">{formatedPrice}</p>
        <ButtonOutlined className="w-full">View Detail</ButtonOutlined>
        <Button className="w-full" onClick={handleAddToCart}>
          Add to cart
        </Button>
      </div>
    </div>
  );
}