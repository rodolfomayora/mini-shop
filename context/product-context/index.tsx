import { FC, useState, createContext, useContext, useEffect } from 'react';
import sampleProducts from '../../data/products.json';

type Product = {
  id: string,
  image: string
  name: string,
  description: string,
  price: number,
  quantity: number,
}
type ProductsById = {
  [productId: string]: Product
}
type ProductState = {
  productsById: ProductsById,
  allProductsId: Array<string>,
}
type SetState = (param?: any) => void;
type ProductContext = { productState: ProductState, setProductState: SetState } | undefined;

const ProductStateContext = createContext<ProductContext>(undefined);

export const ProductProvider: FC = ({ children }) => {

  const initialState: ProductState = {
    productsById: {},
    allProductsId: []
  }
 
  const [productState, setProductState] = useState<ProductState>(initialState);
  
  useEffect(() => {

    const addProducts = (sampleData: any): void => {
      const getId = (product: any) => product.id.toString();
      const normalizeList = (acc: ProductsById, crr: any): ProductsById => {
        const productId: string = getId(crr);
        return ({
          ...acc,
          [productId]: {
            id: productId,
            image: crr.image,
            name: crr.title,
            description: crr.description,
            price: crr.price,
            quantity: crr.quantity
          }
        })
      }; 
      const normalizedProducList = sampleData.reduce(normalizeList, {});
      const allProducId = sampleData.map(getId);
      
      setProductState((state: ProductState): ProductState => ({
        ...state,
        productsById: normalizedProducList,
        allProductsId: allProducId
      }));
    }

    addProducts(sampleProducts);
  },
  [])
  
  const providerValue: ProductContext = { productState, setProductState };

  return (
    <ProductStateContext.Provider value={providerValue}>
      {children}
    </ProductStateContext.Provider>
  )
}

export const useProduct = () => {

  const context = useContext(ProductStateContext);
  if (!context) throw new Error('useProduct must be used within ProductProvider');
  const { productState, setProductState } = context;

  const discountProductsFromStok = (cartItemsById: object): void => {
    setProductState((state: ProductState): ProductState => {
      const copyProductsById: ProductsById = { ...state.productsById };
      const copyCartItems: object = { ...cartItemsById };
      const cartItemsKeys: Array<string> = Object.keys(copyCartItems);

      cartItemsKeys.forEach((itemId: string) => {
        const productQuantityInCart: number = copyCartItems[itemId];
        copyProductsById[itemId].quantity -= productQuantityInCart;
      })

      return ({
        ...state,
        productsById: copyProductsById
      })
    })
  }

  return {
    productState,
    setProductState,
    discountProductsFromStok
  };
}