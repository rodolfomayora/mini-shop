import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { ImageWrapper, MainButton } from '../../components';
import { Layout } from '../../components';
import { useProduct, useCart } from '../../context';
import {
  DetailLayout,
  ImageContainer,
  InfoContainer,
  ProductDescription,
  ProductDetailTitle,
} from './styles';

const Product: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const productContext = useProduct();
  const { products } = productContext.productState;
  const product = products.byId[Number(id)];

  const cartContext = useCart();
  const { addToCart } = cartContext;
  const onClickAddToCart = () => addToCart(Number(id));

  return (
    <Layout pageTitle="Product Detail">
      <ProductDetailTitle>{product.title}</ProductDetailTitle>
      <DetailLayout>
        <ImageContainer>
          <ImageWrapper productImage={product.image}/>
        </ImageContainer>

        <InfoContainer>
          <ProductDescription>
            {`Description: ${product.description}`}
          </ProductDescription>
          <p>{`Available: ${product.quantity}`}</p>
          <p>{`Price: $${product.price}`}</p>
          <MainButton onClickAction={onClickAddToCart}>Add to cart</MainButton>
        </InfoContainer>
      </DetailLayout>
    </Layout>
  )
}

export default Product;