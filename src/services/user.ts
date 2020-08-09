import Axios from 'axios-observable';
import {
  GetUsersDaUsernameRequest,
  GetUsersDaUsernameResult,
  GetUsersIdRequest,
  GetUsersIdResult,
  GetUsersMeResult,
  GetUsersTokensRequest,
  GetUsersTokensResult,
  PostUsersOauthSigninProviderResult,
  PostUsersRequest,
  PostUsersResult,
  PostUsersSigninRequest,
  PostUsersSigninResult,
  PostUsersSignoutResult,
  RegisterOauthRequest,
} from '../types';
import { ENDPOINTS } from '../utils';

export const getMe = () => Axios.get<GetUsersMeResult>(ENDPOINTS.USERS_ME);

export const getById = (data: GetUsersIdRequest) =>
  Axios.get<GetUsersIdResult>(ENDPOINTS.USERS_BY_ID(data));

export const getByDaName = (data: GetUsersDaUsernameRequest) =>
  Axios.get<GetUsersDaUsernameResult>(ENDPOINTS.USERS_BY_USERNAME(data));

export const signIn = (data: PostUsersSigninRequest) =>
  Axios.post<PostUsersSigninResult>(ENDPOINTS.USERS_SIGNIN, data);

export const signInOauth = (data: RegisterOauthRequest) =>
  Axios.post<PostUsersOauthSigninProviderResult>(ENDPOINTS.USERS_OAUTH_SIGNIN_PROVIDER(data), data);

export const signOut = () => Axios.post<PostUsersSignoutResult>(ENDPOINTS.USERS_SIGNOUT, null);

export const register = (data: PostUsersRequest) =>
  Axios.post<PostUsersResult>(ENDPOINTS.USERS, data);

export const getTokens = (data: GetUsersTokensRequest) =>
  Axios.post<GetUsersTokensResult>(ENDPOINTS.USERS_TOKENS, data);
