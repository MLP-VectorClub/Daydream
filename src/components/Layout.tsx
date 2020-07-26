import * as React from 'react';
import {
  ReactNode,
  ReactNodeArray,
  useEffect,
  useState,
} from 'react';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { NextSeo } from 'next-seo';
import { NextPage } from 'next';
import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RootState } from '../store/rootReducer';
import { PROD_APP_URL } from '../config';
import { Nullable } from '../types';
import { assembleSeoUrl } from '../utils';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

type PropTypes = {
  url?: Nullable<string>;
  widgets?: ReactNode | ReactNodeArray;
}

const Layout = (({
  children,
  widgets = null,
  url = null,
}) => {
  const [localUrl, setLocalUrl] = useState(url);
  const { language } = useSelector((state: RootState) => state.core);

  useEffect(() => {
    const updateUrl = () => {
      const windowUrl = window.location.href;
      if (localUrl !== windowUrl) {
        setLocalUrl(windowUrl);
      }
    };

    updateUrl();

    const sub = fromEvent(window, 'popstate').pipe(
      tap(() => updateUrl()),
    ).subscribe();

    return () => {
      sub.unsubscribe();
    };
  });

  return (
    <div>
      <NextSeo
        openGraph={{
          url: localUrl || PROD_APP_URL,
          locale: language,
        }}
      />
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Sidebar {...{ widgets }} />
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
