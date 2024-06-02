import Image from 'next/image';
import { useProduct, useCart } from '../../context';
import {
  ImageContainer,
  InfoContainer,
  InfoLabel,
  SubtotalPrice,
  StyledCartSummaryItem,
} from './styles';

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
    <StyledCartSummaryItem>
      <ImageContainer>
        <Image className="
            w-full aspect-square p-[16px]
            object-contain object-center
          "
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
        />
      </ImageContainer>

      <InfoContainer>
        <InfoLabel>{`${itemQuantityInCart} x ${product.name}`}</InfoLabel>
        <SubtotalPrice>{`Subtotal: $${subtotalPrice}`}</SubtotalPrice>
      </InfoContainer>
    </StyledCartSummaryItem>
  )
}

export default CartSummaryItem;