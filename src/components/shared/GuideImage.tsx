import { GuideName } from 'src/types';
import React, { useRef, VFC } from 'react';
import { getGuideLabel } from 'src/utils';
import { UncontrolledTooltip } from 'reactstrap';

interface PropTypes {
  guide: GuideName;
  className: string;
  tooltip?: boolean
}

export const GuideImage: VFC<PropTypes> = ({ guide, className, tooltip = false }) => {
  const guideName = getGuideLabel(guide);
  const logoPath = `/img/logos/${guide}.svg`;
  const imageRef = useRef<HTMLImageElement>(null);
  return (
    <>
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
