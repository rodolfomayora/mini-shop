import type { ReactNode } from 'react';
import Head from 'next/head';
import { Container } from '#components/Container';
import { Header } from '#components/Header';

type Props = {
  children: ReactNode,
  pageTitle: string,
}

/* dark theme backup: main
background-color: ${colors.dark.black};
*/

export function Layout ({ children, pageTitle }: Props) {
  return (
    <>
      <Head> 
        <title>{`${pageTitle} | Mini Shop`}</title>
        <meta charSet='UTF-8' />
        <meta name="theme-color" content="#273c75" />
      </Head>
      <Header />
      <main className="py-[40px] md:py-[60px]">
        <Container>
          {children}
        </Container>  
      </main>
    </>
  );
}