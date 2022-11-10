import { useMemo, useRef, useState } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClientProvider } from 'react-query';
import { DEV_ENV } from 'src/config';
import { wrapper } from 'src/store';
import TitleManager from 'src/components/TitleManager';
import { appLibrary } from '../fontawesome';
import '../app.scss';
import AuthModal from 'src/components/modals/AuthModal';
import ProgressIndicator from 'src/components/ProgressIndicator';
import Layout from 'src/components/Layout';
import { LayoutContextProvider } from 'src/hooks';
import { appWithTranslation } from 'next-i18next';
import { AppComponent } from 'next/dist/shared/lib/router/router';
import { queryClient } from 'src/store/queryClient';
import { Provider } from 'react-redux';

const Celestia: AppComponent = ({ Component, ...rest }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- props type is a fixed "any" value
  const { store, props } = wrapper.useWrappedStore(rest);
  const [disabled, setLayoutDisabled] = useState(false);
  useRef(appLibrary);

  const layoutContext = useMemo(() => ({ disabled, setLayoutDisabled }), [disabled, setLayoutDisabled]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TitleManager />
        <ProgressIndicator />
        <LayoutContextProvider value={layoutContext}>
          <Layout>
            {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access -- props type is a fixed "any" value */}
            <Component {...props.pageProps} />
          </Layout>
        </LayoutContextProvider>
        <AuthModal />
        {DEV_ENV && <ReactQueryDevtools position="top-right" initialIsOpen={false} />}
      </QueryClientProvider>
    </Provider>
  );
};

export default appWithTranslation(Celestia);
