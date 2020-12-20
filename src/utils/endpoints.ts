import { mapValues, omitBy } from 'lodash';
import {
  GetAppearancesAllRequest,
  GetAppearancesAutocompleteRequest,
  GetAppearancesIdSpriteRequest,
  GetAppearancesPinnedRequest,
  GetAppearancesRequest,
  GetUserPrefsMeRequest,
  GetUsersDaUsernameRequest,
  GetUsersIdRequest,
  GetUsersOauthSigninProviderRequest,
} from 'src/types';
import { API_PREFIX } from 'src/config';
import { buildUrl } from 'src/utils/url';

// eslint-disable-next-line @typescript-eslint/ban-types
const omitUndefined = <T extends object>(params: T): Record<string, string> =>
  mapValues(omitBy(params, value => typeof value === 'undefined'), String);

// eslint-disable-next-line @typescript-eslint/ban-types
const omitUndefinedOrNull = <T extends object>(params: T): Record<string, string> =>
  mapValues(omitBy(params, value => typeof value === 'undefined' || value === null), String);

export const ENDPOINTS = {
  SLEEP: `${API_PREFIX}/about/sleep`,
  CONNECTION_INFO: `${API_PREFIX}/about/connection`,
  MEMBERS: `${API_PREFIX}/about/members`,
  CSRF_INIT: `${API_PREFIX}/sanctum/csrf-cookie`,
  USER_PREFS_ME: (data?: GetUserPrefsMeRequest) => buildUrl(`${API_PREFIX}/user-prefs/me`, data),
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
  APPEARANCES: (params: GetAppearancesRequest) =>
    buildUrl(`${API_PREFIX}/appearances`, omitUndefinedOrNull(params)),
  APPEARANCES_FULL: (params: GetAppearancesAllRequest) => buildUrl(`${API_PREFIX}/appearances/full`, params),
  APPEARANCE_SPRITE: (appearanceId: number, params: GetAppearancesIdSpriteRequest) =>
    buildUrl(`${API_PREFIX}/appearances/${appearanceId}/sprite`, omitUndefined(params)),
  APPEARANCES_PINNED: (params: GetAppearancesPinnedRequest) =>
    buildUrl(`${API_PREFIX}/appearances/pinned`, omitUndefinedOrNull(params)),
  APPEARANCES_AUTOCOMPLETE: (params: GetAppearancesAutocompleteRequest) =>
    buildUrl(`${API_PREFIX}/appearances/autocomplete`, omitUndefinedOrNull(params)),
  /*
  APPEARANCE_PALETTE: (appearanceId: number) =>
    buildUrl('', {
      path: `${API_PREFIX}/appearances/${appearanceId}/palette`,
      // TODO hash
    }),
  */
  USEFUL_LINKS_SIDEBAR: `${API_PREFIX}/useful-links/sidebar`,
};
