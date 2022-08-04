import { CSSProperties, FC, memo } from 'react';
import classNames from 'classnames';
import { Nullable } from 'src/types';

export interface LoadingRingProps {
  color?: Nullable<string>;
  className?: string;
  strokeWidth?: number;
  outline?: boolean;
  inline?: boolean;
  spaceLeft?: boolean;
  spaceRight?: boolean;
  style?: CSSProperties;
}

const LoadingRing: FC<LoadingRingProps> = ({
  color = null,
  className,
  strokeWidth = 6,
  outline = true,
  inline = false,
  spaceLeft = false,
  spaceRight = false,
  style,
}) => {
  const renderedStrokeWidth = inline ? 15 : strokeWidth;
  const renderedOutline = inline ? false : outline;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className={classNames(
        color && `text-${color}`,
        {
          /* eslint-disable @typescript-eslint/naming-convention */
          'mr-2': inline && spaceRight,
          'ml-2': inline && spaceLeft,
          'svg-inline--fa': inline,
          /* eslint-enable @typescript-eslint/naming-convention */
        },
        className
      )}
      style={style}
    >
      {renderedOutline && (
        <circle cx="50" cy="50" r="40" stroke="#fff" fill="none" strokeWidth={String(renderedStrokeWidth * 1.66)} strokeLinecap="round" />
      )}
      <circle cx="50" cy="50" r="40" stroke="currentColor" fill="none" strokeWidth={String(renderedStrokeWidth)} strokeLinecap="round">
        <animate attributeName="stroke-dashoffset" dur="2s" repeatCount="indefinite" from="0" to="502" />
        <animate attributeName="stroke-dasharray" dur="2s" repeatCount="indefinite" values="150.6 100.4;1 250;150.6 100.4" />
      </circle>
    </svg>
  );
};

export default memo(LoadingRing);
