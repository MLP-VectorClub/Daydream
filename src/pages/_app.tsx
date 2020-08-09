import React, { useState } from 'react';
import App from 'next/app';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { AppContextType, AppInitialProps, AppPropsType, NextComponentType } from 'next/dist/next-server/lib/utils';
import { Router } from 'next/router';
import { ReactQueryDevtools } from 'react-query-devtools';
import { ReactQueryConfigProvider } from 'react-query';
import { APP_NAME, DEV_ENV, PROD_APP_URL, REACT_QUERY_CONFIG } from '../config';
import { appWithTranslation, useTranslation } from '../i18n';
import { wrapper } from '../store';
import TitleManager from '../components/TitleManager';
import '../fontawesome';
import '../app.scss';
import AuthModal from '../components/modals/AuthModal';
import ProgressIndicator from '../components/ProgressIndicator';
import { ENDPOINTS } from '../utils';
import Layout from '../components/Layout';
import { LayoutContext } from '../hooks/layout';

const Celestia: NextComponentType<AppContextType<Router>, AppInitialProps, AppPropsType> = props => {
  const { Component, pageProps } = props;
  const [disabled, setLayoutDisabled] = useState(false);

  const { language } = useTranslation().i18n;

  return (
    <ReactQueryConfigProvider config={REACT_QUERY_CONFIG}>
      <TitleManager />
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: language,
          url: PROD_APP_URL,
          site_name: APP_NAME,
        }}
      />
      <Head>
        <link rel="preload" href={ENDPOINTS.CSRF_INIT} as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href={ENDPOINTS.USERS_ME} as="fetch" crossOrigin="anonymous" />
      </Head>
      <ProgressIndicator />
      <LayoutContext.Provider value={{ disabled, setLayoutDisabled }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LayoutContext.Provider>
      <AuthModal />
      {DEV_ENV && (
        <ReactQueryDevtools position="bottom-right" initialIsOpen={false} />
      )}
    </ReactQueryConfigProvider>
  );
};

Celestia.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default wrapper.withRedux(appWithTranslation(Celestia));
