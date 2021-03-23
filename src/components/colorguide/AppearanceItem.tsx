import {
  Card,
  CardBody,
  Col,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
import { useRef, VFC } from 'react';
import { Appearance, GuideName, Nullable } from 'src/types';
import AppearanceNotes from 'src/components/colorguide/AppearanceNotes';
import SpriteImage from 'src/components/colorguide/SpriteImage';
import CompactColorGroups from 'src/components/colorguide/CompactColorGroups';
import InlineIcon from 'src/components/shared/InlineIcon';
import styles from 'modules/AppearanceItem.module.scss';
import AppearanceTags from 'src/components/colorguide/AppearanceTags';

export interface AppearanceItemProps {
  appearance: Appearance;
  pinned?: boolean;
  guide?: Nullable<GuideName>;
}

const PINNED_TOOLTIP = 'Pinned';

const AppearanceItem: VFC<AppearanceItemProps> = ({ appearance, pinned = false, guide }) => {
  const pinRef = useRef<HTMLElement>(null);

  return (
    <Card
      key={appearance.id}
      className={`${styles.appearanceItem} mb-3`}
      role="region"
      aria-label={pinned ? 'Pinned Appearance' : 'Appearance'}
    >
      <CardBody className="p-2">
        <Row noGutters>
          {appearance.sprite && (
            <Col xs="auto">
              <div className="pr-3" role="presentation">
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
                    {PINNED_TOOLTIP}
                  </UncontrolledTooltip>
                </>
              )}
              {appearance.label}
            </h5>
            <AppearanceNotes appearance={appearance} />
            <AppearanceTags tags={appearance.tags} guide={guide} />
            <CompactColorGroups colorGroups={appearance.colorGroups} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default AppearanceItem;
