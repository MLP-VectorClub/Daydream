import React, { useEffect } from 'react';

interface TooltipContentProps {
  scheduleUpdate: VoidFunction;
}

const TooltipContent: React.FC<TooltipContentProps> = ({ scheduleUpdate, children }) => {
  useEffect(() => {
    scheduleUpdate();
  }, [scheduleUpdate, children]);

  return <>{children}</>;
};

export default TooltipContent;
