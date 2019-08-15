import { Nullable, Omit } from 'app/types';
import * as api from 'app/types/api';

/**
 * @file
 * Used to create aliases for lengthy interface names generated from the OpenAPI operation IDs
 */

export type QueryPublicAppearancesRequest = api.AppControllersApiAppearancesControllerQueryPublicRequest;
export type QueryPublicAppearancesResult = api.AppControllersApiAppearancesControllerQueryPublicResult;
export type GetAppearanceSpriteRequest = Omit<api.AppControllersApiAppearancesControllerSpriteRequest, 'hash' | 'token' | 'size' | 'id'> & {
  hash?: api.AppControllersApiAppearancesControllerSpriteRequest['hash'];
  token?: api.AppControllersApiAppearancesControllerSpriteRequest['token'];
  size?: api.AppControllersApiAppearancesControllerSpriteRequest['size'];
};

export type AppUser = Omit<api.User, 'id' | 'name' | 'avatarUrl'> & {
  id: Nullable<api.User['id']>;
  name: Nullable<api.User['name']>;
  avatarUrl: Nullable<api.User['avatarUrl']>;
};
