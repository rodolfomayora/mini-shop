import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from 'react';

import type { ProductsById } from '../../models/productContext';
import { getProducts } from '#services/fakestoreapi';
import { useThrowAsyncError } from '#errors/useThrowAsyncError';

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


type Props = {
  children: ReactNode,
}

export const ProductProvider = ({ children }: Props) => {

  const initialState: ProductState = {
    productsById: {},
    allProductsId: [],
  }

  const [productState, dispatch] = useReducer(reducer, initialState);

  const { throwAsyncError } = useThrowAsyncError();

  useEffect(() => {

    async function getData () {
      try {
        const producst = await getProducts();
        dispatch({
          type: 'ADD_PRODUCTS',
          data: producst
        });

      } catch (error) {
        throwAsyncError(error);

      }
    }

    getData();
  }, []);
  
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