import React from 'react';
import { scaleResize } from 'src/utils';
import { Col } from 'reactstrap';
import Image from 'next/image';
import { Sprite } from 'src/types';
import styles from 'modules/SpriteColumn.module.scss';

interface PropTypes {
  sprite: Sprite | null;
}

const SpriteColumn: React.FC<PropTypes> = ({ sprite }) => {
  if (!sprite) {
    return null;
  }

  const [aspectWidth, aspectHeight] = sprite.aspectRatio;

  const spriteStyle = scaleResize(aspectWidth, aspectHeight, 'height', 150);

  return (
    <Col xs="auto">
      <div className="pr-3">
        <Image
          className={styles.spriteImage}
          src={sprite.path}
          width={spriteStyle.width}
          height={spriteStyle.height}
          unoptimized
        />
      </div>
    </Col>
  );
};

export default SpriteColumn;
