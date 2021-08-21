import React, { FC } from 'react';

import Head from 'next/head';

import Container from '../Container';
import Header from '../Header';
import { MainContent } from './styles';

type LayoutProps = {
  pageTitle: string
}

const Layout: FC<LayoutProps> = ({ children, pageTitle }) => (
  <>
    <Head>
      <title>{`${pageTitle} | Mini Shop`}</title>
      <meta charSet='UTF-8' />
      <meta name="theme-color" content="#273c75" />
    </Head>

    <Header />
    <MainContent>
      <Container>
        {children}
      </Container>  
    </MainContent>
  </>
)

export default Layout;