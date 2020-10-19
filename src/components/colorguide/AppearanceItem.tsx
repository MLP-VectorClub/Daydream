import { Card, CardBody, Col, Row } from 'reactstrap';
import { LazyLoadImage, ScrollPosition } from 'react-lazy-load-image-component';
import React, { useMemo } from 'react';
import { Appearance, Sprite } from 'src/types';
import { scaleResize } from 'src/utils';
import AppearanceNotes from 'src/components/colorguide/AppearanceNotes';

export interface AppearanceItemProps {
  appearance: Appearance;
  scrollPosition: ScrollPosition;
}

const AppearanceItem: React.FC<AppearanceItemProps> = ({ appearance, scrollPosition }) => {
  const sprite = appearance.sprite as Sprite | null;

  // Precalculate image width to avoid layout shift
  const spriteStyle = useMemo(() => {
    if (!sprite || !sprite.aspectRatio) {
      return undefined;
    }

    const [aspectWidth, aspectHeight] = sprite.aspectRatio;

    const { width } = scaleResize(aspectWidth, aspectHeight, 'height', 150);

    return { width: `${width}px` };
  }, [sprite]);

  return (
    <Card key={appearance.id} className="appearance-item mb-3">
      <CardBody className="p-2">
        <Row noGutters>
          {sprite !== null && (
            <Col xs="auto">
              <div className="pr-3 sprite-image-wrapper">
                <LazyLoadImage
                  className="sprite-image"
                  src={sprite.path}
                  effect="opacity"
                  scrollPosition={scrollPosition}
                  style={spriteStyle}
                />
              </div>
            </Col>
          )}
          <Col>
            <h5>{appearance.label}</h5>
            <AppearanceNotes appearance={appearance} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default AppearanceItem;
