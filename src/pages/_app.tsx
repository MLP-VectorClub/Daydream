import React from 'react';
import App from 'next/app';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import { AppContextType, AppInitialProps, AppPropsType, NextComponentType } from 'next/dist/next-server/lib/utils';
import { Router } from 'next/router';
import { APP_NAME, fetcher, PROD_APP_URL } from '../config';
import { appWithTranslation, useTranslation } from '../i18n';
import { wrapper } from '../store';
import TitleManager from '../components/TitleManager';
import '../fontawesome';
import '../app.scss';
import AuthModal from '../components/modals/AuthModal';
import ProgressIndicator from '../components/ProgressIndicator';
import { ENDPOINTS } from '../utils';
import Layout from '../components/Layout';

const Celestia: NextComponentType<AppContextType<Router>, AppInitialProps, AppPropsType> = props => {
  const {
    Component,
    pageProps,
  } = props;

  const { language } = useTranslation().i18n;

  return (
    <SWRConfig value={{ fetcher }}>
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
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <AuthModal />
    </SWRConfig>
  );
};

Celestia.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);
  return { ...appProps };
};

export default wrapper.withRedux(appWithTranslation(Celestia));
