import Head from 'next/head';
import { GetServerSideProps } from 'next';
import React, { useCallback } from 'react';
import { Button } from 'reactstrap';
import { GetAboutConnectionResult, MappedAboutConnectionResult, Nullable } from 'src/types';
import { connectionFetcher, useConnectionInfo } from 'src/hooks';
import StandardHeading from 'src/components/shared/StandardHeading';
import Content from 'src/components/shared/Content';
import InlineIcon from 'src/components/shared/InlineIcon';
import Abbr from 'src/components/shared/Abbr';
import { common, connection } from 'src/strings';

interface PropTypes {
  connectingAddress: Nullable<string>;
  forwardedFor: Nullable<string | string[]>;
  initialServerInfo?: GetAboutConnectionResult;
}

export const ConnectionPage: React.FC<PropTypes> = ({ connectingAddress, forwardedFor, initialServerInfo }) => {
  const { serverInfo, fetching, backendDown, makeStale } = useConnectionInfo(initialServerInfo);

  const getServerInfo = useCallback((key: keyof MappedAboutConnectionResult) => (
    !fetching && serverInfo ? serverInfo[key] : null
  ), [fetching, serverInfo]);

  return (
    <Content>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <StandardHeading heading={connection.heading} />

      <h3>Frontend: (<Abbr title={connection.ssrMeaning}>{connection.ssr}</Abbr>)</h3>
      <p><strong>{connection.connectingAddress}:</strong> <code>{JSON.stringify(connectingAddress)}</code></p>
      <p><strong>{connection.forwardedFor}:</strong> <code>{JSON.stringify(forwardedFor)}</code></p>

      <h3>
        Backend (<Abbr title={common.footer.apiMeaning}>{common.footer.api}</Abbr>)
        {backendDown && (
          <InlineIcon color="danger" icon="server" />
        )}
        {fetching && (
          <InlineIcon loading last />
        )}
      </h3>
      <p><strong>{connection.commitId}:</strong> <code>{JSON.stringify(getServerInfo('commitId'))}</code></p>
      <p><strong>{connection.commitTime}:</strong> <code>{JSON.stringify(getServerInfo('commitTime'))}</code></p>
      <p><strong>{connection.connectingAddress}:</strong> <code>{JSON.stringify(getServerInfo('ip'))}</code></p>
      <p><strong>{connection.forwardedFor}:</strong> <code>{JSON.stringify(getServerInfo('proxiedIps'))}</code></p>

      <Button onClick={makeStale} disabled={fetching}>
        <InlineIcon icon="sync" first loading={fetching} />
        {connection.updateBackend}
      </Button>
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
