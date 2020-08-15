import Head from 'next/head';
import { GetServerSideProps } from 'next';
import React from 'react';
import { useTranslation } from '../../i18n';
import StandardHeading from '../../components/shared/StandardHeading';
import Content from '../../components/shared/Content';
import { GetAboutConnectionResult, Nullable } from '../../types';
import { connectionFetcher, useConnectionInfo } from '../../hooks';
import InlineIcon from '../../components/shared/InlineIcon';
import Abbr from '../../components/shared/Abbr';

interface PropTypes {
  connectingAddress: Nullable<string>;
  forwardedFor: Nullable<string | string[]>;
  initialServerInfo?: GetAboutConnectionResult;
}

export const ConnectionPage: React.FC<PropTypes> = ({ connectingAddress, forwardedFor, initialServerInfo }) => {
  const { t } = useTranslation('connection');
  const { serverInfo, loading, backendDown } = useConnectionInfo(initialServerInfo);
  return (
    <Content>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <StandardHeading heading={t(`heading`)} />

      <h3>{t('common:footer.frontend')} (<Abbr title={t('ssrMeaning')}>{t('ssr')}</Abbr>)</h3>
      <p><strong>{t('connectingAddress')}:</strong> <code>{JSON.stringify(connectingAddress)}</code></p>
      <p><strong>{t('forwardedFor')}:</strong> <code>{JSON.stringify(forwardedFor)}</code></p>

      <h3>
        {t('common:footer.backend')} (<Abbr title={t('common:footer.apiMeaning')}>{t('common:footer.api')}</Abbr>)
        {backendDown && (
          <InlineIcon color="danger" icon="server" />
        )}
        {loading && (
          <InlineIcon loading last />
        )}
      </h3>
      <p><strong>{t('commitId')}:</strong> <code>{JSON.stringify(serverInfo?.commitId)}</code></p>
      <p><strong>{t('commitTime')}:</strong> <code>{JSON.stringify(serverInfo?.commitTime)}</code></p>
      <p><strong>{t('connectingAddress')}:</strong> <code>{JSON.stringify(serverInfo?.ip)}</code></p>
      <p><strong>{t('forwardedFor')}:</strong> <code>{JSON.stringify(serverInfo?.proxiedIps)}</code></p>
    </Content>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const props: PropTypes = {
    connectingAddress: ctx.req.connection.remoteAddress || null,
    forwardedFor: null,
    initialServerInfo: await connectionFetcher(),
  };

  const connAddr = ctx.req.connection.address();
  if (connAddr) {
    props.connectingAddress = typeof connAddr === 'string' ? connAddr : connAddr.address;
  }

  const forwardedHeader = ctx.req.headers['x-forwarded-for'];
  if (forwardedHeader) {
    props.forwardedFor = forwardedHeader;
  }

  return { props };
};

export default ConnectionPage;
