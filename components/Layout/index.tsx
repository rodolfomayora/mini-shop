import React, { FC } from 'react';
import Head from 'next/head';

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
    <main>{children}</main>
  </>
)

export default Layout;