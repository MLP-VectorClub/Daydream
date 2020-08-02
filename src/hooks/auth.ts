import useSWR from 'swr';
import { ENDPOINTS, requestObservableToPromise, resultToStatus } from '../utils';
import { FailsafeUser, GetUsersMeResult, Status } from '../types';
import { getMe } from '../services/user';
import { useCsrf } from './core';

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
  const { data: user, error: userError } = useSWR<GetUsersMeResult>(
    !csrf ? null : ENDPOINTS.USERS_ME,
    currentUserFetcher,
    { shouldRetryOnError: false },
  );

  const signedIn = !userError && Boolean(user);

  return {
    signedIn,
    user: signedIn ? user! : guestUser,
    authCheck: {
      status: resultToStatus(user, userError),
    },
  };
}
