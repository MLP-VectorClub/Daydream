import { mapValues, omitBy } from 'lodash';
import {
  GetAppearancesAllRequest,
  GetAppearancesIdSpriteRequestOptionals,
  GetAppearancesRequestOptionals,
  GetUsersDaUsernameRequest,
  GetUsersIdRequest,
  GetUsersOauthSigninProviderRequest,
} from 'src/types';
import { API_PREFIX } from 'src/config';
import { buildUrl } from 'src/utils/url';

export const ENDPOINTS = {
  SLEEP: `${API_PREFIX}/about/sleep`,
  CONNECTION_INFO: `${API_PREFIX}/about/connection`,
  MEMBERS: `${API_PREFIX}/about/members`,
  CSRF_INIT: `${API_PREFIX}/sanctum/csrf-cookie`,
  USER_PREFS_ME: `${API_PREFIX}/user-prefs/me`,
  USERS: `${API_PREFIX}/users`,
  USERS_SIGNIN: `${API_PREFIX}/users/signin`,
  USERS_SIGNOUT: `${API_PREFIX}/users/signout`,
  USERS_ME: `${API_PREFIX}/users/me`,
  USERS_TOKENS: `${API_PREFIX}/users/tokens`,
  USERS_BY_ID: (params: GetUsersIdRequest) =>
    `${API_PREFIX}/users/${params.id}`,
  USERS_OAUTH_SIGNIN_PROVIDER: (params: GetUsersOauthSigninProviderRequest) =>
    `${API_PREFIX}/users/oauth/signin/${params.provider}`,
  // USERS_OAUTH_SIGNUP_PROVIDER: (params: GetUsersOauthSignupProviderRequest) =>
  //   `${API_PREFIX}/users/oauth/signup/${params.provider}`,
  USERS_BY_USERNAME: (params: GetUsersDaUsernameRequest) =>
    `${API_PREFIX}/users/da/${encodeURI(params.username)}`,
  GUIDE_INDEX: `${API_PREFIX}/color-guides`,
  APPEARANCES: (params: GetAppearancesRequestOptionals) =>
    buildUrl(`${API_PREFIX}/appearances`, mapValues(omitBy(params, value => typeof value === 'undefined' || value === null), String)),
  APPEARANCES_FULL: (params: GetAppearancesAllRequest) => buildUrl(`${API_PREFIX}/appearances/full`, params),
  APPEARANCE_SPRITE: (appearanceId: number, params: GetAppearancesIdSpriteRequestOptionals) =>
    buildUrl(`${API_PREFIX}/appearances/${appearanceId}/sprite`, mapValues(omitBy(params, value => typeof value === 'undefined'), String)),
  /*
  APPEARANCE_PALETTE: (appearanceId: number) =>
    buildUrl('', {
      path: `${API_PREFIX}/appearances/${appearanceId}/palette`,
      // TODO hash
    }),
  */
  USEFUL_LINKS_SIDEBAR: `${API_PREFIX}/useful-links/sidebar`,
};
