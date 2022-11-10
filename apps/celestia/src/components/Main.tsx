import { FC, PropsWithChildren, useEffect, useMemo, useRef, useState } from 'react';

const MOBILE_BREAKPOINT_WIDTH = 992;

export const Main: FC<PropsWithChildren> = ({ children }) => {
  const mainRef = useRef<HTMLElement>(null);
  const [height, setHeight] = useState<string | undefined>('100vh');

  useEffect(() => {
    const headerEl = document.getElementById('header')!;
    const footerEl = document.getElementById('footer')!;
    const aboveContentEl = document.getElementById('above-content')!;
    const resizeListener = () => {
      const { height: headerHeight } = headerEl.getBoundingClientRect();
      const { height: footerHeight } = footerEl.getBoundingClientRect();
      const { height: aboveContentHeight } = aboveContentEl.getBoundingClientRect();
      if (window.innerWidth < MOBILE_BREAKPOINT_WIDTH) {
        setHeight(undefined);
      } else {
        setHeight(`calc(100vh - ${headerHeight + footerHeight + aboveContentHeight}px)`);
      }
    };
    resizeListener();
    window.addEventListener('resize', resizeListener, { passive: true });

    return () => window.removeEventListener('resize', resizeListener);
  });

  const styleAttr = useMemo(() => ({ minHeight: height }), [height]);

  return (
    <main ref={mainRef} style={styleAttr} id="main">
      {children}
    </main>
  );
};
