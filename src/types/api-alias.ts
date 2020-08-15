import {
  GetAboutConnectionResult,
  GetAppearancesIdSpriteRequest,
  GetAppearancesRequest,
  PostUsersOauthSigninProviderRequest,
  SocialProvider,
} from './api';
import { Nullable, OptionalProps } from './common';

// TODO Attempt to fix optional properties being required in the generator package sometime
export type GetAppearancesRequestOptionals = OptionalProps<GetAppearancesRequest, 'page' | 'size' | 'q' | 'previews'>;
export type GetAppearancesIdSpriteRequestOptionals = OptionalProps<GetAppearancesIdSpriteRequest, 'size' | 'token'>;

export type RegisterOauthRequest = PostUsersOauthSigninProviderRequest & { provider: SocialProvider };

export type MappedAboutConnectionResult = GetAboutConnectionResult & { commitDate: Nullable<Date> };
