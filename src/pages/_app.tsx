import React from 'react';
import App from 'next/app';
import { DefaultSeo } from 'next-seo';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { APP_NAME, PROD_APP_URL } from '../config';
import { appWithTranslation } from '../i18n';
import { initStore } from '../store';
import TitleManager from '../components/TitleManager';
import '../fontawesome';
import '../app.scss';

class Celestia extends App {
  render() {
    const { Component, pageProps } = this.props;
    // next-i18next's type definitions are the worst
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { initialLanguage, store: passedStore } = this.props as any;

    return (
      <Provider store={passedStore}>
        <TitleManager />
        <DefaultSeo
          openGraph={{
            type: 'website',
            locale: initialLanguage,
            url: PROD_APP_URL,
            site_name: APP_NAME,
          }}
        />
        <Component {...pageProps} />
      </Provider>
    );
  }
}

export default withRedux(initStore)(appWithTranslation(Celestia));
