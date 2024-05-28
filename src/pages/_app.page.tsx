import { AppProps } from 'next/app';
import {
  ProductProvider,
  CartProvider,
  RecordProvider,
  ThemeContextProvider
} from '../context';
// import { SplashScreen } from '../components';
import { ErrorBoundary } from '#errors/ErrorBoundary';
import GlobalStyles from '../styles/GlobalStyles';

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
            {/* {process.env.NODE_ENV === 'production' && <SplashScreen />} */}
            <Component {...pageProps} />
          </ThemeContextProvider>
        </RecordProvider>
      </CartProvider>
    </ProductProvider>

  </ErrorBoundary>
);

export default App