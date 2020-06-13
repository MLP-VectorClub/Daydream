import Axios from 'axios-observable';
import {
  GetUsersMeResult,
  GetUsersTokensRequest,
  GetUsersTokensResult,
  GetUsersUsernameRequest,
  GetUsersUsernameResult,
  PostUsersLoginRequest,
  PostUsersLoginResult,
  PostUsersLogoutResult,
  PostUsersRequest,
  PostUsersResult,
} from '../types';
import { ENDPOINTS } from '../utils';

export const getMe = () => Axios.get<GetUsersMeResult>(ENDPOINTS.USERS_ME);

export const getByName = (data: GetUsersUsernameRequest) =>
  Axios.get<GetUsersUsernameResult>(ENDPOINTS.USERS_BY_USERNAME(data));

export const signIn = (data: PostUsersLoginRequest) =>
  Axios.post<PostUsersLoginResult>(ENDPOINTS.USERS_LOGIN, data);

export const signOut = () => Axios.post<PostUsersLogoutResult>(ENDPOINTS.USERS_LOGOUT, null);

export const register = (data: PostUsersRequest) =>
  Axios.post<PostUsersResult>(ENDPOINTS.USERS, data);

export const getTokens = (data: GetUsersTokensRequest) =>
  Axios.post<GetUsersTokensResult>(ENDPOINTS.USERS_TOKENS, data);
