import { useQuery } from 'react-query';
import { getMe } from 'src/services/user';
import { FailsafeUser, Status, UnifiedErrorResponse, UnifiedErrorResponseTypes } from 'src/types';
import { ENDPOINTS, mapQueryStatus, requestObservableToPromise } from 'src/utils';
import { useCsrf } from 'src/hooks/core';

const guestUser: FailsafeUser = {
  id: null,
  name: null,
  email: null,
  role: null,
  avatarUrl: null,
  avatarProvider: 'gravatar',
};

interface CurrentUserHookValue {
  signedIn: boolean;
  user: FailsafeUser;
  authCheck: {
    status: Status;
  };
}

const currentUserFetcher = () => requestObservableToPromise(getMe());

export function useAuth(): CurrentUserHookValue {
  const csrf = useCsrf();
  const { status, data: user, isError } = useQuery(
    ENDPOINTS.USERS_ME,
    currentUserFetcher,
    { enabled: csrf, retry: (_failureCount, error: UnifiedErrorResponse) => error.type !== UnifiedErrorResponseTypes.AUTHENTICATION_ERROR },
  );

  const signedIn = !isError && Boolean(user);

  return {
    signedIn,
    user: signedIn ? user! : guestUser,
    authCheck: {
      status: mapQueryStatus(status),
    },
  };
}
