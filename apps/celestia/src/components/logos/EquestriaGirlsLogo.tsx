import Image, { ImageProps } from 'next/image';
import { FC } from 'react';
import { getGuideLabel } from 'src/utils';
import { ResponsiveContainer } from 'src/components/shared/ResponsiveContainer';

export const EquestriaGirlsLogo: FC<Pick<ImageProps, 'priority'>> = ({ priority }) => (
  <ResponsiveContainer size={9000}>
    <Image src="/img/logos/eqg.svg" fill alt={`${getGuideLabel('eqg')} Logo`} priority={priority} />
  </ResponsiveContainer>
);
