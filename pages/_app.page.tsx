import { AppProps } from 'next/app';

import {
  ProductProvider,
  CartProvider,
  RecordProvider,
  ThemeContextProvider
} from '../context';
import { SplashScreen } from '../components';
import GlobalStyles from '../styles/GlobalStyles';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <ProductProvider>
    <CartProvider>
      <RecordProvider>
        <ThemeContextProvider>
          <GlobalStyles />
          <SplashScreen />
          <Component {...pageProps} />
        </ThemeContextProvider>
      </RecordProvider>
    </CartProvider>
  </ProductProvider>
);

export default MyApp