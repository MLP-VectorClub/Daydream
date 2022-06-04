import { ENDPOINTS } from 'src/utils';
import { useQuery } from 'react-query';
import { prefsFetcher } from 'src/fetchers';
import { UserPrefs } from '@mlp-vectorclub/api-types';
import { useCallback } from 'react';

export function usePrefs(enabled: boolean): UserPrefs | undefined {
  const fetcher = useCallback(() => prefsFetcher()(), []);
  const { data } = useQuery(ENDPOINTS.USER_PREFS_ME(), fetcher, {
    enabled,
    refetchOnWindowFocus: 'always',
  });

  return enabled ? data : undefined;
}
