import { AppProps } from 'next/app';
import { ProductProvider, CartProvider } from '../context';
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProductProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </ProductProvider>
  )
}

export default MyApp