import { ENDPOINTS } from 'src/utils';
import { useQuery } from 'react-query';
import { getPrefs } from 'src/services/user';

const prefsFetcher = () => getPrefs().toPromise().then(r => r.data);

export function usePrefs(enabled: boolean) {
  const { data } = useQuery(ENDPOINTS.USER_PREFS_ME, prefsFetcher, {
    enabled,
  });

  return enabled ? data : undefined;
}
