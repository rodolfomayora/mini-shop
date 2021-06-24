import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '../../context';
import { ImageWrapper, MainButton } from '../../components';
import {
  InfoWrapper,
  ProductTitle,
  ProductPrice,
  StyledProductPreview,
} from './styles';

type ProductPreviewProps = {
  productId: number,
  productName: string,
  productPrice: number,
  productImage: string
}

const ProductPreview: FC<ProductPreviewProps> = (props) => {
  const { productId, productName, productPrice, productImage } = props;

  const cartContext = useCart();
  const { addToCart } = cartContext;
  const onAddToCart = (productId: number) => {
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
      <ImageWrapper productImage={productImage}/>

      <InfoWrapper>
        <ProductTitle>{productName}</ProductTitle>
        <ProductPrice>{`$${productPrice.toFixed(2)}`}</ProductPrice>
        <MainButton outline>View Detail</MainButton>
        <MainButton onClickAction={onAddToCart(productId)}>
          Add to cart
        </MainButton>
      </InfoWrapper>
    </StyledProductPreview>
  )
}

export default ProductPreview;