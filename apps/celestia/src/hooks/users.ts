import { GetAboutMembersResult } from '@mlp-vectorclub/api-types';
import { useQuery } from 'react-query';
import { ENDPOINTS, mapQueryStatus } from 'src/utils';
import { membersFetcher, usersFetcher } from 'src/fetchers';

export function useMembers(initialData?: GetAboutMembersResult) {
  const { data: members, status } = useQuery(ENDPOINTS.MEMBERS, membersFetcher, { initialData });

  return { members, status: mapQueryStatus(status) };
}

export function useUsers(enabled: boolean) {
  const {
    data: users,
    error,
    status,
  } = useQuery(ENDPOINTS.USERS, usersFetcher, {
    enabled,
    keepPreviousData: false,
  });

  return { users, error, status: mapQueryStatus(status) };
}
