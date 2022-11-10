import { FC } from 'react';
import { Appearance, CutieMark } from '@mlp-vectorclub/api-types';
import styles from 'modules/AppearanceCutieMarks.module.scss';
import { Button, Card, CardBody } from 'reactstrap';
import { CutieMarkPreview } from 'src/components/colorguide/CutieMarkPreview';
import { useAuth } from 'src/hooks';
import { createFavMeUrl, permission } from 'src/utils';
import Image from 'next/image';
import capitalize from 'capitalize';
import ButtonCollection from 'src/components/shared/ButtonCollection';
import InlineIcon from 'src/components/shared/InlineIcon';
import pluralize from 'pluralize';
import UserLinkWithAvatar from 'src/components/shared/UserLinkWithAvatar';
import { ResponsiveContainer } from 'src/components/shared/ResponsiveContainer';

interface PropTypes {
  label: string;
  cutieMarks?: CutieMark[];
  colorGroups: Appearance['colorGroups'];
}

export const AppearanceCutieMarks: FC<PropTypes> = ({ label, cutieMarks, colorGroups }) => {
  const { user } = useAuth();
  const isDeveloper = user.role && permission('developer', user.role);

  if (!cutieMarks || cutieMarks.length === 0) return null;

  return (
    <>
      <h2>
        <InlineIcon icon="image" first size="xs" />
        {pluralize('Cutie mark', cutieMarks.length)}
      </h2>
      <p className={styles.aside}>
        These are just illustrations, the body shape & colors are <strong>not</strong> guaranteed to reflect the actual design.
      </p>
      <div className={styles.cutieMarks}>
        {cutieMarks.map((cm) => {
          const facingText = cm.facing ? `Facing ${capitalize(cm.facing)}` : 'Symmetrical';
          const cmTitleId = `cutie-mark-${cm.id}-title`;
          return (
            <Card key={cm.id} className={styles.cutieMarkCard} aria-describedby={cmTitleId}>
              <CardBody className="p-2">
                <span className={styles.title} id={cmTitleId}>
                  {isDeveloper && (
                    <span className="text-muted mr-2" aria-hidden="true">
                      #{cm.id}
                    </span>
                  )}
                  {cm.label || facingText}
                </span>
                {cm.label && <span className={styles.subtitle}>{facingText}</span>}
                <div className={styles.preview}>
                  <CutieMarkPreview {...cm} colorGroups={colorGroups} />
                  <div className={styles.previewImageContainer}>
                    <div className={styles.previewImageWrap} style={{ transform: `rotate(${cm.rotation}deg)` }}>
                      <ResponsiveContainer size={1}>
                        <Image src={cm.viewUrl} unoptimized fill alt="Cutie mark vector" />
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                <ButtonCollection className="mt-3">
                  <Button
                    tag="a"
                    size="sm"
                    color="ui"
                    href={cm.viewUrl}
                    download={`${label} Cutie Mark.svg`}
                    aria-label="Download SVG file"
                  >
                    <InlineIcon icon="download" first />
                    SVG
                  </Button>
                  {cm.favMe && (
                    <Button tag="a" size="sm" color="deviantart" href={createFavMeUrl(cm.favMe)} aria-label="View source on DeviantArt">
                      <InlineIcon icon={['fab', 'deviantart']} first />
                      Source
                    </Button>
                  )}
                </ButtonCollection>
                {cm.contributor && (
                  <div className={styles.byLine}>
                    <span className="mr-2">By</span>
                    <UserLinkWithAvatar {...cm.contributor} />
                  </div>
                )}
              </CardBody>
            </Card>
          );
        })}
      </div>
    </>
  );
};
