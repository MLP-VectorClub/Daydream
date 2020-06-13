import { API_PREFIX } from '../config';
import { GetUsersUsernameRequest } from '../types';
// import buildUrl from 'build-url';

export const ENDPOINTS = {
  CSRF_INIT: `${API_PREFIX}/sanctum/csrf-cookie`,
  USERS: `${API_PREFIX}/users`,
  USERS_LOGIN: `${API_PREFIX}/users/login`,
  USERS_LOGOUT: `${API_PREFIX}/users/logout`,
  USERS_ME: `${API_PREFIX}/users/me`,
  USERS_TOKENS: `${API_PREFIX}/users/tokens`,
  USERS_BY_USERNAME: (params: GetUsersUsernameRequest) =>
    `${API_PREFIX}/users/${encodeURI(params.username)}`,
  /*
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
  */
};
