import { AppProps } from 'next/app';
import { ProductProvider, CartProvider, RecordProvider } from '../context';
import GlobalStyles from '../styles/GlobalStyles';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <ProductProvider>
        <CartProvider>
          <RecordProvider>
            <Component {...pageProps} />
          </RecordProvider>
        </CartProvider>
      </ProductProvider>
    </>
  )
}

export default MyApp