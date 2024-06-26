import type { ReactNode } from 'react';
import { useProduct } from '#context/product';
import { useCart } from '#context/cart';
import { Layout } from '#components/Layout';
import { ProductCard } from '#components/ProductCard';
import { MainTitle } from '#components/MainTitle';
import { ProductsById } from '../../models/productContext';

/* dark theme backup: 
export const MainTitle = styled.h1`
  ${({ theme }) => theme.dark && css`
    color: ${colors.dark.blue3};
  `}
`;
*/

function Home () {
  
  const productContext = useProduct();
  const { productState } = productContext;
  const { allProductsId, productsById } = productState;
  const areThereProducts = !!allProductsId.length;

  const cartContext = useCart();
  const { addToCart } = cartContext;

  const setProductCards = (productsById: ProductsById) => {
    return (productId: string): ReactNode => {
      const product = productsById[productId];
      return (
        <li key={productId}>
          <ProductCard
            productId={productId}
            productImage={product.image}
            productName={product.name}
            productPrice={product.price}
            productQuantity={product.quantity}
            addToCart={addToCart} />
        </li>
      );
    }
  }

  const productsToRender = allProductsId.map(setProductCards(productsById));

  const renderContent = areThereProducts ? (
    <ul className="grid gap-[40px] grid-cols-[repeat(auto-fit,_minmax(245px,_1fr))]">
      {productsToRender}
    </ul>
  ) : (
    <div className="font-extrabold grid place-content-center w-full h-[40svh]">
      Loading...
    </div>
  );

  return (
    <Layout pageTitle="Home">
      <MainTitle className="text-center">Products</MainTitle>
      {renderContent}
    </Layout>
  );
}

export default Home;