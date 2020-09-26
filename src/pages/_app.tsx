import React, { useState } from 'react';
import App from 'next/app';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { AppContextType, AppInitialProps, AppPropsType, NextComponentType } from 'next/dist/next-server/lib/utils';
import { Router } from 'next/router';
import { ReactQueryDevtools } from 'react-query-devtools';
import { ReactQueryConfigProvider } from 'react-query';
import { ENDPOINTS } from 'src/utils';
import { APP_NAME, DEV_ENV, PROD_APP_URL, REACT_QUERY_CONFIG } from 'src/config';
import { appWithTranslation, useTranslation } from 'src/i18n';
import { wrapper } from 'src/store';
import TitleManager from 'src/components/TitleManager';
import '../fontawesome';
import '../app.scss';
import AuthModal from 'src/components/modals/AuthModal';
import ProgressIndicator from 'src/components/ProgressIndicator';
import Layout from 'src/components/Layout';
import { LayoutContext } from 'src/hooks';
import { WithI18nNamespaces } from 'src/types';

const Celestia: NextComponentType<AppContextType<Router>, AppInitialProps, AppPropsType> = props => {
  const { Component, pageProps } = props;
  const [disabled, setLayoutDisabled] = useState(false);

  const { i18n: { language } } = useTranslation();

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
  const { defaultProps } = appContext.Component;

  return {
    ...appProps,
    pageProps: {
      namespacesRequired: [
        ...(appProps.pageProps.namespacesRequired || []),
        ...((defaultProps as WithI18nNamespaces)?.i18nNamespaces || []),
      ],
    },
  };
};

export default wrapper.withRedux(appWithTranslation(Celestia));
