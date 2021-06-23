import React, { FC } from 'react';
import Head from 'next/head';
import Container from '../Container';
import Header from '../Header';

type LayoutProps = {
  pageTitle: string
}

const Layout: FC<LayoutProps> = ({ children, pageTitle }) => (
  <>
    <Head>
      <title>{`${pageTitle} | Regular Shop`}</title>
      <meta charSet='UTF-8' />
    </Head>
    <Header />
    <main>
      <Container>
        {children}
      </Container>  
    </main>
  </>
)

export default Layout;