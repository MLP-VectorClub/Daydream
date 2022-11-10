import Image, { ImageProps } from 'next/image';
import { FC } from 'react';
import { getGuideLabel } from 'src/utils';
import { ResponsiveContainer } from 'src/components/shared/ResponsiveContainer';

export const FriendshipIsMagicLogo: FC<Pick<ImageProps, 'priority'>> = ({ priority }) => (
  <ResponsiveContainer width={1006.477} height={1154.755}>
    <Image src="/img/logos/pony.svg" fill alt={`${getGuideLabel('pony')} Logo`} priority={priority} />
  </ResponsiveContainer>
);
