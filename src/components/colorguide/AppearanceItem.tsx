import { Card, CardBody, Col, Row } from 'reactstrap';
import { LazyLoadImage, ScrollPosition } from 'react-lazy-load-image-component';
import classNames from 'classnames';
import React from 'react';
import { Appearance, Nullable } from 'src/types';
import { useTranslation } from 'src/i18n';

export interface AppearanceItemProps {
  appearance: Appearance;
  scrollPosition: ScrollPosition;
}

const AppearanceItem = ({ appearance, scrollPosition }: AppearanceItemProps) => {
  const { t } = useTranslation('color-guide');
  const sprite = (appearance.sprite as Nullable<typeof appearance.sprite>);
  return (
    <Card key={appearance.id} className="appearance-item mb-3">
      <CardBody className="p-2">
        <Row noGutters>
          {sprite !== null && (
            <Col xs="auto">
              <div className="pr-3">
                <LazyLoadImage
                  className="sprite-image"
                  src={sprite.path}
                  placeholderSrc={sprite.preview}
                  effect="blur"
                  scrollPosition={scrollPosition}
                />
              </div>
            </Col>
          )}
          <Col>
            <h5>{appearance.label}</h5>
            <div className="notes">
              {/* TODO Parse notes and convert links */}
              {appearance.notes && <span dangerouslySetInnerHTML={{ __html: appearance.notes }} />}
              {appearance.hasCutieMarks && (
                <span className={classNames({ 'ml-2 pl-2 border-left': appearance.notes })}>
                  {t('appearances.cmAvailable')}
                </span>
              )}
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default AppearanceItem;
