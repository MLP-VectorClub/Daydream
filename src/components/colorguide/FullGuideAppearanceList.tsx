import { VFC } from 'react';
import { SlimAppearance } from 'src/types';
import { Card, CardBody } from 'reactstrap';
import Image from 'next/image';
import { PATHS, scaleResize } from 'src/utils';
import Abbr from 'src/components/shared/Abbr';
import Link from 'next/link';

const FullGuideAppearanceList: VFC<{ appearances: SlimAppearance[] }> = ({ appearances }) => (
  <div className="d-flex flex-wrap align-items-sm-stretch justify-content-start">
    {appearances.map(a => {
      let sprite = null;

      // TODO Implement preview squares
      if (a.sprite) {
        const [aspectWidth, aspectHeight] = a.sprite.aspectRatio;
        const spriteStyle = scaleResize(aspectWidth, aspectHeight, 'height', 100);
        sprite = <Image src={a.sprite.path} width={spriteStyle.width} height={spriteStyle.height} unoptimized layout="fixed" />;
      }

      const lowerCaseLabel = a.label.toLowerCase();
      const nonObviousCharacterTags = (a.characterTagNames as string[]).filter(tag => !lowerCaseLabel.includes(tag));

      return (
        <Link key={a.id} href={PATHS.APPEARANCE(a)} passHref>
          <Card color="link" tag="a" className="mr-2 mb-2">
            <CardBody className="p-2 d-flex flex-column align-items-center justify-content-end text-center">
              <div className="d-flex justify-content-center">
                {sprite}
              </div>
              <h3 className="h5 mb-0">{a.label}</h3>
              {nonObviousCharacterTags.length > 0 && (
                <small className="d-block text-dark mt-2">
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
