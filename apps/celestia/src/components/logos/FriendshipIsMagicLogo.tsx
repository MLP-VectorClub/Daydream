import Image, { ImageProps } from 'next/image';
import { VFC } from 'react';
import { getGuideLabel } from 'src/utils';

export const FriendshipIsMagicLogo: VFC<Pick<ImageProps, 'priority'>> = ({ priority }) => (
  <Image src="/img/logos/pony.svg" width={1006.477} height={1154.755} alt={`${getGuideLabel('pony')} Logo`} priority={priority} />
);
