import { API_PREFIX } from 'app/app.config';
import { GetAppearanceSpriteRequest, QueryPublicAppearancesRequest } from 'app/types';
import * as buildUrl from 'build-url';
import mapValues from 'lodash-es/mapValues';
import omitBy from 'lodash-es/omitBy';

export const ENDPOINTS = {
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
  USERS_ME: `${API_PREFIX}/users/me`,
};
