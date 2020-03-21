import Axios from 'axios-observable';
import {
  GetUsersMeResult,
  PostUsersLoginRequest,
  PostUsersLoginResult,
  PostUsersLogoutResult,
  PostUsersRequest,
  PostUsersResult,
} from '../types';
import { ENDPOINTS } from '../utils/endpoints';

export const getMe = () => Axios.get<GetUsersMeResult>(ENDPOINTS.USERS_ME);

export const login = (data: PostUsersLoginRequest) =>
  Axios.post<PostUsersLoginResult>(ENDPOINTS.USERS_LOGIN, data);

export const logout = () => Axios.post<PostUsersLogoutResult>(ENDPOINTS.USERS_LOGOUT, null);

export const register = (data: PostUsersRequest) =>
  Axios.post<PostUsersResult>(ENDPOINTS.USERS, data);
