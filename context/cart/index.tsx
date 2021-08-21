import {
  FC,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer
} from 'react';
import { useProduct } from "../product";

type ProductQuantity = number;

type CartImtesById = {
  [productId: string]: ProductQuantity,
}
type AllCartItemsId = Array<string>;

type CartState = {
  cartItemsById: CartImtesById,
  allCartItemsId: AllCartItemsId,
  totalCartItemsQuantity: number,
  subtotalPrice: number
}

type Action =
| { type: 'ADD_TO_CART', payload: any }
| { type: 'DISCOUNT_FROM_CART', productId: string }
| { type: 'REMOVE_FROM_CART', productId: string }
| { type: 'RESET_CART' }
| { type: 'SET_SUBTOTAL_PRICE_AND_QUANTITY', productsById: any}

type Dispatch = (action?: Action) => void;

type CartContext =
| { cartState: CartState, dispatch: Dispatch }
| null;

const CartStateContext = createContext<CartContext>(null);

const reducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {

    case 'ADD_TO_CART': {
      const { productId, maxProductStockLimit } = action.payload;
      const incrementValue: number = 1;
      const productQuantityInCart: number = state.cartItemsById?.[productId] ?? 0;
      const isQuantityOutOfStock: boolean = productQuantityInCart >= maxProductStockLimit;
      const currentIds: AllCartItemsId = [...state.allCartItemsId];
      const doesIdAlreadyExist: boolean = currentIds.includes(productId);

      const updateAllCartItemsId = (condition: boolean, ids: AllCartItemsId): AllCartItemsId => {
        return condition
        ? ids
        : ids.concat(productId)
      }

      if (isQuantityOutOfStock) return state;
      
      return ({
        ...state,
        cartItemsById: {
          ...state.cartItemsById,
          [productId]: productQuantityInCart + incrementValue
        },
        allCartItemsId: updateAllCartItemsId(doesIdAlreadyExist, currentIds)
      });
    }

    case 'DISCOUNT_FROM_CART': {
      const { productId } = action;
      const decrementValue: number = 1;
      const productQuantityInCart: number = state.cartItemsById?.[productId] ?? 0;
      const minProductStockLimit: number = 1;
      const isMinimunQuantity: boolean = productQuantityInCart <= minProductStockLimit;

      if (isMinimunQuantity) return state;

      return ({
        ...state,
        cartItemsById: {
          ...state.cartItemsById,
          [productId]: productQuantityInCart - decrementValue
        }
      });
    }

    case 'REMOVE_FROM_CART': {
      const { productId } = action;
      const { cartItemsById, allCartItemsId } = state;
      const copyCartItemsById = { ...cartItemsById };
      delete copyCartItemsById[productId];

      const indexToRemoveFromId: number = allCartItemsId.indexOf(productId);
      const copyAllCartItemsId: AllCartItemsId = [...allCartItemsId];
      const quantityToRemove: number = 1;
      copyAllCartItemsId.splice(indexToRemoveFromId, quantityToRemove);

      return ({
        ...state,
        cartItemsById: copyCartItemsById,
        allCartItemsId: copyAllCartItemsId
      });
    }

    case 'SET_SUBTOTAL_PRICE_AND_QUANTITY': {
      const getCartItemsQuantity = (cartItems: CartImtesById): number => {
        const allQuantities: Array<number> = Object.values(cartItems);
        const sumQuantities = (acc: number, crr: number): number => acc + crr;
        const total: number = allQuantities.reduce(sumQuantities, 0);
        return total;
      }
  
      const calcSubtotalPrice = (cartState: CartState): number => {
        const { allCartItemsId, cartItemsById } = cartState;
        const { productsById } = action;

        return allCartItemsId.reduce((total, itemId) => {
          const productPrice: number = productsById[itemId].price;
          const productQuantityInCart: number = cartItemsById[itemId];
          const subtotal: number = productPrice * productQuantityInCart;
          return total + subtotal;
        }, 0);
      }

      return ({
        ...state,
        totalCartItemsQuantity: getCartItemsQuantity(state.cartItemsById),
        subtotalPrice: calcSubtotalPrice(state)
      });
    }

    case 'RESET_CART': {
      const initialState: CartState = {
        cartItemsById: {},
        allCartItemsId: [],
        totalCartItemsQuantity: 0,
        subtotalPrice: 0
      }

      return initialState;
    }

    default: {
      throw new Error('Unsupported Action Type in Cart Context Reducer');
    }
  }
}

export const CartProvider: FC = ({ children }) => {
  
  const initialState: CartState = {
    cartItemsById: {},
    allCartItemsId: [],
    totalCartItemsQuantity: 0,
    subtotalPrice: 0
  }

  const [cartState, dispatch] = useReducer(reducer, initialState);

  const productContext = useProduct();
  const { productState } = productContext;
  const { productsById } = productState;

  useEffect(() => {
    dispatch({
      type: 'SET_SUBTOTAL_PRICE_AND_QUANTITY',
      productsById
    })
  },
  [cartState.cartItemsById, productsById])

  const value: CartContext = { cartState, dispatch };

  return (
    <CartStateContext.Provider value={value}>
      {children}
    </CartStateContext.Provider>
  );
}

export const useCart = () => {
  const cartContext = useContext(CartStateContext);
  const doesContextNotExist: boolean = !cartContext;
  if (doesContextNotExist) throw new Error('useCart must be used within CartProvider');
  const { cartState, dispatch } = cartContext;

  const productContext = useProduct(); 
  const { productState } = productContext;
  const { productsById } = productState;

  const addToCart = useCallback((productId: string): void => {
    const maxProductStockLimit: number = productsById[productId].quantity;
      const payload = {
        maxProductStockLimit,
        productId
      }
      
      dispatch({
        type: 'ADD_TO_CART',
        payload
      });
  },
  [productsById]);

  const discountFromCart = useCallback((productId: string): void => {
    dispatch({
      type: 'DISCOUNT_FROM_CART',
      productId
    });
  },
  []);

  const removeFromCart = useCallback((productId: string): void => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      productId
    });
  },
  []);

  const resetCart = (): void => {
    dispatch({ type: 'RESET_CART' });
  }

  return {
    cartState,
    dispatch,
    addToCart,
    discountFromCart,
    removeFromCart,
    resetCart  
  };
}