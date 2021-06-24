import React, { FC, useEffect } from 'react';
import { Layout, ProductPreview } from '../../components';
import { useProduct } from '../../context';
import sampleProducts from '../../data/products.json';
import { ProductGrid, MainTitle } from './styles';

const Home: FC = () => {
  const productContext = useProduct();
  const { productState, addProducts } = productContext;
  const { didContextMount, products } = productState;
  const { allIds, byId } = products;
  const areThereProducts: boolean = !!allIds.length;
  useEffect(() => {
    // Initialize List one time
    if (!didContextMount) addProducts(sampleProducts);
  },
  [didContextMount]);

  return (
    <Layout pageTitle={'Home'}>
      <MainTitle>Products</MainTitle>

      <ProductGrid>
      {areThereProducts && allIds.map((productId: number) => {
        
        const product = byId[productId];

        return (<ProductPreview
          key={productId.toString()}
          productId={productId}
          productName={product.title}
          productPrice={product.price}
          productImage={product.image}
        />)
      })}
      </ProductGrid>
    </Layout>
  )
}

export default Home;