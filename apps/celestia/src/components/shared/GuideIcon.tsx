import { GuideName } from '@mlp-vectorclub/api-types';
import { FC } from 'react';
import { EquestriaGirlsLogo } from 'src/components/logos/EquestriaGirlsLogo';
import { PonyLifeLogo } from 'src/components/logos/PonyLifeLogo';
import { FriendshipIsMagicLogo } from 'src/components/logos/FriendshipIsMagicLogo';
import { ImageProps } from 'next/image';

interface PropTypes extends Pick<ImageProps, 'priority'> {
  guide: GuideName;
}

export const GuideIcon: FC<PropTypes> = ({ guide, priority }) => {
  switch (guide) {
    case 'eqg':
      return <EquestriaGirlsLogo priority={priority} />;
    case 'pl':
      return <PonyLifeLogo priority={priority} />;
    case 'pony':
      return <FriendshipIsMagicLogo priority={priority} />;
    default:
      return null;
  }
};
