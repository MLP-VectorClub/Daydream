import * as React from 'react';
import { useEffect } from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { NextPage } from 'next';
import { Alert } from 'reactstrap';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import { OLD_SITE_URL, PROD_APP_URL } from 'src/config';
import { Nullable } from 'src/types';
import { assembleSeoUrl } from 'src/utils';
import Header from 'src/components/Header';
import Footer from 'src/components/Footer';
import Sidebar from 'src/components/Sidebar';
import ExternalLink from 'src/components/shared/ExternalLink';
import InlineIcon from 'src/components/shared/InlineIcon';
import { useLayout } from 'src/hooks';
import { useTranslation } from 'src/i18n';

type PropTypes = {
  url?: Nullable<string>;
}

const Layout = (({ children }) => {
  const { disabled } = useLayout();
  const router = useRouter();
  const { t, i18n } = useTranslation();

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
          locale: i18n.language,
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
          {`${t('wipNotice')} `}
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
