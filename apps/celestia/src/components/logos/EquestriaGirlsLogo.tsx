import Image, { ImageProps } from 'next/image';
import { VFC } from 'react';
import { getGuideLabel } from 'src/utils';
import eqgLogo from '../../../public/img/logos/eqg.svg';

export const EquestriaGirlsLogo: VFC<Pick<ImageProps, 'priority'>> = ({ priority }) => (
  <Image src={eqgLogo as StaticImageData} width={9000} height={9000} alt={`${getGuideLabel('eqg')} Logo`} priority={priority} />
);
