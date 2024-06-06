import { Lato as setupLato } from 'next/font/google';

export const Lato = setupLato({
  display: 'swap',
  subsets: ['latin'],
  style: ['normal'],
  weight: ['400', '700', '900'],
  variable: '--font-lato',
});