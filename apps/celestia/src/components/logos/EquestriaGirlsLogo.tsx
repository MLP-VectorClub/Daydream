import Image, { ImageProps } from 'next/image';
import { VFC } from 'react';
import { getGuideLabel } from 'src/utils';

export const EquestriaGirlsLogo: VFC<Pick<ImageProps, 'priority'>> = ({ priority }) => (
  <Image src="/img/logos/eqg.svg" width={9000} height={9000} alt={`${getGuideLabel('eqg')} Logo`} priority={priority} />
);
