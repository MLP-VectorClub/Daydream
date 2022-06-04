import InlineIcon from 'src/components/shared/InlineIcon';
import { SocialProvider } from '@mlp-vectorclub/api-types';
import { SocialProviderConfig } from 'src/types/auth';
import type { IconName } from '@fortawesome/fontawesome-common-types';

/**
 * @fileOverview This file is meant to house configuration options that could not be placed into config.ts
 *               without losing server-side execution interoperability
 */

const FaBrandRendererHoc = (icon: IconName) => {
  const FaBrandRenderer: SocialProviderConfig['renderIcon'] = (props) => <InlineIcon icon={['fab', icon]} {...props} />;
  return FaBrandRenderer;
};

export const SOCIAL_PROVIDERS: { [k in SocialProvider]: SocialProviderConfig } = {
  deviantart: {
    name: 'DeviantArt',
    renderIcon: FaBrandRendererHoc('deviantart'),
  },
  discord: {
    name: 'Discord',
    renderIcon: FaBrandRendererHoc('discord'),
  },
};
