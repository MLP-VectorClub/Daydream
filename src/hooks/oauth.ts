import { useQuery } from 'react-query';
import { ParsedUrlQuery } from 'querystring';
import { ENDPOINTS, isClientSide, mapQueryStatus } from 'src/utils';
import {
  PostUsersOauthSigninProviderResult,
  PostUsersOauthSigninProviderRequest,
  SocialProvider,
  Status,
  UnifiedErrorResponse,
} from 'src/types';
import { useAuth } from 'src/hooks/auth';
import { oauthRegistrationFetcher } from 'src/fetchers';
import { useCallback } from 'react';

export function useOAuth(query: ParsedUrlQuery) {
  const { authCheck, user } = useAuth();
  const key = ENDPOINTS.USERS_OAUTH_SIGNIN_PROVIDER({ provider: query.provider as SocialProvider });
  const fetcher = useCallback(() => oauthRegistrationFetcher(query as unknown as PostUsersOauthSigninProviderRequest)(), [query]);
  const { status, data, error } = useQuery<PostUsersOauthSigninProviderResult, UnifiedErrorResponse>(
    key,
    fetcher,
    {
      enabled: authCheck.status === Status.FAILURE && 'provider' in query && 'code' in query && isClientSide,
      retry: false,
      refetchOnWindowFocus: false,
      refetchIntervalInBackground: false,
    },
  );

  return { status: mapQueryStatus(status), data, error, user };
}
