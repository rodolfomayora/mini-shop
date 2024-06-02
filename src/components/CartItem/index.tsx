import {  useCallback, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useProduct, useCart } from '../../context';
import {
  ActionButton,
  ButtonIcon,
  Counter,
  CounterBlock,
  InfoContainer,
  ImageContainer,
  ProducName,
  StyledCartItem,
} from './styles';

type Props = {
  cartItemId: string,
}

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
    <StyledCartItem>
      <ImageContainer>
        <Image className="
            w-full aspect-square p-[16px]
            object-contain object-center
          "
          src={currentProduct.image}
          alt={currentProduct.name}
          width={300}
          height={300}
        />
      </ImageContainer>

      <InfoContainer>
        <ProducName>{currentProduct.name}</ProducName>
        <p>{`Price: $${formatedPrice}`}</p>
        <p>{`Subtotal: $${subtotal}`}</p>

        <CounterBlock>
          <ActionButton onClick={() => removeFromCart(cartItemId)}>
            <ButtonIcon
              src={'/images/svg/cross.svg'}
              alt={'cross'}
              width="10px"
              height="10px" />
          </ActionButton>

          <ActionButton wide onClick={onClickRedirect}>
            Detail
          </ActionButton>

          <ActionButton onClick={() => discountFromCart(cartItemId)}>
            <ButtonIcon
              src={'/images/svg/minus.svg'}
              alt={'minus'}
              width="10px"
              height="10px" />
          </ActionButton>

          <Counter>{productQuantityInCart}</Counter>

          <ActionButton onClick={() => addToCart(cartItemId)}>
            <ButtonIcon
              src={'/images/svg/plus.svg'}
              alt={'plus'}
              width="10px"
              height="10px" />
          </ActionButton>
        </CounterBlock>
      </InfoContainer>
    </StyledCartItem>
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