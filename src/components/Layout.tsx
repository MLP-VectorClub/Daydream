import React, { FC, useEffect } from 'react';

import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { assembleSeoUrl, isClientSide } from 'src/utils';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Sidebar from 'src/components/Sidebar';
import { useLayout } from 'src/hooks';
import Breadcrumbs from 'src/components/shared/Breadcrumbs';
import Notices from 'src/components/shared/Notices';

const Layout: FC = ({ children }) => {
  const { disabled } = useLayout();
  const router = useRouter();

  useEffect(() => {
    document.body.className = classNames({ 'layout-disabled': disabled });
  }, [disabled]);

  if (disabled) {
    return <>{children}</>;
  }

  const host = isClientSide ? location.host : undefined;

  return (
    <div>
      <NextSeo
        openGraph={{
          url: assembleSeoUrl(host, router.asPath),
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
      <aside id="above-content">
        <Breadcrumbs />
        <Notices />
      </aside>
      <main id="main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
