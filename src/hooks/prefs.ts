import { ENDPOINTS } from 'src/utils';
import { useQuery } from 'react-query';
import { prefsFetcher } from 'src/fetchers';

export function usePrefs(enabled: boolean) {
  const { data } = useQuery(ENDPOINTS.USER_PREFS_ME, prefsFetcher, {
    enabled,
  });

  return enabled ? data : undefined;
}
