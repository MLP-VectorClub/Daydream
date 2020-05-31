import React, { memo } from 'react';

export interface LoadingRingProps {
  className?: string;
  strokeWidth?: number;
}

export default memo<LoadingRingProps>(({ className, strokeWidth = 6 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    className={className}
  >
    <rect x="0" y="0" width="100" height="100" fill="none" className="bk" />
    <circle
      cx="50"
      cy="50"
      r="40"
      stroke="currentColor"
      fill="none"
      strokeWidth={String(strokeWidth)}
      strokeLinecap="round"
    >
      <animate
        attributeName="stroke-dashoffset"
        dur="2s"
        repeatCount="indefinite"
        from="0"
        to="502"
      />
      <animate
        attributeName="stroke-dasharray"
        dur="2s"
        repeatCount="indefinite"
        values="150.6 100.4;1 250;150.6 100.4"
      />
    </circle>
  </svg>
));
