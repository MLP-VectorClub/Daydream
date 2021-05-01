import { VFC } from 'react';
import { Appearance, CutieMark } from 'src/types';
import styles from 'modules/AppearanceCutieMarks.module.scss';
import { Button, Card, CardBody } from 'reactstrap';
import { CutieMarkPreview } from 'src/components/colorguide/CutieMarkPreview';
import { useAuth } from 'src/hooks';
import { createFavMeUrl, permission } from 'src/utils';
import Image from 'next/image';
import capitalize from 'capitalize';
import ButtonCollection from 'src/components/shared/ButtonCollection';
import InlineIcon from 'src/components/shared/InlineIcon';
import UserLink from 'src/components/shared/UserLink';

interface PropTypes {
  label: string;
  cutieMarks: CutieMark[];
  colorGroups: Appearance['colorGroups'];
}

export const CutieMarks: VFC<PropTypes> = ({ label, cutieMarks, colorGroups }) => {
  const { user } = useAuth();
  const isDeveloper = user.role && permission('developer', user.role);
  return (
    <div className={styles.cutieMarks}>
      {cutieMarks.map(cm => {
        const facingText = cm.facing ? `Facing ${capitalize(cm.facing)}` : 'Symmetrical';
        return (
          <Card key={cm.id} className={styles.cutieMarkCard}>
            <CardBody className="p-2">
              <span className={styles.title}>
                {isDeveloper && <span className="text-muted mr-2">#{cm.id}</span>}
                {cm.label || facingText}
              </span>
              {cm.label && (
                <span className={styles.subtitle}>
                  {facingText}
                </span>
              )}
              <div className={styles.preview}>
                <CutieMarkPreview {...cm} colorGroups={colorGroups} />
                <div className={styles.previewImageContainer}>
                  <div className={styles.previewImageWrap} style={{ transform: `rotate(${cm.rotation}deg)` }}>
                    <Image src={cm.viewUrl} unoptimized layout="fill" />
                  </div>
                </div>
              </div>
              <ButtonCollection className="mt-3">
                <Button tag="a" size="sm" color="ui" href={cm.viewUrl} download={`${label} Cutie Mark.svg`}>
                  <InlineIcon icon="download" first />
                  SVG
                </Button>
                {cm.favMe && (
                  <Button tag="a" size="sm" color="deviantart" href={createFavMeUrl(cm.favMe)}>
                    <InlineIcon icon={['fab', 'deviantart']} first />
                    Source
                  </Button>
                )}
              </ButtonCollection>
              {cm.contributor && (
                <div className={styles.byLine}>
                  <span className="mr-2">By</span>
                  <UserLink {...cm.contributor} className="d-flex align-items-center border rounded pr-1 bg-light overflow-hidden">
                    {cm.contributor.avatarUrl && (
                      <Image src={cm.contributor.avatarUrl} layout="fixed" width={27} height={27} unoptimized />
                    )}
                    <span className="ml-2">{cm.contributor.name}</span>
                  </UserLink>
                </div>
              )}
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};
