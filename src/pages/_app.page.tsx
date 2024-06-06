import { AppProps } from 'next/app';
import { ProductProvider } from '#context/product';
import { CartProvider } from '#context/cart';
import { RecordProvider } from '#context/record';
import { ErrorBoundary } from '#errors/ErrorBoundary';
import { Lato } from '#assets/fonts/Lato';
import { Montserrat } from '#assets/fonts/Montserrat';
import '../styles/global.css';

// import('../../__mocks__').then(({ serverMSW }) => {
//   serverMSW();
// });

export default function App ({ Component, pageProps }: AppProps) {
  const cssFontVariables = `${Lato.variable} ${Montserrat.variable}`;
  return (
    <ErrorBoundary>
  
      <ProductProvider>
        <CartProvider>
          <RecordProvider>
            <div className={cssFontVariables}>
              <Component {...pageProps} />
            </div>
          </RecordProvider>
        </CartProvider>
      </ProductProvider>
  
    </ErrorBoundary>
  );
}