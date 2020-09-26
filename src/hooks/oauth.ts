import { useQuery } from 'react-query';
import { ParsedUrlQuery } from 'querystring';
import { ENDPOINTS, isClientSide, mapQueryStatus, requestObservableToPromise } from 'src/utils';
import {
  PostUsersOauthSigninProviderResult,
  RegisterOauthRequest,
  SocialProvider,
  Status,
  UnifiedErrorResponse,
} from 'src/types';
import { signInOauth } from 'src/services/user';
import { useAuth } from 'src/hooks/auth';

const oauthRegistrationFetcher = (data: RegisterOauthRequest) => () => requestObservableToPromise(signInOauth(data));

export function useOAuth(query: ParsedUrlQuery) {
  const { authCheck, user } = useAuth();
  const key = ENDPOINTS.USERS_OAUTH_SIGNIN_PROVIDER({ provider: query.provider as SocialProvider });
  const { status, data, error } = useQuery<PostUsersOauthSigninProviderResult, UnifiedErrorResponse>(
    key,
    oauthRegistrationFetcher(query as unknown as RegisterOauthRequest),
    {
      enabled: authCheck.status === Status.FAILURE && 'provider' in query && 'code' in query && isClientSide,
      retry: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
    },
  );

  return { status: mapQueryStatus(status), data, error, user };
}
