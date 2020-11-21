import { GetAboutMembersResult } from 'src/types';
import { useQuery } from 'react-query';
import { ENDPOINTS } from 'src/utils';
import { membersFetcher, usersFetcher } from 'src/fetchers';

export function useMembers(initialData?: GetAboutMembersResult) {
  const { data } = useQuery(
    ENDPOINTS.MEMBERS,
    membersFetcher,
    { initialData },
  );

  return data;
}

export function useUsers(enabled: boolean) {
  const { data: users, error, isLoading } = useQuery(
    ENDPOINTS.USERS,
    usersFetcher,
    { enabled, keepPreviousData: false },
  );

  return { users, error, isLoading };
}
