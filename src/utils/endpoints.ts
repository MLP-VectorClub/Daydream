import buildUrl from 'build-url';
import { mapValues, omitBy } from 'lodash';
import { API_PREFIX } from '../config';
import {
  GetAppearancesIdSpriteRequestOptionals,
  GetAppearancesRequestOptionals,
  GetUsersDaUsernameRequest,
  GetUsersIdRequest,
  GetUsersOauthSigninProviderRequest,
} from '../types';

export const ENDPOINTS = {
  SLEEP: `${API_PREFIX}/about/sleep`,
  CSRF_INIT: `${API_PREFIX}/sanctum/csrf-cookie`,
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

  APPEARANCES: (params: GetAppearancesRequestOptionals) =>
    buildUrl('', {
      path: `${API_PREFIX}/appearances`,
      queryParams: mapValues(omitBy(params, value => typeof value === 'undefined'), String),
    }),
  APPEARANCE_SPRITE: (appearanceId: number, params: GetAppearancesIdSpriteRequestOptionals) =>
    buildUrl('', {
      path: `${API_PREFIX}/appearances/${appearanceId}/sprite`,
      queryParams: mapValues(omitBy(params, value => typeof value === 'undefined'), String),
    }),
  /*
  APPEARANCE_PALETTE: (appearanceId: number) =>
    buildUrl('', {
      path: `${API_PREFIX}/appearances/${appearanceId}/palette`,
      // TODO hash
    }),
  */
};
