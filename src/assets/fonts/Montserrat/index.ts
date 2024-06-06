import { Montserrat as setupMontserrat } from 'next/font/google';

export const Montserrat = setupMontserrat({
  display: 'swap',
  subsets: ['latin'],
  style: ['normal'],
  weight: ['400', '600', '900'],
  variable: '--font-montserrat',
});