import {
  GetAppearancesAllRequest,
  GetAppearancesAutocompleteRequest,
  GetAppearancesIdSpriteRequest,
  GetAppearancesPinnedRequest,
  GetAppearancesRequest,
  GetColorGuideMajorChangesRequest,
  GetShowRequest,
  GetUserPrefsMeRequest,
  GetUsersDaUsernameRequest,
  GetUsersIdRequest,
  GetUsersOauthSigninProviderRequest,
} from 'src/types';
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
  USERS_BY_ID: (params: GetUsersIdRequest) =>
    `/users/${params.id}`,
  USERS_OAUTH_SIGNIN_PROVIDER: (params: GetUsersOauthSigninProviderRequest) =>
    `/users/oauth/signin/${params.provider}`,
  // USERS_OAUTH_SIGNUP_PROVIDER: (params: GetUsersOauthSignupProviderRequest) =>
  //   `/users/oauth/signup/${params.provider}`,
  USERS_BY_USERNAME: (params: GetUsersDaUsernameRequest) =>
    `/users/da/${encodeURI(params.username)}`,
  GUIDE_INDEX: `/color-guide`,
  GUIDE_MAJOR_CHANGES: (params: GetColorGuideMajorChangesRequest) =>
    buildUrl(`/color-guide/major-changes`, params),
  APPEARANCES: (params: GetAppearancesRequest) =>
    buildUrl(`/appearances`, params),
  APPEARANCES_FULL: (params: GetAppearancesAllRequest) => buildUrl(`/appearances/full`, params),
  APPEARANCE_SPRITE: (appearanceId: number, params: GetAppearancesIdSpriteRequest) =>
    buildUrl(`/appearances/${appearanceId}/sprite`, params),
  APPEARANCES_PINNED: (params: GetAppearancesPinnedRequest) =>
    buildUrl(`/appearances/pinned`, params),
  APPEARANCES_AUTOCOMPLETE: (params: GetAppearancesAutocompleteRequest) =>
    buildUrl(`/appearances/autocomplete`, params),
  /*
  APPEARANCE_PALETTE: (appearanceId: number) =>
    buildUrl('', {
      path: `/appearances/${appearanceId}/palette`,
      // TODO hash
    }),
  */
  USEFUL_LINKS_SIDEBAR: `/useful-links/sidebar`,
  SHOW: (params: GetShowRequest) =>
    buildUrl(`/show`, params),
};
