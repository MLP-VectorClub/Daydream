import Head from 'next/head';
import { NextPage } from 'next';
import { useCallback, useMemo } from 'react';
import { Button } from 'reactstrap';
import StandardHeading from 'src/components/shared/StandardHeading';
import Content from 'src/components/shared/Content';
import InlineIcon from 'src/components/shared/InlineIcon';
import Abbr from 'src/components/shared/Abbr';
import { TitleFactory } from 'src/types/title';
import { useAppDispatch, wrapper } from 'src/store';
import { titleSetter } from 'src/utils/core';
import { Nullable } from 'src/types/common';
import { GetAboutConnectionResult } from '@mlp-vectorclub/api-types';
import { useConnectionInfo } from 'src/hooks/connection-info';
import { MappedAboutConnectionResult } from 'src/types/api-alias';
import { useTitleSetter } from 'src/hooks/core';
import { connectionFetcher } from 'src/fetchers/connection-info';
import { SSRConfig, useTranslation } from 'next-i18next';
import { typedServerSideTranslations } from 'src/utils/i18n';

interface PropTypes {
  connectingAddress: Nullable<string>;
  forwardedFor: Nullable<string | string[]>;
  userAgent: Nullable<string>;
  initialServerInfo?: GetAboutConnectionResult;
}

const titleFactory: TitleFactory = () => ({
  title: ['common:titles.connectionInfo'],
  breadcrumbs: [],
});

export const ConnectionPage: NextPage<PropTypes> = ({ connectingAddress, forwardedFor, userAgent, initialServerInfo }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { serverInfo, fetching, backendDown, makeStale } = useConnectionInfo(initialServerInfo);

  const titleData = useMemo(titleFactory, []);
  useTitleSetter(dispatch, titleData);

  const getServerInfo = useCallback(
    (key: keyof MappedAboutConnectionResult) => (!fetching && serverInfo ? serverInfo[key] : null),
    [fetching, serverInfo]
  );

  return (
    <Content>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <StandardHeading heading={t('connection:heading')} />

      <h3>
        Frontend: (<Abbr title="Server-Side Rendering">SSR</Abbr>)
      </h3>
      <p>
        <strong>{t('connection:connectingAddress')}:</strong> <code>{JSON.stringify(connectingAddress)}</code>
      </p>
      <p>
        <strong>{t('connection:forwardedFor')}:</strong> <code>{JSON.stringify(forwardedFor)}</code>
      </p>
      <p>
        <strong>{t('connection:userAgent')}:</strong> <code>{JSON.stringify(userAgent)}</code>
      </p>

      <h3>
        Backend (<Abbr title={t('common:footer.apiMeaning')}>API</Abbr>){backendDown && <InlineIcon color="danger" icon="server" />}
        {fetching && <InlineIcon loading last />}
      </h3>
      <p>
        <strong>{t('connection:commitId')}:</strong> <code>{JSON.stringify(getServerInfo('commitId'))}</code>
      </p>
      <p>
        <strong>{t('connection:commitTime')}:</strong> <code>{JSON.stringify(getServerInfo('commitTime'))}</code>
      </p>
      <p>
        <strong>{t('connection:connectingAddress')}:</strong> <code>{JSON.stringify(getServerInfo('ip'))}</code>
      </p>
      <p>
        <strong>{t('connection:forwardedFor')}:</strong> <code>{JSON.stringify(getServerInfo('proxiedIps'))}</code>
      </p>
      <p>
        <strong>{t('connection:userAgent')}:</strong> <code>{JSON.stringify(getServerInfo('userAgent'))}</code>
      </p>
      <p>
        <strong>{t('connection:deviceIdentifier')}:</strong>
        <code>{JSON.stringify(getServerInfo('deviceIdentifier'))}</code>
        <br />
        <span className="text-info">
          <InlineIcon icon="info" first />
          {t('connection:deviceIdentifierInfo')}
        </span>
      </p>

      <Button onClick={makeStale} disabled={fetching}>
        <InlineIcon icon="sync" first loading={fetching} />
        {t('connection:updateBackend')}
      </Button>
    </Content>
  );
};

export const getServerSideProps = wrapper.getServerSideProps<PropTypes & SSRConfig>((store) => async ({ locale, req }) => {
  const props: PropTypes = {
    connectingAddress: req.connection.remoteAddress || null,
    forwardedFor: req.headers['x-forwarded-for'] || null,
    userAgent: req.headers['user-agent'] || null,
    initialServerInfo: await connectionFetcher(),
  };

  const connAddr = req.connection.address();
  if (connAddr && 'address' in connAddr) {
    props.connectingAddress = connAddr.address;
  }

  titleSetter(store, titleFactory());
  return {
    props: {
      ...(await typedServerSideTranslations(locale, ['connection'])),
      ...props,
    },
  };
});

export default ConnectionPage;
