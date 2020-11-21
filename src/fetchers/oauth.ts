import { RegisterOauthRequest } from 'src/types';
import { requestPromiseMapper } from 'src/utils';
import { UserService } from 'src/services';

export const oauthRegistrationFetcher = (data: RegisterOauthRequest) => () => requestPromiseMapper(UserService.signInOauth(data));
