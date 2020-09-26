import { ParsedUrlQuery } from 'querystring';
import { useQuery } from 'react-query';
import { GetUsersDaUsernameRequest, GetUsersIdRequest, Optional, PublicUser } from 'src/types';
import { ENDPOINTS, requestObservableToPromise } from 'src/utils';
import { userService } from 'src/services';
import { useCsrf } from 'src/hooks/core';

interface UserHookValue {
  user?: PublicUser;
}

export type FetchUserParams = GetUsersDaUsernameRequest | GetUsersIdRequest;

export const transformProfileParams = (query: { user?: string }): FetchUserParams => {
  let id: Optional<string>;
  let username: Optional<string>;
  if (typeof query.user === 'string') {
    const matchCurrent = /^(\d+)(?:-.*)?$/.exec(query.user);
    if (matchCurrent) {
      [, id] = matchCurrent;
      return { id: +id };
    }
    const matchDa = /^@([A-Za-z\d-]{1,20})$/.exec(query.user);
    if (matchDa) {
      [, username] = matchDa;
      return { username };
    }
  }

  throw new Error(`${transformProfileParams.name}: Invalid query parameter: ${JSON.stringify(query, null, 2)}`);
};

export const getUserFetcherKey = (params: object | FetchUserParams) => {
  if ('id' in params) return ENDPOINTS.USERS_BY_ID(params);

  if ('username' in params) return ENDPOINTS.USERS_BY_USERNAME(params);

  throw new Error(`${getUserFetcherKey.name}: Invalid params parameter: ${JSON.stringify(params, null, 2)}`);
};

export const userFetcher = (params: object | FetchUserParams) => () => {
  if ('id' in params) return requestObservableToPromise(userService.getById(params));

  if ('username' in params) return requestObservableToPromise(userService.getByDaName(params));

  throw new Error(`${userFetcher.name}: Invalid params parameter: ${JSON.stringify(params, null, 2)}`);
};

export function useUser(params: ParsedUrlQuery | FetchUserParams, initialData?: PublicUser): UserHookValue {
  const csrf = useCsrf();
  const key = getUserFetcherKey(params);
  const { data, error: userError } = useQuery(
    key,
    userFetcher(params),
    { enabled: csrf, initialData },
  );

  return {
    user: (!userError && data) || undefined,
  };
}
