import Axios from 'axios';
import {
  GetUserPrefsMeRequest,
  GetUserPrefsMeResult,
  GetUsersDaUsernameRequest,
  GetUsersDaUsernameResult,
  GetUsersIdRequest,
  GetUsersIdResult,
  GetUsersMeResult,
  GetUsersResult,
  GetUsersTokensResult,
  PostUsersOauthSigninProviderRequest,
  PostUsersOauthSigninProviderResult,
  PostUsersRequest,
  PostUsersResult,
  PostUsersSigninRequest,
  PostUsersSigninResult,
  PostUsersSignoutResult,
} from '@mlp-vectorclub/api-types';
import { ENDPOINTS } from 'src/utils';
import { Service } from 'src/services/service-class';

export class UserService extends Service {
  static getMe = () => Axios.get<GetUsersMeResult>(ENDPOINTS.USERS_ME);

  static getById = (data: GetUsersIdRequest) => Axios.get<GetUsersIdResult>(ENDPOINTS.USERS_BY_ID(data));

  static getByDaName = (data: GetUsersDaUsernameRequest) => Axios.get<GetUsersDaUsernameResult>(ENDPOINTS.USERS_BY_USERNAME(data));

  static signIn = (data: PostUsersSigninRequest) => Axios.post<PostUsersSigninResult>(ENDPOINTS.USERS_SIGNIN, data);

  static signInOauth = (data: PostUsersOauthSigninProviderRequest) =>
    Axios.post<PostUsersOauthSigninProviderResult>(ENDPOINTS.USERS_OAUTH_SIGNIN_PROVIDER(data), data);

  static signOut = () => Axios.post<PostUsersSignoutResult>(ENDPOINTS.USERS_SIGNOUT, null);

  static register = (data: PostUsersRequest) => Axios.post<PostUsersResult>(ENDPOINTS.USERS, data);

  static getTokens = () => Axios.post<GetUsersTokensResult>(ENDPOINTS.USERS_TOKENS);

  getPrefs = (data?: GetUserPrefsMeRequest) => Axios.get<GetUserPrefsMeResult>(ENDPOINTS.USER_PREFS_ME(data), this.getRequestOptions());

  static getList = () => Axios.get<GetUsersResult>(ENDPOINTS.USERS);
}
