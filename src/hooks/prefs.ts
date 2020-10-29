import { ENDPOINTS, requestPromiseMapper } from 'src/utils';
import { useQuery } from 'react-query';
import { UserService } from 'src/services/user';

const prefsFetcher = () => requestPromiseMapper(UserService.getPrefs());

export function usePrefs(enabled: boolean) {
  const { data } = useQuery(ENDPOINTS.USER_PREFS_ME, prefsFetcher, {
    enabled,
  });

  return enabled ? data : undefined;
}
