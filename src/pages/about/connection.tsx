import Head from 'next/head';
import { NextPage } from 'next';
import React, { useCallback, useMemo } from 'react';
import { Button } from 'reactstrap';
import { GetAboutConnectionResult, MappedAboutConnectionResult, Nullable } from 'src/types';
import { useConnectionInfo, useTitleSetter } from 'src/hooks';
import StandardHeading from 'src/components/shared/StandardHeading';
import Content from 'src/components/shared/Content';
import InlineIcon from 'src/components/shared/InlineIcon';
import Abbr from 'src/components/shared/Abbr';
import { common, connection } from 'src/strings';
import { connectionFetcher } from 'src/fetchers';
import { TitleFactoryVoid } from 'src/types/title';
import { wrapper } from 'src/store';
import { titleSetter } from 'src/utils/core';
import { useDispatch } from 'react-redux';

interface PropTypes {
  connectingAddress: Nullable<string>;
  forwardedFor: Nullable<string | string[]>;
  userAgent: Nullable<string>;
  initialServerInfo?: GetAboutConnectionResult;
}

const titleFactory: TitleFactoryVoid = () => ({
  title: common.titles.connectionInfo,
  breadcrumbs: [],
});

export const ConnectionPage: NextPage<PropTypes> = ({ connectingAddress, forwardedFor, userAgent, initialServerInfo }) => {
  const dispatch = useDispatch();
  const { serverInfo, fetching, backendDown, makeStale } = useConnectionInfo(initialServerInfo);

  const titleData = useMemo(() => titleFactory(), []);
  useTitleSetter(dispatch, titleData);

  const getServerInfo = useCallback((key: keyof MappedAboutConnectionResult) => (
    !fetching && serverInfo ? serverInfo[key] : null
  ), [fetching, serverInfo]);

  return (
    <Content>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <StandardHeading heading={connection.heading} />

      <h3>Frontend: (<Abbr title="Server-Side Rendering">SSR</Abbr>)</h3>
      <p><strong>{connection.connectingAddress}:</strong> <code>{JSON.stringify(connectingAddress)}</code></p>
      <p><strong>{connection.forwardedFor}:</strong> <code>{JSON.stringify(forwardedFor)}</code></p>
      <p><strong>{connection.userAgent}:</strong> <code>{JSON.stringify(userAgent)}</code></p>

      <h3>
        Backend (<Abbr title={common.footer.apiMeaning}>API</Abbr>)
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
      <p><strong>{connection.userAgent}:</strong> <code>{JSON.stringify(getServerInfo('userAgent'))}</code></p>
      <p>
        <strong>{connection.deviceIdentifier}:</strong> <code>{JSON.stringify(getServerInfo('deviceIdentifier'))}</code>
        <br />
        <span className="text-info">
          <InlineIcon icon="info" first />
          This is the name given to your new access tokens by default; this information is gathered from the {connection.userAgent} string
        </span>
      </p>

      <Button onClick={makeStale} disabled={fetching}>
        <InlineIcon icon="sync" first loading={fetching} />
        {connection.updateBackend}
      </Button>
    </Content>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async ctx => {
  const { store, req } = ctx;
  const props: PropTypes = {
    connectingAddress: req.connection.remoteAddress || null,
    forwardedFor: req.headers['x-forwarded-for'] || null,
    userAgent: req.headers['user-agent'] || null,
    initialServerInfo: await connectionFetcher(),
  };

  const connAddr = req.connection.address();
  if (connAddr) {
    props.connectingAddress = typeof connAddr === 'string' ? connAddr : connAddr.address;
  }

  titleSetter(store, titleFactory());
  return { props };
});

export default ConnectionPage;
