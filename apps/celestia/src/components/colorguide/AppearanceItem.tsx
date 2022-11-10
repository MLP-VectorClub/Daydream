import { Card, CardBody, Col, Row, UncontrolledTooltip } from 'reactstrap';
import { FC, RefObject, useMemo, useRef } from 'react';
import { Nullable } from 'src/types';
import { Appearance, GuideName } from '@mlp-vectorclub/api-types';
import AppearanceItemNotes from 'src/components/colorguide/AppearanceItemNotes';
import SpriteImage from 'src/components/colorguide/SpriteImage';
import AppearanceItemColorGroups from 'src/components/colorguide/AppearanceItemColorGroups';
import InlineIcon from 'src/components/shared/InlineIcon';
import styles from 'modules/AppearanceItem.module.scss';
import AppearanceItemTags from 'src/components/colorguide/AppearanceItemTags';
import Link from 'next/link';
import { PATHS } from 'src/paths';

export interface AppearanceItemProps {
  appearance: Appearance;
  pinned?: boolean;
  guide?: Nullable<GuideName>;
}

const PINNED_TOOLTIP = 'Pinned';

const AppearanceItem: FC<AppearanceItemProps> = ({ appearance, pinned = false, guide }) => {
  const pinRef = useRef<SVGSVGElement>(null);

  const appearanceLink = useMemo(() => PATHS.APPEARANCE(appearance), [appearance]);

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
                  <UncontrolledTooltip target={pinRef as unknown as RefObject<HTMLElement>} fade={false}>
                    {PINNED_TOOLTIP}
                  </UncontrolledTooltip>
                </>
              )}
              <Link href={appearanceLink}>
                {appearance.label}
              </Link>
            </h5>
            <AppearanceItemNotes notes={appearance.notes} hasCutieMarks={appearance.hasCutieMarks} />
            <AppearanceItemTags tags={appearance.tags} guide={guide} />
            <AppearanceItemColorGroups colorGroups={appearance.colorGroups} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default AppearanceItem;
