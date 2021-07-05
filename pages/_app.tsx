import { AppProps } from 'next/app';

import { ProductProvider, CartProvider, RecordProvider } from '../context';
import GlobalStyles from '../styles/GlobalStyles';

const MyApp = ({ Component, pageProps }: AppProps) => (
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
);

export default MyApp