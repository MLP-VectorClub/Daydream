import { GuideName } from '@mlp-vectorclub/api-types';
import { FC, useRef } from 'react';
import { getGuideLabel } from 'src/utils';
import { UncontrolledTooltip } from 'reactstrap';

interface PropTypes {
  guide: GuideName;
  className?: string;
  tooltip?: boolean;
}

export const GuideImage: FC<PropTypes> = ({ guide, className, tooltip = false }) => {
  const guideName = getGuideLabel(guide);
  const logoPath = `/img/logos/${guide}.svg`;
  const imageRef = useRef<HTMLImageElement>(null);
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/img/blank-pixel.png"
        className={className}
        alt={`${guideName} logo`}
        style={{ backgroundImage: `url(${logoPath})` }}
        ref={imageRef}
      />
      {tooltip && (
        <UncontrolledTooltip target={imageRef} fade={false}>
          {guideName}
        </UncontrolledTooltip>
      )}
    </>
  );
};
