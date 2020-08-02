import useSWR from 'swr';
import { ParsedUrlQuery } from 'querystring';
import { GetUsersDaUsernameRequest, GetUsersIdRequest, PublicUser } from '../types';
import { ENDPOINTS, requestObservableToPromise } from '../utils';
import { useCsrf } from './core';
import { userService } from '../services';

interface UserHookValue {
  user?: PublicUser;
}

export type FetchUserParams = GetUsersDaUsernameRequest | GetUsersIdRequest;

export const getUserFetcherKey = (params: object | FetchUserParams) => () => {
  if ('id' in params) return ENDPOINTS.USERS_BY_ID(params);

  if ('username' in params) return ENDPOINTS.USERS_BY_USERNAME(params);

  throw new Error('getUserFetcherKey: Invalid params parameter for');
};

export const userFetcher = (params: object | FetchUserParams) => () => {
  if ('id' in params) return requestObservableToPromise(userService.getById(params));

  if ('username' in params) return requestObservableToPromise(userService.getByDaName(params));

  return Promise.resolve(undefined);
};

export function useUser(params: ParsedUrlQuery | FetchUserParams, initialData?: PublicUser): UserHookValue {
  const csrf = useCsrf();
  const key = getUserFetcherKey(params);
  const { data, error: userError } = useSWR<PublicUser | undefined>(
    csrf ? null : key,
    userFetcher(params),
    { initialData },
  );

  return {
    user: (!userError && data) || undefined,
  };
}
