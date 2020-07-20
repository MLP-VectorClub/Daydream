import { useEffect, useState } from 'react';
import { Router } from 'next/router';
import TopBarProgress from 'react-topbar-progress-indicator';

TopBarProgress.config({
  barColors: ['rgba(255,255,255,.75)'],
  shadowBlur: 5,
  barThickness: 2,
});

export default (() => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const start = () => {
      setVisible(true);
    };
    const complete = () => {
      setVisible(false);
    };

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', complete);
    Router.events.on('routeChangeError', complete);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', complete);
      Router.events.off('routeChangeError', complete);
    };
  }, []);

  return visible && <TopBarProgress />;
}) as React.FC;
