import Image, { ImageProps } from 'next/image';
import { VFC } from 'react';
import { getGuideLabel } from 'src/utils';

export const PonyLifeLogo: VFC<Pick<ImageProps, 'priority'>> = ({ priority }) => (
  <Image src="/img/logos/pl.svg" width={701.58} height={520.68} alt={`${getGuideLabel('pl')} Logo`} priority={priority} />
);
