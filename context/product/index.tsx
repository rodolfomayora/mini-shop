import { FC, createContext, useContext, useEffect, useReducer } from 'react';

import sampleProducts from '../../data/products.json';
import { ProductsById } from '../../models/productContext';

type ProductState = {
  productsById: ProductsById,
  allProductsId: Array<string>,
}

type Action =
| { type: 'ADD_PRODUCTS', data: Array<any> }
| { type: 'DISCOUNT_PRODUCTS_FROM_STOCK', itemsByIdFromCart: any }

type Dispatch = (action?: Action) => void;

type ProductContext =
| { productState: ProductState, dispatch: Dispatch }
| null;

const ProductStateContext = createContext<ProductContext>(null);

const reducer = (state: ProductState, action: Action): ProductState => {
  switch (action.type) {

    case 'ADD_PRODUCTS': {
      const { data } = action;
      const getId = product => product.id.toString();
      const normalizeList = (acc: ProductsById, crr): ProductsById => {
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
      
      const normalizedProducList = data.reduce(normalizeList, {});
      const allProducId = data.map(getId);

      return ({
        ...state,
        productsById: normalizedProducList,
        allProductsId: allProducId
      });
    }

    case 'DISCOUNT_PRODUCTS_FROM_STOCK': {
      const { itemsByIdFromCart } = action;
      const copyProductsById: ProductsById = { ...state.productsById };
      const copyCartItems: object = { ...itemsByIdFromCart };
      const cartItemsKeys: Array<string> = Object.keys(copyCartItems);

      cartItemsKeys.forEach((itemId: string) => {
        const productQuantityInCart: number = copyCartItems[itemId];
        copyProductsById[itemId].quantity -= productQuantityInCart;
      })

      return ({
        ...state,
        productsById: copyProductsById
      });
    }

    default: {
      throw new Error('Unsupported Action Type in Product Context Reducer');
    }
  }
}

export const ProductProvider: FC = ({ children }) => {

  const initialState: ProductState = {
    productsById: {},
    allProductsId: []
  }

  const [productState, dispatch] = useReducer(reducer, initialState);
 
  useEffect(() => {
   dispatch({
     type: 'ADD_PRODUCTS',
     data: sampleProducts
   });
  },
  [])
  
  const value: ProductContext = { productState, dispatch };

  return (
    <ProductStateContext.Provider value={value}>
      {children}
    </ProductStateContext.Provider>
  );
}

export const useProduct = () => {

  const productContext = useContext(ProductStateContext);
  const doesContextNotExist: boolean = !productContext;
  if (doesContextNotExist) throw new Error('useProduct must be used within ProductProvider');
  const { productState, dispatch } = productContext;

  const discountProductsFromStok = (itemsByIdFromCart: any): void => {
    dispatch({
      type: 'DISCOUNT_PRODUCTS_FROM_STOCK',
      itemsByIdFromCart
    });
  }

  return {
    productState,
    dispatch,
    discountProductsFromStok
  };
}