import { FC, useState, createContext, useContext } from 'react';
import { useProduct } from "./product-context";

type CartState = {
  cartItems: {
    [cartId: number]: number,
  },
  total: number
}
type setState = (param?: any) => void;
type CartContext = { cartState: CartState, setCartState: setState } | undefined;

const CartStateContext = createContext<CartContext>(undefined);

export const CartProvider: FC = ({ children }) => {
  const initialState: CartState = {
    cartItems: {},
    total: 0
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

    setCartState((state: CartState) => {
      const newQuantityInCart: number = (state.cartItems?.[productId] ?? 0) + 1;
      const productStockLimit: number = products.byId[productId].quantity;
      const isQuantityAboveLimit: boolean = newQuantityInCart > productStockLimit;

      return isQuantityAboveLimit ? (
        state
      ): ({
        ...state,
        cartItems: {
          ...state.cartItems,
          [productId]: newQuantityInCart
        } 
      });
    })
  }

  return { cartState, setCartState, addToCart };
}