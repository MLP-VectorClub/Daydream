import * as React from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { NextSeo } from 'next-seo';
import { NextPage } from 'next';
import { Alert } from 'reactstrap';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import classNames from 'classnames';
import { RootState } from '../store/rootReducer';
import { OLD_SITE_URL, PROD_APP_URL } from '../config';
import { Nullable } from '../types';
import { assembleSeoUrl } from '../utils';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import ExternalLink from './shared/ExternalLink';
import InlineIcon from './shared/InlineIcon';
import { useLayout } from '../hooks/layout';

type PropTypes = {
  url?: Nullable<string>;
}

const Layout = (({ children }) => {
  const { disabled } = useLayout();
  const router = useRouter();
  const { language } = useSelector((state: RootState) => state.core);

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
          locale: language,
        }}
      />
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Sidebar />
      <div id="main">
        <Alert color="warning" className="p-2 mb-2" fade={false}>
          <InlineIcon icon="hard-hat" first />
          This website is a work-in-progress, for our current live site please visit
          {' '}
          <ExternalLink
            href={OLD_SITE_URL + router.asPath}
            blank={false}
            className="alert-link"
          >
            {OLD_SITE_URL + router.asPath}
          </ExternalLink>
        </Alert>
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
