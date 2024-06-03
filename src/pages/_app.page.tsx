import { AppProps } from 'next/app';
import { ProductProvider } from '#context/product';
import { CartProvider } from '#context/cart';
import { RecordProvider } from '#context/record';
import { ThemeContextProvider } from '#context/theme';
import { ErrorBoundary } from '#errors/ErrorBoundary';

import GlobalStyles from '../styles/GlobalStyles';
import '../styles2/globals.css';

// import('../../__mocks__').then(({ serverMSW }) => {
//   serverMSW();
// });

const App = ({ Component, pageProps }: AppProps) => (
  <ErrorBoundary>

    <ProductProvider>
      <CartProvider>
        <RecordProvider>
          <ThemeContextProvider>
            <GlobalStyles />
            <Component {...pageProps} />
          </ThemeContextProvider>
        </RecordProvider>
      </CartProvider>
    </ProductProvider>

  </ErrorBoundary>
);

export default App