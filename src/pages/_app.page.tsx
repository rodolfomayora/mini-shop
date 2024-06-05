import { AppProps } from 'next/app';
import { ProductProvider } from '#context/product';
import { CartProvider } from '#context/cart';
import { RecordProvider } from '#context/record';
// import { ThemeContextProvider } from '#context/theme';
import { ErrorBoundary } from '#errors/ErrorBoundary';
import '../styles/global.css';

// import('../../__mocks__').then(({ serverMSW }) => {
//   serverMSW();
// });

const App = ({ Component, pageProps }: AppProps) => (
  <ErrorBoundary>

    <ProductProvider>
      <CartProvider>
        <RecordProvider>
          {/* <ThemeContextProvider> */}
            <Component {...pageProps} />
          {/* </ThemeContextProvider> */}
        </RecordProvider>
      </CartProvider>
    </ProductProvider>

  </ErrorBoundary>
);

export default App