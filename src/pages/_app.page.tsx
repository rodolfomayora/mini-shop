import { AppProps } from 'next/app';
import {
  ProductProvider,
  CartProvider,
  RecordProvider,
  ThemeContextProvider,
} from '../context';
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