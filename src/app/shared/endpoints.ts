import { API_PREFIX } from 'app/app.config';
import { GetAppearanceSpriteRequest, QueryPublicAppearancesRequest } from 'app/types';
import * as buildUrl from 'build-url';
import { mapValues, omitBy } from 'lodash-es';

export const ENDPOINTS = {
  CSRF_INIT: `${API_PREFIX}/../airlock/csrf-cookie`,
  USERS_LOGIN: `${API_PREFIX}/users/login`,
  USERS_LOGOUT: `${API_PREFIX}/users/logout`,
  USERS_ME: `${API_PREFIX}/users/me`,
  APPEARANCES: (params: QueryPublicAppearancesRequest) =>
    buildUrl('', {
      path: `${API_PREFIX}/appearances`,
      queryParams: mapValues(params, String),
    }),
  APPEARANCE_SPRITE: (appearanceId: number, params: GetAppearanceSpriteRequest) =>
    buildUrl('', {
      path: `${API_PREFIX}/appearances/${appearanceId}/sprite`,
      queryParams: mapValues(omitBy(params, (value) => typeof value === undefined), String),
    }),
  APPEARANCE_PALETTE: (appearanceId: number) =>
    buildUrl('', {
      path: `${API_PREFIX}/appearances/${appearanceId}/palette`,
      // TODO hash
    }),
};
