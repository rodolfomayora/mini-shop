import { FC, useState, createContext, useContext } from 'react';
import { useProduct } from "../product-context";

type CartState = {
  cartItems: {
    [cartId: number]: number,
  },
  totalPrice: number
}
type setState = (param?: any) => void;
type CartContext = { cartState: CartState, setCartState: setState } | undefined;

const CartStateContext = createContext<CartContext>(undefined);

export const CartProvider: FC = ({ children }) => {
  const initialState: CartState = {
    cartItems: {},
    totalPrice: 0
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
      const currentQuantity: number = state.cartItems?.[productId] ?? 0;
      const maxProductStockLimit: number = products.byId[productId].quantity;
      const isQuantityOnLimit: boolean = currentQuantity >= maxProductStockLimit;

      return !isQuantityOnLimit ? ({
        ...state,
        cartItems: {
          ...state.cartItems,
          [productId]: currentQuantity + incrementValue
        } 
      }) : (
        state
      )
    })
  }

  const discountFromCart = (productId: number): void => {

    setCartState((state: CartState): CartState => {
      const decrementValue: number = 1;
      const currentQuantity: number = state.cartItems?.[productId] ?? 0;
      const minProductStockLimit: number = 1;
      const isMinimunQuantity: boolean = currentQuantity <= minProductStockLimit;

      return !isMinimunQuantity ? ({
        ...state,
        cartItems: {
          ...state.cartItems,
          [productId]: currentQuantity - decrementValue
        }
      }) : (
        state
      )
    })
  }

  return { cartState, setCartState, addToCart, discountFromCart };
}