import React from 'react';
import { scaleResize } from 'src/utils';
import Image from 'next/image';
import { Sprite } from 'src/types';
import styles from 'modules/SpriteColumn.module.scss';

interface PropTypes {
  sprite: Sprite | null;
  height?: number;
}

const SpriteImage: React.FC<PropTypes> = ({ sprite, height = 150 }) => {
  if (!sprite) {
    return null;
  }

  const [aspectWidth, aspectHeight] = sprite.aspectRatio;

  const spriteStyle = scaleResize(aspectWidth, aspectHeight, 'height', height);

  return (
    <Image
      className={styles.spriteImage}
      src={sprite.path}
      width={spriteStyle.width}
      height={spriteStyle.height}
      unoptimized
    />
  );
};

export default SpriteImage;
