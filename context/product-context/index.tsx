import { FC, useState, createContext, useContext } from 'react';

type ProductState = {
  didContextMount: boolean,
  products: {
    byId: object,
    allIds: Array<any>
  }
}
type SetState = (param?: any) => void;
type ProductContext = { productState: ProductState, setProductState: SetState } | undefined;

const ProductStateContext = createContext<ProductContext>(undefined);

export const ProductProvider: FC = ({ children }) => {

  const initialState: ProductState = {
    didContextMount: false,
    products: {
      byId: {},
      allIds: []
    }
  }
 
  const [productState, setProductState] = useState<ProductState>(initialState);
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
  
  const addProducts = (productList: Array<any>): void => {
    const normalizeList = (acc: object, crr: any): object => ({
      ...acc,
      [crr.id]: { ...crr }
    }); 
    const normalizedProducList = productList.reduce(normalizeList, {});
    const getId = (product: any) => product.id;
    const allProducId = productList.map(getId);
    
    setProductState((state: ProductState): ProductState => ({
      ...state,
      didContextMount: true,
      products: {
        byId: normalizedProducList,
        allIds: allProducId
      }
    }));
  }

  const discountProductsFromStok = (cartItemsById: object): void => {
    setProductState((state: ProductState): ProductState => {
      const copyProductsById: object = { ...state.products.byId };
      const copyCartItems: object = { ...cartItemsById };
      const cartItemsKeys: Array<string> = Object.keys(copyCartItems);

      cartItemsKeys.forEach((itemId: string) => {
        const productQuantityInCart: number = copyCartItems[itemId];
        copyProductsById[itemId].quantity -= productQuantityInCart;
      })

      return ({
        ...state,
        products: {
          ...state.products,
          byId: copyProductsById
        }
      })
    })
  }

  return {
    productState,
    setProductState,
    addProducts,
    discountProductsFromStok
  };
}