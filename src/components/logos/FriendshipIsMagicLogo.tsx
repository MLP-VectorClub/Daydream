import Image, { ImageProps } from 'next/image';
import { VFC } from 'react';
import fimLogo from 'src/../public/img/logos/pony.svg';
import { getGuideLabel } from 'src/utils';

export const FriendshipIsMagicLogo: VFC<Pick<ImageProps, 'priority'>> = ({ priority }) => (
  <Image
    src={fimLogo as StaticImageData}
    width={1006.477}
    height={1154.755}
    alt={`${getGuideLabel('pony')} Logo`}
    priority={priority}
  />
);
