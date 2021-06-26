import { FC, useState, createContext, useContext, useEffect } from 'react';
import { useProduct } from "../product-context";

type CartImtesById = {
  [productId: string]: number,
}
type AllCartItemsId = Array<string>;
type CartState = {
  cartItemsById: CartImtesById,
  allCartItemsId: AllCartItemsId,
  subtotalPrice: number
}
type setState = (param?: any) => void;
type CartContext = { cartState: CartState, setCartState: setState } | undefined;

const CartStateContext = createContext<CartContext>(undefined);

export const CartProvider: FC = ({ children }) => {
  
  const initialState: CartState = {
    cartItemsById: {},
    allCartItemsId: [],
    subtotalPrice: 0
  }

  const [cartState, setCartState] = useState<CartState>(initialState);
  const providerValue: CartContext = { cartState, setCartState };

  const productcContext = useProduct();
  const { productState } = productcContext;
  useEffect(() => {

    const calcSubtotalPrice = (cartState: CartState): number => {
      const { allCartItemsId, cartItemsById } = cartState;
      const { productsById } = productState;
  
      return allCartItemsId.reduce((total, itemId) => {
        const productPrice: number = productsById[itemId].price;
        const productQuantityInCart: number = cartItemsById[itemId];
        const subtotal: number = productPrice * productQuantityInCart;
        return total + subtotal;
      }, 0)
    }

    setCartState((state: CartState): CartState => ({
      ...state,
      subtotalPrice: calcSubtotalPrice(state)
    }))
  },
  [cartState.cartItemsById])

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
  const { productsById } = productState;

  const addToCart = (productId: string): void => {
    setCartState((state: CartState): CartState => {
      const incrementValue: number = 1;
      const currentQuantity: number = state.cartItemsById?.[productId] ?? 0;
      const maxProductStockLimit: number = productsById[productId].quantity;
      const isQuantityOnLimit: boolean = currentQuantity >= maxProductStockLimit;

      const currentIds: AllCartItemsId = [...state.allCartItemsId];
      const doesIdAlreadyExist: boolean = currentIds.includes(productId);

      const updateAllCartItemsId = (condition: boolean, ids: AllCartItemsId): AllCartItemsId => {
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

  const discountFromCart = (productId: string): void => {
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

  const removeFromCart = (productId: string): void => {
    setCartState((state: CartState): CartState => {
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