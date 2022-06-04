import {
  GetAppearancesAllRequest,
  GetAppearancesAutocompleteRequest,
  GetAppearancesIdLocateRequest,
  GetAppearancesIdRequest,
  GetAppearancesIdSpriteRequest,
  GetAppearancesPinnedRequest,
  GetAppearancesRequest,
  GetColorGuideMajorChangesRequest,
  GetShowRequest,
  GetUserPrefsMeRequest,
  GetUsersDaUsernameRequest,
  GetUsersIdRequest,
  GetUsersOauthSigninProviderRequest,
} from '@mlp-vectorclub/api-types';
import { buildUrl } from 'src/utils/url';

export const ENDPOINTS = {
  SLEEP: `/about/sleep`,
  CONNECTION_INFO: `/about/connection`,
  MEMBERS: `/about/members`,
  CSRF_INIT: `/sanctum/csrf-cookie`,
  USER_PREFS_ME: (data?: GetUserPrefsMeRequest) => buildUrl(`/user-prefs/me`, data),
  USERS: `/users`,
  USERS_SIGNIN: `/users/signin`,
  USERS_SIGNOUT: `/users/signout`,
  USERS_ME: `/users/me`,
  USERS_TOKENS: `/users/tokens`,
  USERS_BY_ID: (params: GetUsersIdRequest) => `/users/${params.id}`,
  USERS_OAUTH_SIGNIN_PROVIDER: (params: GetUsersOauthSigninProviderRequest) => `/users/oauth/signin/${params.provider}`,
  // USERS_OAUTH_SIGNUP_PROVIDER: (params: GetUsersOauthSignupProviderRequest) =>
  //   `/users/oauth/signup/${params.provider}`,
  USERS_BY_USERNAME: (params: GetUsersDaUsernameRequest) => `/users/da/${encodeURI(params.username)}`,
  GUIDE_INDEX: `/color-guide`,
  GUIDE_MAJOR_CHANGES: (params: GetColorGuideMajorChangesRequest) => buildUrl(`/color-guide/major-changes`, params),
  APPEARANCE: (params: GetAppearancesIdRequest) => buildUrl(`/appearances/${params.id}`),
  APPEARANCES: (params: GetAppearancesRequest) => buildUrl(`/appearances`, params),
  APPEARANCES_FULL: (params: GetAppearancesAllRequest) => buildUrl(`/appearances/full`, params),
  APPEARANCE_SPRITE: (params: GetAppearancesIdSpriteRequest) => buildUrl(`/appearances/${params.id}/sprite`, params),
  APPEARANCE_LOCATE: (data: GetAppearancesIdLocateRequest) => buildUrl(`/appearances/${data.id}/locate`),
  APPEARANCES_PINNED: (params: GetAppearancesPinnedRequest) => buildUrl(`/appearances/pinned`, params),
  APPEARANCES_AUTOCOMPLETE: (params: GetAppearancesAutocompleteRequest) => buildUrl(`/appearances/autocomplete`, params),
  /*
  APPEARANCE_PALETTE: (appearanceId: number) =>
    buildUrl('', {
      path: `/appearances/${appearanceId}/palette`,
      // TODO hash
    }),
  */
  USEFUL_LINKS_SIDEBAR: `/useful-links/sidebar`,
  SHOW: (params: GetShowRequest) => buildUrl(`/show`, params),
};
