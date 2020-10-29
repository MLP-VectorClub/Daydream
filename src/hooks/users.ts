import { GetAboutMembersResult } from 'src/types';
import { useQuery } from 'react-query';
import { ENDPOINTS, requestPromiseMapper } from 'src/utils';
import { AboutService, UserService } from 'src/services';

export const membersFetcher = () => requestPromiseMapper(AboutService.getMembers());

export function useMembers(initialData?: GetAboutMembersResult) {
  const { data } = useQuery(
    ENDPOINTS.MEMBERS,
    membersFetcher,
    { initialData },
  );

  return data;
}

export const usersFetcher = () => requestPromiseMapper(UserService.getList());

export function useUsers(enabled: boolean) {
  const { data: users, error, isLoading } = useQuery(
    ENDPOINTS.USERS,
    usersFetcher,
    { enabled, keepPreviousData: false },
  );

  return { users, error, isLoading };
}
