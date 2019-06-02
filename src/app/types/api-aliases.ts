export * from 'src/app/types/api';
import { Nullable, Omit } from 'app/types/common';
import * as api from 'src/app/types/api';
import { User } from 'src/app/types/api';

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

export type NullableUser = Omit<User, 'id' | 'name' | 'avatarUrl'> & {
  id: Nullable<User['id']>;
  name: Nullable<User['name']>;
  avatarUrl: Nullable<User['avatarUrl']>;
};
