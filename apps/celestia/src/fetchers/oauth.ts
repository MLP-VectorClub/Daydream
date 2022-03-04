import { PostUsersOauthSigninProviderRequest } from 'src/types';
import { requestPromiseMapper } from 'src/utils';
import { UserService } from 'src/services';

export const oauthRegistrationFetcher = (data: PostUsersOauthSigninProviderRequest) => () =>
  requestPromiseMapper(UserService.signInOauth(data));
