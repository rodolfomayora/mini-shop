import { FC, useState, createContext, useContext } from 'react';
import { useProduct } from "../product-context";

type CartState = {
  cartItemsById: {
    [cartId: number]: number,
  },
  allCartItemsId: Array<number>
  // totalPrice: number
}
type setState = (param?: any) => void;
type CartContext = { cartState: CartState, setCartState: setState } | undefined;

const CartStateContext = createContext<CartContext>(undefined);

export const CartProvider: FC = ({ children }) => {
  const initialState: CartState = {
    cartItemsById: {},
    allCartItemsId: [],
    // totalPrice: 0
  }

  const [cartState, setCartState] = useState<CartState>(initialState);
  const providerValue = { cartState, setCartState };

  return (
    <CartStateContext.Provider value={providerValue}>
      {children}
    </CartStateContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartStateContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  const { cartState, setCartState } = context;

  const productContext = useProduct(); 
  const { productState } = productContext;
  const { products } = productState;

  const addToCart = (productId: number): void => {
    setCartState((state: CartState): CartState => {
      const incrementValue: number = 1;
      const currentQuantity: number = state.cartItemsById?.[productId] ?? 0;
      const maxProductStockLimit: number = products.byId[productId].quantity;
      const isQuantityOnLimit: boolean = currentQuantity >= maxProductStockLimit;

      const currentIds: Array<number> = state.allCartItemsId;
      const doesIdAlreadyExist: boolean = currentIds.includes(productId);

      const updateAllCartItemsId = (condition: boolean, ids: Array<number>): Array<number> => {
        return condition
        ? ids
        : ids.concat(productId)
      }

      return !isQuantityOnLimit ? ({
        ...state,
        cartItemsById: {
          ...state.cartItemsById,
          [productId]: currentQuantity + incrementValue
        },
        allCartItemsId: updateAllCartItemsId(doesIdAlreadyExist, currentIds)
      }) : (
        state
      )
    })
  }

  const discountFromCart = (productId: number): void => {
    setCartState((state: CartState): CartState => {
      const decrementValue: number = 1;
      const currentQuantity: number = state.cartItemsById?.[productId] ?? 0;
      const minProductStockLimit: number = 1;
      const isMinimunQuantity: boolean = currentQuantity <= minProductStockLimit;

      return !isMinimunQuantity ? ({
        ...state,
        cartItemsById: {
          ...state.cartItemsById,
          [productId]: currentQuantity - decrementValue
        }
      }) : (
        state
      )
    })
  }

  const removeFromCart = (productId: number): void => {
    setCartState((state: CartState): CartState => {
      const { cartItemsById, allCartItemsId } = state;
      const copyCartItemsById = { ...cartItemsById };
      delete copyCartItemsById[productId];

      const indexToRemoveFromId: number = allCartItemsId.indexOf(productId);
      const copyAllCartItemsId: Array<number> = [...allCartItemsId];
      const quantityToRemove: number = 1;
      copyAllCartItemsId.splice(indexToRemoveFromId, quantityToRemove);

      return ({
        ...state,
        cartItemsById: copyCartItemsById,
        allCartItemsId: copyAllCartItemsId
      })
    })
  }

  const emptyCart = (): void => {
    setCartState((state: CartState): CartState => ({
      ...state,
      cartItemsById: {},
      allCartItemsId: []
    }))
  }

  return {
    cartState,
    setCartState,
    addToCart,
    discountFromCart,
    removeFromCart,
    emptyCart  
  };
}