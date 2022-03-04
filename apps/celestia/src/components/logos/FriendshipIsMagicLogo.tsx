import Image, { ImageProps } from 'next/image';
import { VFC } from 'react';
import { getGuideLabel } from 'src/utils';
import fimLogo from '../../../public/img/logos/pony.svg';

export const FriendshipIsMagicLogo: VFC<Pick<ImageProps, 'priority'>> = ({ priority }) => (
  <Image src={fimLogo as StaticImageData} width={1006.477} height={1154.755} alt={`${getGuideLabel('pony')} Logo`} priority={priority} />
);
