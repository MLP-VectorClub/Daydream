import { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import LoadingBar from 'react-top-loading-bar';
import { Router } from 'next/router';
import { Nullable } from '../types';

type BarState = Nullable<{ continuousStart: VoidFunction; complete: VoidFunction }>;

export default (() => {
  const [bar, onRef] = useState<BarState>(null);

  useEffect(() => {
    const start = () => bar && bar.continuousStart();
    const complete = () => bar && bar.complete();
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', complete);
    Router.events.on('routeChangeError', complete);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', complete);
      Router.events.off('routeChangeError', complete);
    };
  }, [bar]);

  return (
    <LoadingBar
      height={2}
      color="rgba(255,255,255,.8)"
      onRef={onRef}
    />
  );
}) as React.FC;
