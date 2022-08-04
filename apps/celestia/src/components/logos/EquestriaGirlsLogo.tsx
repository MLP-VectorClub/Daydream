import Image, { ImageProps } from 'next/image';
import { FC } from 'react';
import { getGuideLabel } from 'src/utils';

export const EquestriaGirlsLogo: FC<Pick<ImageProps, 'priority'>> = ({ priority }) => (
  <Image src="/img/logos/eqg.svg" width={9000} height={9000} alt={`${getGuideLabel('eqg')} Logo`} priority={priority} />
);
