import { FC, memo } from 'react';
import { AppearancePreviewData } from '@mlp-vectorclub/api-types';
import styles from 'modules/AppearancePreview.module.scss';
import classNames from 'classnames';

interface PropTypes {
  data?: AppearancePreviewData;
  className: string;
}

const AppearancePreviewComponent: FC<PropTypes> = ({ data, className }) => {
  const colorCount = data?.length || 0;

  let svgContents;
  switch (colorCount) {
    case 1:
      svgContents = <rect x="0" y="0" width="2" height="2" fill={data![0]} />;
      break;
    case 3:
      svgContents = (
        <>
          <rect x="0" y="0" width="2" height="2" fill={data![0]} />
          <rect x="0" y="1" width="1" height="1" fill={data![1]} />
          <rect x="1" y="1" width="1" height="1" fill={data![2]} />
        </>
      );
      break;
    case 2:
    case 4:
      {
        let x = 0;
        let y = 0;
        svgContents = (
          <>
            {data!.map(($c, index) => {
              const w = x % 2 === 0 ? 2 : 1;
              const h = y % 2 === 0 ? 2 : 1;
              const node = <rect key={index} x={x} y={y} width={w} height={h} fill={$c} />;
              x++;
              if (x > 1) {
                x = 0;
                y = 1;
              }
              return node;
            })}
          </>
        );
      }
      break;
    default:
      // Checker pattern
      svgContents = (
        <>
          <rect fill="#FFFFFF" width="2" height="2" />
          <rect fill="#EFEFEF" width="1" height="1" />
          <rect fill="#EFEFEF" width="1" height="1" x="1" y="1" />
        </>
      );
      break;
  }

  if (colorCount > 0) {
    svgContents = (
      <>
        <defs>
          <filter id="b" x="0" y="0">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.4" />
          </filter>
        </defs>
        <g filter="url(#b)">{svgContents}</g>
      </>
    );
  }

  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox=".5 .5 1 1"
      enableBackground="new 0 0 2 2"
      xmlSpace="preserve"
      preserveAspectRatio="xMidYMid slice"
      className={classNames(styles.previewSvg, className)}
    >
      {svgContents}
    </svg>
  );
};

export const AppearancePreview = memo(AppearancePreviewComponent);
