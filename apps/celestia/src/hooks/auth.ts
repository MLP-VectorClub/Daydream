import { useQuery } from 'react-query';
import { FailsafeUser, Status, UnifiedErrorResponse, UnifiedErrorResponseTypes } from 'src/types';
import { ENDPOINTS, mapQueryStatus, permission } from 'src/utils';
import { useCsrf } from 'src/hooks/core';
import { currentUserFetcher } from 'src/fetchers/auth';

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
  isStaff: boolean;
  authCheck: {
    status: Status;
  };
}

export function useAuth(): CurrentUserHookValue {
  // TODO Somehow keep initial auth data from the SSR request
  const csrf = useCsrf();
  const {
    status,
    data: user,
    isError,
  } = useQuery(ENDPOINTS.USERS_ME, currentUserFetcher, {
    enabled: csrf,
    retry: (_failureCount, error: UnifiedErrorResponse) => error.type !== UnifiedErrorResponseTypes.AUTHENTICATION_ERROR,
  });

  const signedIn = !isError && Boolean(user);

  return {
    signedIn,
    user: signedIn ? user! : guestUser,
    isStaff: signedIn && permission(user!.role, 'staff'),
    authCheck: {
      status: mapQueryStatus(status),
    },
  };
}
