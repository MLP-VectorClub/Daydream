import * as React from 'react';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { NextSeo } from 'next-seo/lib';
import { NextPage } from 'next';
import { useTranslation } from '../i18n';
import Header from './Header';
import { RootState } from '../store/rootReducer';
import { PROD_APP_URL } from '../config';
import { Nullable, PageTitle } from '../types';
import { assembleSeoUrl } from '../utils/common';
import { coreActions } from '../store/slices';
import Footer from './Footer';

type PropTypes = {
  title?: PageTitle;
  url?: Nullable<string>;
}

const Layout = (({
  children,
  title = null,
  url = null,
}) => {
  const [localUrl, setLocalUrl] = useState(url);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { language } = useSelector((state: RootState) => state.core);

  useEffect(() => {
    const windowUrl = window.location.href;
    if (localUrl !== windowUrl) {
      setLocalUrl(window.location.href);
    }
  });

  useEffect(() => {
    dispatch(coreActions.setTitle(title));
  }, [title]);

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
      <Header t={t} />
      <div id="main">
        {children}
      </div>
      <Footer t={t} />
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
