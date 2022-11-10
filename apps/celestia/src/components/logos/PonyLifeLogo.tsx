import Image, { ImageProps } from 'next/image';
import { FC } from 'react';
import { getGuideLabel } from 'src/utils';
import { ResponsiveContainer } from 'src/components/shared/ResponsiveContainer';

export const PonyLifeLogo: FC<Pick<ImageProps, 'priority'>> = ({ priority }) => (
  <ResponsiveContainer width={701.58} height={520.68}>
    <Image src="/img/logos/pl.svg" fill alt={`${getGuideLabel('pl')} Logo`} priority={priority} />
  </ResponsiveContainer>
);
