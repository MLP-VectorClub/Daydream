import Image, { ImageProps } from 'next/image';
import { VFC } from 'react';
import { getGuideLabel } from 'src/utils';
import plLogo from '../../../public/img/logos/pl.svg';

export const PonyLifeLogo: VFC<Pick<ImageProps, 'priority'>> = ({ priority }) => (
  <Image src={plLogo as StaticImageData} width={701.58} height={520.68} alt={`${getGuideLabel('pl')} Logo`} priority={priority} />
);
