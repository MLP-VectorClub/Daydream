import { VFC } from 'react';
import { SlimAppearance } from 'src/types';
import { Card, CardBody } from 'reactstrap';
import Image from 'next/image';
import { PATHS, scaleResize } from 'src/utils';
import Abbr from 'src/components/shared/Abbr';
import Link from 'next/link';
import styles from 'modules/FullGuideAppearanceList.module.scss';
import classNames from 'classnames';

const FullGuideAppearanceList: VFC<{ appearances: SlimAppearance[] }> = ({ appearances }) => (
  <div className={styles.list}>
    {appearances.map(a => {
      let sprite = null;

      // TODO Implement preview squares
      if (a.sprite) {
        const [aspectWidth, aspectHeight] = a.sprite.aspectRatio;
        const spriteStyle = scaleResize(aspectWidth, aspectHeight, 'height', 100);
        sprite = (
          <div className={classNames('mb-2', styles.spriteWrap)}>
            <Image src={a.sprite.path} width={spriteStyle.width} height={spriteStyle.height} unoptimized layout="fixed" />
          </div>
        );
      }

      const lowerCaseLabel = a.label.toLowerCase();
      const nonObviousCharacterTags = (a.characterTagNames as string[]).filter(tag => !lowerCaseLabel.includes(tag));

      return (
        <Link key={a.id} href={PATHS.APPEARANCE(a)} passHref>
          <Card color="link" tag="a" className="mr-2 mb-2">
            <CardBody className={classNames('p-2', styles.cardBody)}>
              {sprite}
              <h3 className={classNames('h5 mb-0', styles.label)}>{a.label}</h3>
              {nonObviousCharacterTags.length > 0 && (
                <small className={classNames('mt-2', styles.aka)}>
                  <Abbr title="Also known as">AKA</Abbr>
                  {` ${nonObviousCharacterTags.join(',')}`}
                </small>
              )}
            </CardBody>
          </Card>
        </Link>
      );
    })}
  </div>
);

export default FullGuideAppearanceList;
