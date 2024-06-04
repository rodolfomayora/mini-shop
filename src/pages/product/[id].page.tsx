import Image from 'next/image';
import { useRouter } from 'next/router';
import { useProduct } from '#context/product';
import { useCart } from '#context/cart';
import { Button } from '#components/Button';
import { ButtonOutlined } from '#components/ButtonOutlined';
import { MainTitle } from '#components/MainTitle';
import { Layout } from '#components/Layout';

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
      <MainTitle>{product?.name ?? ''}</MainTitle>
      <div className="
        grid grid-cols-1 items-start gap-[40px]
        md:grid-cols-2 
      ">
        <Image className="
            w-full aspect-square p-[16px]
            object-contain object-center
            bg-[var(--color-white-2)] rounded-[6px]
            shadow-[0_0_5px_0px_#b1b9d8]
          "
          src={product?.image ?? ''}
          alt={product?.name ?? ''}
          width="300"
          height="300"
        />

        <div className="grid gap-y-[20px] content-start">
          <p className="leading-[26px] [word-spacing:4px]">
            Description:{product?.description  ?? ''}
          </p>
          <p>Available: {product?.quantity  ?? ''}</p>
          <p>{`Price: $${product?.price}`}</p>
          <ButtonOutlined className="w-full" onClick={onClickGoToCart}>Go to cart</ButtonOutlined>
          <Button className="w-full" onClick={onClickAddToCart}>Add to cart</Button>
        </div>
      </div>
    </Layout>
  );
}

export default Product;