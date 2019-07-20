import { API_PREFIX } from 'app/app.config';
import { GetAppearanceSpriteRequest, QueryPublicAppearancesRequest } from 'app/types';
import * as buildUrl from 'build-url';
import { mapValues } from 'lodash';

export const ENDPOINTS = {
  APPEARANCES: (params: QueryPublicAppearancesRequest) =>
    buildUrl(null, {
      path: `${API_PREFIX}/appearances`,
      queryParams: mapValues(params, String),
    }),
  APPEARANCE_SPRITE: (appearanceId: number, params: GetAppearanceSpriteRequest) =>
    buildUrl(null, {
      path: `${API_PREFIX}/appearances/${appearanceId}/sprite`,
      queryParams: mapValues(params, String),
    }),
  APPEARANCE_PALETTE: (appearanceId: number) =>
    buildUrl(null, {
      path: `${API_PREFIX}/appearances/${appearanceId}/palette`,
      // TODO hash
    }),
  USERS_ME: `${API_PREFIX}/users/me`,
};
