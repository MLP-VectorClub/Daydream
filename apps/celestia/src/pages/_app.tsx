import { FC, PropsWithChildren, useState } from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import { ReactQueryConfigProvider, ReactQueryConfigProviderProps } from 'react-query';
import { DEV_ENV, REACT_QUERY_CONFIG } from 'src/config';
import { wrapper } from 'src/store';
import TitleManager from 'src/components/TitleManager';
import '../fontawesome';
import '../app.scss';
import AuthModal from 'src/components/modals/AuthModal';
import ProgressIndicator from 'src/components/ProgressIndicator';
import Layout from 'src/components/Layout';
import { LayoutContext } from 'src/hooks';
import { appWithTranslation } from 'next-i18next';
import { AppComponent } from 'next/dist/shared/lib/router/router';

const RQCP = ReactQueryConfigProvider as FC<ReactQueryConfigProviderProps & PropsWithChildren>;

const Celestia: AppComponent = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { Component, pageProps } = props;
  const [disabled, setLayoutDisabled] = useState(false);

  return (
    <RQCP config={REACT_QUERY_CONFIG}>
      <TitleManager />
      <ProgressIndicator />
      <LayoutContext.Provider value={{ disabled, setLayoutDisabled }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </LayoutContext.Provider>
      <AuthModal />
      {DEV_ENV && <ReactQueryDevtools position="top-right" initialIsOpen={false} />}
    </RQCP>
  );
};

export default wrapper.withRedux(appWithTranslation(Celestia));
