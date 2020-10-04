import React, { useEffect } from 'react';

import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { PROD_APP_URL } from 'src/config';
import { Nullable } from 'src/types';
import { assembleSeoUrl } from 'src/utils';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Sidebar from 'src/components/Sidebar';
import { useLayout } from 'src/hooks';
import Breadcrumbs from 'src/components/shared/Breadcrumbs';
import Notices from 'src/components/shared/Notices';

type PropTypes = {
  url?: Nullable<string>;
}

const Layout = (({ children }) => {
  const { disabled } = useLayout();
  const router = useRouter();

  useEffect(() => {
    document.body.className = classNames({ 'layout-disabled': disabled });
  }, [disabled]);

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <div>
      <NextSeo
        openGraph={{
          url: router.asPath || PROD_APP_URL,
          locale: 'en-US',
        }}
      />
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Sidebar />
      <div id="above-content">
        <Breadcrumbs />
        <Notices />
      </div>
      <div id="main">
        {children}
      </div>
      <Footer />
    </div>
  );
}) as NextPage<PropTypes>;

Layout.getInitialProps = async ctx => {
  const url = ctx.req ? assembleSeoUrl(ctx.req.headers.host, ctx.pathname) : PROD_APP_URL;
  return {
    url,
  };
};

export default Layout;
