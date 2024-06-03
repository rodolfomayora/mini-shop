import Image from 'next/image';
import { useProduct } from '#context/product';
import { useCart } from '#context/cart';

import { useRouter } from 'next/router';
import { Button } from '#components/Button';
import { ButtonOutlined } from '#components/ButtonOutlined';
import { Layout } from '#components/Layout';

import {
  Description,
  DetailLayout,
  ImageContainer,
  InfoContainer,
  Title,
} from './styles';

export function Product () {

  const router = useRouter();
  const { query, push: redirect } = router;
  const { id } = query;
  const productId: string = id?.toString();

  const productContext = useProduct();
  const { productState } = productContext;
  const { productsById } = productState;
  const product = productsById[productId];

  const cartContext = useCart();
  const { addToCart } = cartContext;
  const onClickAddToCart = () => addToCart(productId);
  const onClickGoToCart = () => redirect('/cart');

  return (
    <Layout pageTitle="Product Detail">
      <Title>{product?.name ?? ''}</Title>
      <DetailLayout>
        <ImageContainer>
          <Image className="
              w-full aspect-square p-[16px]
              object-contain object-center
            "
            src={product?.image ?? ''}
            alt={product?.name ?? ''}
            width={300}
            height={300}
          />
        </ImageContainer>

        <InfoContainer>
          <Description>Description:{product?.description  ?? ''}</Description>
          <p>Available: {product?.quantity  ?? ''}</p>
          <p>{`Price: $${product?.price}`}</p>
          <ButtonOutlined className="w-full" onClick={onClickGoToCart}>Go to cart</ButtonOutlined>
          <Button className="w-full" onClick={onClickAddToCart}>Add to cart</Button>
        </InfoContainer>
      </DetailLayout>
    </Layout>
  );
}

export default Product;