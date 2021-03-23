import { FC, useEffect } from 'react';

interface TooltipContentProps {
  scheduleUpdate: VoidFunction;
}

const TooltipContent: FC<TooltipContentProps> = ({ scheduleUpdate, children }) => {
  useEffect(() => {
    scheduleUpdate();
  }, [scheduleUpdate, children]);

  return <>{children}</>;
};

export default TooltipContent;
