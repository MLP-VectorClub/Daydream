import InlineIcon from 'src/components/shared/InlineIcon';
import { SocialProvider } from 'src/types/api';
import { SocialProviderConfig } from 'src/types/auth';

/**
 * @file This file is meant to house configuration options that could not be placed into config.ts
 *       without losing server-side execution interoperability
 */

export const SOCIAL_PROVIDERS: { [k in SocialProvider]: SocialProviderConfig } = {
  deviantart: {
    name: 'DeviantArt',
    renderIcon: props => (<InlineIcon icon={['fab', 'deviantart']} {...props} />),
  },
  discord: {
    name: 'Discord',
    renderIcon: props => (<InlineIcon icon={['fab', 'discord']} {...props} />),
  },
};
