import {
  Card,
  CardBody,
  Col,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
import React, { useRef } from 'react';
import { Appearance } from 'src/types';
import AppearanceNotes from 'src/components/colorguide/AppearanceNotes';
import SpriteImage from 'src/components/colorguide/SpriteImage';
import CompactColorGroups from 'src/components/colorguide/CompactColorGroups';
import InlineIcon from 'src/components/shared/InlineIcon';
import styles from 'modules/AppearanceItem.module.scss';

export interface AppearanceItemProps {
  appearance: Appearance;
  pinned?: boolean;
}

const AppearanceItem: React.FC<AppearanceItemProps> = ({ appearance, pinned = false }) => {
  const pinRef = useRef<HTMLElement>(null);

  return (
    <Card key={appearance.id} className={`${styles.appearanceItem} mb-3`}>
      <CardBody className="p-2">
        <Row noGutters>
          {appearance.sprite && (
            <Col xs="auto">
              <div className="pr-3">
                <SpriteImage sprite={appearance.sprite} />
              </div>
            </Col>
          )}
          <Col>
            <h5 className={styles.appearanceName}>
              {pinned && (
                <>
                  <InlineIcon icon="thumbtack" color="primary" first size="sm" ref={pinRef} />
                  <UncontrolledTooltip target={pinRef} fade={false}>
                    Pinned
                  </UncontrolledTooltip>
                </>
              )}
              {appearance.label}
            </h5>
            <AppearanceNotes appearance={appearance} />
            <CompactColorGroups colorGroups={appearance.colorGroups} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default AppearanceItem;
