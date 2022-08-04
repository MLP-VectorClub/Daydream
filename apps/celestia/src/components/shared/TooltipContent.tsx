import { FC, PropsWithChildren, useEffect } from 'react';

interface TooltipContentProps extends PropsWithChildren {
  scheduleUpdate: VoidFunction;
}

const TooltipContent: FC<TooltipContentProps> = ({ scheduleUpdate, children }) => {
  useEffect(() => {
    scheduleUpdate();
  }, [scheduleUpdate, children]);

  return <>{children}</>;
};

export default TooltipContent;
