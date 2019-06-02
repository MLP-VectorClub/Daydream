import { GetAppearanceSpriteRequest, QueryPublicAppearancesRequest } from 'app/types';
import * as buildUrl from 'build-url';
import { mapValues } from 'lodash';
import { API_PREFIX } from 'src/app/app.config';

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
  USERS_ME: `${API_PREFIX}/users/me`,
};
