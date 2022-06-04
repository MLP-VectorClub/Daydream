import { useQuery } from 'react-query';
import { Optional } from 'src/types';
import { PublicUser } from '@mlp-vectorclub/api-types';
import { ENDPOINTS } from 'src/utils';
import { useCsrf } from 'src/hooks/core';
import { FetchUserParams, userFetcher } from 'src/fetchers';

interface UserHookValue {
  user?: PublicUser;
}

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

export const getUserFetcherKey = (params: FetchUserParams) => {
  if ('id' in params) return ENDPOINTS.USERS_BY_ID(params);

  if ('username' in params) return ENDPOINTS.USERS_BY_USERNAME(params);

  throw new Error(`${getUserFetcherKey.name}: Invalid params parameter: ${JSON.stringify(params, null, 2)}`);
};

export function useUser(params: FetchUserParams, initialData?: PublicUser): UserHookValue {
  const csrf = useCsrf();
  const key = getUserFetcherKey(params);
  const { data, error: userError } = useQuery(key, userFetcher(params), {
    enabled: csrf,
    initialData,
  });

  return {
    user: (!userError && data) || undefined,
  };
}
