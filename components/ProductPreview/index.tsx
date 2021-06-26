import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { useProduct, useCart } from '../../context';
import { ImageWrapper, MainButton } from '../../components';
import {
  InfoWrapper,
  ProductTitle,
  ProductPrice,
  StyledProductPreview,
} from './styles';

type ProductPreviewProps = {
  productId: string,
}

const ProductPreview: FC<ProductPreviewProps> = ({ productId }) => {

  const productContext = useProduct();
  const { productState } = productContext;
  const { productsById } = productState;
  const product = productsById[productId];

  const cartContext = useCart();
  const { addToCart } = cartContext;
  const onAddToCart = (productId: string) => {
    return (event: React.MouseEvent<HTMLElement>): void => {
      event.stopPropagation();
      addToCart(productId);
    }
  }

  const router = useRouter();
  const redirect = router.push;
  const onClickRedirect = () => redirect(`/ProductDetail/${productId}`);

  return (
    <StyledProductPreview onClick={onClickRedirect}>
      <ImageWrapper productImage={product.image}/>

      <InfoWrapper>
        <ProductTitle>{product.name}</ProductTitle>
        <ProductPrice>{`$${product.price.toFixed(2)}`}</ProductPrice>
        <MainButton outline>View Detail</MainButton>
        <MainButton onClickAction={onAddToCart(productId)}>
          Add to cart
        </MainButton>
      </InfoWrapper>
    </StyledProductPreview>
  )
}

export default ProductPreview;